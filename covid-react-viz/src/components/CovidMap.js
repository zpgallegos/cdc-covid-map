import { AppContext } from "../AppContext";
import { select, geoPath, geoAlbersUsa, pointer } from "d3";
import { useEffect, useRef, useContext } from "react";

import Tooltip from "./Tooltip.js";
import DiagonalHatch from "./DiagonalHatch.js";
import colorScaleMap from "./scales.js";
import { getStateKey } from "../utils.js";

const height = 610;
const width = 975;

const CovidMap = ({ stateFeatures, regionData }) => {
    const { state, setState } = useContext(AppContext);

    const svgRef = useRef();
    const tooltipRef = useRef();

    useEffect(() => {
        const svg = select(svgRef.current);
        const tooltip = select(tooltipRef.current);

        const projection = geoAlbersUsa()
            .translate([width / 2, height / 2])
            .scale(1300);
        const pathGenerator = geoPath().projection(projection);

        const { metric, colorScale } = getStateKey(colorScaleMap, state);

        const paths = svg.select(".states").selectAll("path").data(stateFeatures);

        paths
            .enter()
            .append("path")
            .attr("d", pathGenerator)
            .attr("id", (d) => `state-${d.id}`)
            .attr("class", "state")
            .attr("stroke", "lightgray")
            .attr("stroke-width", 1)
            .attr("stroke-linecap", "round")
            .attr("stroke-linejoin", "round")
            .on("mouseover", (event, d) => {
                svg.select(".highlight").attr("d", pathGenerator(d));

                const [x, y] = pointer(event, svg);

                setState((prevState) => {
                    return {
                        ...prevState,
                        tooltipData: d.measures,
                    };
                });

                tooltip
                    .transition()
                    .duration(200)
                    .style("opacity", 0.95)
                    .style("top", y + "px")
                    .style("left", x + "px");
            })
            .on("mousemove", (event) => {
                const [x, y] = pointer(event, svg);
                tooltip.style("top", y + "px").style("left", x + "px");
            })
            .on("mouseout", (event, d) => {
                svg.select(".highlight").attr("d", null);

                tooltip.transition().duration(200).style("opacity", 0);

                setState((prevState) => {
                    return {
                        ...prevState,
                        tooltipData: {},
                    };
                });
            });

        paths.attr("fill", (d) => colorScale(d.measures[metric]));
    }, [state, stateFeatures, setState]);

    return (
        <div className="mb-10">
            <div className="p-2">
                <svg ref={svgRef} viewBox={`0 0 ${width} ${height}`}>
                    <DiagonalHatch color="blue" />
                    <DiagonalHatch color="green" />

                    <g className="states"></g>

                    <path
                        className="highlight"
                        fill="none"
                        stroke="#101010"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        style={{ pointerEvents: "none" }}
                    ></path>
                </svg>

                <Tooltip ref={tooltipRef} />
            </div>
        </div>
    );
};

export default CovidMap;
