import { AppContext } from "../AppContext";
import { select, geoPath, geoAlbersUsa, pointer } from "d3";
import { useEffect, useRef, useContext } from "react";

import Tooltip from "./Tooltip.js";
import DiagonalHatch from "./DiagonalHatch.js";
import colorScaleMap from "./scales.js";
import { getStateKey } from "../utils.js";

const height = 610;
const width = 975;

const CovidMap = ({ stateFeatures, regionFeatures }) => {
    const { state, setState } = useContext(AppContext);

    const svgRef = useRef();
    const tooltipRef = useRef();
    const prevView = useRef(state.view);

    useEffect(() => {
        const svg = select(svgRef.current);
        const tooltip = select(tooltipRef.current);

        const projection = geoAlbersUsa()
            .translate([width / 2, height / 2])
            .scale(1300);
        const pathGenerator = geoPath().projection(projection);

        const { metric, colorScale } = getStateKey(colorScaleMap, state);

        const states = svg.select(".states").selectAll("path").data(stateFeatures);

        states
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

                setState((prevState) => {
                    return {
                        ...prevState,
                        tooltipData: d.measures,
                    };
                });

                const [x, y] = pointer(event, svg);

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

        if (prevView.current !== "testpos" && state.view === "testpos") {
            svg.select(".regions")
                .selectAll("path")
                .data(regionFeatures)
                .enter()
                .append("path")
                .attr("id", (d) => d.id)
                .attr("d", pathGenerator)
                .attr("fill", "none")
                .attr("stroke", "black")
                .attr("stroke-width", 2)
                .attr("stroke-linecap", "round")
                .attr("stroke-linejoin", "round")
                .attr("pointer-events", "none");

            svg.select(".regionMarkers")
                .selectAll("circle")
                .data(regionFeatures)
                .enter()
                .append("circle")
                .attr("cx", (d) => d.centroid[0])
                .attr("cy", (d) => d.centroid[1])
                .attr("r", 12.5)
                .attr("fill", "#fff")
                .attr("stroke", "black")
            
            svg.select(".regionMarkers")
                .selectAll("text")
                .data(regionFeatures)
                .enter()
                .append("text")
                .attr("x", (d) => d.centroid[0])
                .attr("y", (d) => d.centroid[1])
                .attr("dy", "0.35em")
                .attr("text-anchor", "middle")
                .attr("font-size", 12)
                .attr("fill", "black")
                .text((d) => d.id);

        } else if (prevView.current === "testpos" && state.view !== "testpos") {
            svg.select(".regions").selectAll("path").remove();
            svg.select(".regionMarkers").selectAll("circle").remove();
            svg.select(".regionMarkers").selectAll("text").remove();
        }

        states.attr("fill", (d) => colorScale(d.measures[metric]));

        prevView.current = state.view;
    }, [state, setState, stateFeatures, regionFeatures]);

    return (
        <div className="mb-10">
            <div className="p-2">
                <svg ref={svgRef} viewBox={`0 0 ${width} ${height}`}>
                    <DiagonalHatch color="blue" />
                    <DiagonalHatch color="green" />

                    <g className="states"></g>
                    <g className="regions"></g>
                    <g className="regionMarkers"></g>

                    <path
                        className="highlight"
                        fill="none"
                        stroke="#101010"
                        strokeWidth="2.5"
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
