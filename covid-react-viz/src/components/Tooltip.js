import { useContext, forwardRef } from "react";
import { AppContext } from "../AppContext";

// cases to handle:
// deaths: pastWeek has one version, past3mo/all have another one (same for both metrics)
// ed: same tooltip for all
// testpos: pastWeek has same one for both metrics, past2weeks and past4weeks both have their own
// = 5 cases

const Tooltip = forwardRef((props, ref) => {
    const { state } = useContext(AppContext);
    const { tooltipData } = state;

    let content;

    if (state.view === "deaths") {
        if (state.timePeriod === "pastWeek") {
            content = (
                <div>
                    <span className="font-bold">{tooltipData.state}</span>
                    <br />
                    <span>
                        <span className="font-semibold">
                            % of Deaths due to COVID-19 in past week:{" "}
                        </span>
                        {tooltipData.perc_deaths_past_week_fmt}
                    </span>
                </div>
            );
        }
    }

    return (
        <div
            ref={ref}
            className="border border-black rounded-md bg-white p-2"
            style={{
                // display: display,
                opacity: 0,
                position: "absolute",
                top: 0,
                left: 0,
                pointerEvents: "none",
            }}
        >
            {content}
        </div>
    );
});

export default Tooltip;
