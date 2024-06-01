import { useContext } from "react";
import { AppContext } from "../AppContext";
import InputExplainBox from "./InputExplainBox";

const viewVals = ["deaths", "ed", "testpos"];
const viewLabels = ["Deaths", "Emergency Deparment Visits", "Test Positivity"];

const timePeriodVals = {
    deaths: ["pastWeek", "past3mo", "all"],
    ed: ["pastWeek"],
    testpos: ["pastWeek", "past2Weeks", "past4Weeks"],
};
const timePeriodLabels = {
    deaths: ["Past Week", "Past 3 Months", "Since Jan 1, 2020"],
    ed: ["Past Week"],
    testpos: ["Past Week", "Past 2 Weeks", "Past 4 Weeks"],
};

const metricVals = {
    deaths: {
        pastWeek: ["perc"],
        past3mo: ["count", "per_cap"],
        all: ["count", "per_cap"],
    },
    ed: {
        pastWeek: ["perc", "perc_chg"],
    },
    testpos: {
        pastWeek: ["perc_pos", "perc_pos_chg"],
        past2Weeks: ["perc_pos"],
        past4Weeks: ["perc_pos"],
    },
};

const metricLabels = {
    deaths: {
        pastWeek: ["% of deaths due to COVID-19"],
        past3mo: ["Count", "Rate per 100,000 (age adjusted)"],
        all: ["Count", "Rate per 100,000 (age adjusted)"],
    },
    ed: {
        pastWeek: [
            "% of ED visits diagnosed as COVID-19",
            "Percent change, % of ED visits diagnosed as COVID-19 from prior week",
        ],
    },
    testpos: {
        pastWeek: [
            "Test positivity (%), past week",
            "% Change in % positivity from prior week",
        ],
        past2Weeks: ["Test positivity (%)"],
        past4Weeks: ["Test positivity (%)"],
    },
};

const InputControls = () => {
    const { state, setState } = useContext(AppContext);

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "view") {
            const timePeriod = timePeriodVals[value][0];
            setState((prevState) => ({
                ...prevState,
                view: value,
                timePeriod: timePeriod,
                metric: metricVals[value][timePeriod][0],
            }));
        } else if (name === "timePeriod") {
            setState((prevState) => ({
                ...prevState,
                timePeriod: value,
                metric: metricVals[state.view][value][0],
            }));
        } else {
            setState((prevState) => ({
                ...prevState,
                [name]: value,
            }));
        }
    };

    return (
        <div className="m-5 rounded-lg bg-sky-100">
            <div className="p-4">
                <div className="flex flex-col space-y-5 mb-5 md:flex-row md:space-y-0 md:space-x-12">
                    <div>
                        <p className="font-bold">View:</p>
                        {viewVals.map((val, i) => (
                            <div key={val} className="flex flex-row">
                                <input
                                    type="radio"
                                    id={val}
                                    name="view"
                                    value={val}
                                    checked={state.view === val}
                                    onChange={handleChange}
                                />
                                <label className="ml-1">{viewLabels[i]}</label>
                            </div>
                        ))}
                    </div>

                    <div>
                        <p className="font-bold">Time Period:</p>
                        {timePeriodVals[state.view].map((val, i) => (
                            <div key={val} className="flex flex-row">
                                <input
                                    type="radio"
                                    id={val}
                                    name="timePeriod"
                                    value={val}
                                    checked={state.timePeriod === val}
                                    onChange={handleChange}
                                />
                                <label className="ml-1">
                                    {timePeriodLabels[state.view][i]}
                                </label>
                            </div>
                        ))}
                    </div>

                    <div>
                        <p className="font-bold">Metric:</p>
                        {metricVals[state.view][state.timePeriod].map((val, i) => (
                            <div key={val} className="flex flex-row">
                                <input
                                    type="radio"
                                    id={val}
                                    name="metric"
                                    value={val}
                                    checked={state.metric === val}
                                    onChange={handleChange}
                                />
                                <label className="ml-1">
                                    {metricLabels[state.view][state.timePeriod][i]}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>
                <InputExplainBox />
            </div>
        </div>
    );
};

export default InputControls;
