import { useContext } from "react";
import { AppContext } from "../AppContext";

import { getStateKey } from "../utils";

const title = {
    deaths: {
        pastWeek: {
            perc: "Percentage of Provisional Deaths Due to COVID-19 in the Past Week, by State/Territory - United States",
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
    ed: {
        pastWeek: {
            perc: "Percentage of Emergency Department (ED) Visits with Diagnosed COVID-19 in the Past Week, by State/Territory - United States",
            perc_chg:
                "Change (%) in Percentage of Emergency Department (ED) Visits Diagnosed as COVID-19 from Prior Week, by State/Territory - United States",
        },
    },
    testpos: {
        pastWeek: {
            perc_pos:
                "Percent Positivity of COVID-19 Nucleic Acid Amplification Tests (NAATs) in the Past Week by HHS Region - United States",
            perc_pos_chg:
                "Change (%) in Percent Positivity of COVID-19 Nucleic Acid Amplification Tests (NAATs) from Prior Week by HHS Region - United States",
        },
        past2Weeks: {
            perc_pos:
                "Percent Positivity of COVID-19 Nucleic Acid Amplification Tests (NAATs) in the Past 2 Weeks by HHS Region - United States",
        },
        past4Weeks: {
            perc_pos:
                "Percent Positivity of COVID-19 Nucleic Acid Amplification Tests (NAATs) in the Past 4 Weeks by HHS Region - United States",
        },
    },
};

const ChartTitle = () => {
    const { state } = useContext(AppContext);

    const titleText = getStateKey(title, state);

    return (
        <div className="my-4 text-center">
            <h1 className="text-xl font-semibold">{titleText}</h1>
        </div>
    );
};

export default ChartTitle;
