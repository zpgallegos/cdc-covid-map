import { useContext } from "react";
import { AppContext } from "../AppContext";

import { getStateKey } from "../utils";

const title = {
    deaths: {
        pastWeek: {
            perc: "Percentage of Provisional Deaths Due to COVID-19 in the Past Week, by State/Territory – United States",
        },
        past3mo: {
            count: "Number of COVID-19 deaths in past 3 months",
            per_cap: "Number of COVID-19 deaths per 100,000 people in past 3 months",
        },
        all: {
            count: "Total number of COVID-19 deaths",
            per_cap: "Number of COVID-19 deaths per 100,000 people",
        },
    },
};

const ChartTitle = () => {
    const { state } = useContext(AppContext);

    const titleText = getStateKey(title, state);

    return (
        <div className="mb-10 text-center p-4">
            <h1 className="text-2xl font-semibold">{titleText}</h1>
        </div>
    );
};

export default ChartTitle;
