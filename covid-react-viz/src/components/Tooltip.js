import { useContext, forwardRef } from "react";
import { AppContext } from "../AppContext";
import TooltipItem from "./TooltipItem";

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
                    <TooltipItem label={tooltipData.state} />
                    <TooltipItem
                        label="Data as of: "
                        value={tooltipData.date_generated}
                    />
                    <TooltipItem
                        label="Data through: "
                        value={tooltipData.data_through}
                    />
                    <TooltipItem
                        label="% of Deaths due to COVID-19 in past week: "
                        value={tooltipData.perc_deaths_past_week_fmt}
                    />
                    <TooltipItem
                        label="Percent change from prior week: "
                        value={tooltipData.perc_chg_past_week_fmt}
                    />
                    <TooltipItem
                        label="Absolute difference from prior week: "
                        value={tooltipData.abs_chg_past_week_fmt}
                    />
                </div>
            );
        } else {
            content = (
                <div>
                    <TooltipItem label={tooltipData.state} />
                    <TooltipItem
                        label="Data as of: "
                        value={tooltipData.date_generated}
                    />
                    <TooltipItem
                        label="Data through: "
                        value={tooltipData.data_through}
                    />
                    <TooltipItem
                        label="% of Deaths due to COVID-19 in past week: "
                        value={tooltipData.perc_deaths_past_week_fmt}
                    />
                    <TooltipItem
                        label="Deaths, past 3 months: "
                        value={tooltipData.deaths_3mo_fmt}
                    />
                    <TooltipItem
                        label="Deaths per 100k, past 3 months: "
                        value={tooltipData.deaths_per100k_3mo_fmt}
                    />
                    <TooltipItem
                        label="Total deaths: "
                        value={tooltipData.total_deaths_fmt}
                    />
                    <TooltipItem
                        label="Total deaths per 100k: "
                        value={tooltipData.total_deaths_per100k_fmt}
                    />
                </div>
            );
        }
    } else if (state.view === "ed") {
        content = (
            <div>
                <TooltipItem label={tooltipData.state} />
                <TooltipItem label="Data through: " value={tooltipData.data_through} />
                <TooltipItem
                    label="% of ED visits diagnosed as COVID-19: "
                    value={tooltipData.perc_ed_cov_fmt}
                />
                <TooltipItem
                    label="Percent Change: "
                    value={tooltipData.perc_ed_chg_fmt}
                />
            </div>
        );
    } else if (state.view === "testpos") {
        if (state.timePeriod === "pastWeek") {
            content = (
                <div>
                    <TooltipItem label={tooltipData.region} />
                    <TooltipItem
                        label="Data through: "
                        value={tooltipData.data_through}
                    />
                    <TooltipItem
                        label="Test Positivity (Past Week): "
                        value={tooltipData.testpos_past_week_fmt}
                    />
                    <TooltipItem
                        label="Test Volume (Past Week): "
                        value={tooltipData.testvol_past_week_fmt}
                    />
                    <TooltipItem
                        label="% Change in Test Positivity: "
                        value={tooltipData.testpos_chg_fmt}
                    />
                    <TooltipItem
                        label="Test Positivity (Past 2 Weeks): "
                        value={tooltipData.testpos_past_2weeks_fmt}
                    />
                    <TooltipItem
                        label="Test Volume (Past 2 Weeks): "
                        value={tooltipData.testvol_past_2weeks_fmt}
                    />
                </div>
            );
        } else if (state.timePeriod === "past2Weeks") {
            content = (
                <div>
                    <TooltipItem label={tooltipData.region} />
                    <TooltipItem
                        label="Data through: "
                        value={tooltipData.data_through}
                    />
                    <TooltipItem
                        label="Test Positivity (Past Week): "
                        value={tooltipData.testpos_past_week_fmt}
                    />
                    <TooltipItem
                        label="Test Volume (Past Week): "
                        value={tooltipData.testvol_past_week_fmt}
                    />
                    <TooltipItem
                        label="Test Positivity (Past 2 Weeks): "
                        value={tooltipData.testpos_past_2weeks_fmt}
                    />
                    <TooltipItem
                        label="Test Volume (Past 2 Weeks): "
                        value={tooltipData.testvol_past_2weeks_fmt}
                    />
                </div>
            );
        } else if (state.timePeriod === "past4Weeks") {
            content = (
                <div>
                    <TooltipItem label={tooltipData.region} />
                    <TooltipItem
                        label="Data through: "
                        value={tooltipData.data_through}
                    />
                    <TooltipItem
                        label="Test Positivity (Past 2 Weeks): "
                        value={tooltipData.testpos_past_2weeks_fmt}
                    />
                    <TooltipItem
                        label="Test Volume (Past 2 Weeks): "
                        value={tooltipData.testvol_past_2weeks_fmt}
                    />
                    <TooltipItem
                        label="Test Positivity (Past 4 Weeks): "
                        value={tooltipData.testpos_past_4weeks_fmt}
                    />
                    <TooltipItem
                        label="Test Volume (Past 4 Weeks): "
                        value={tooltipData.testvol_past_4weeks_fmt}
                    />
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
