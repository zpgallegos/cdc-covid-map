import { useContext } from "react";
import { AppContext } from "../AppContext";
import { getStateKey } from "../utils";
import colorScaleMap from "./scales";

import DiagonalHatchBlue from "../assets/diagonalHatch-blue.svg";
import DiagonalHatchGreen from "../assets/diagonalHatch-green.svg";

const hatches = {
    blueDiagonalHatch: DiagonalHatchBlue,
    greenDiagonalHatch: DiagonalHatchGreen,
};

const extractHatch = (id) => {
    const match = id.match(/url\(#(\w+)\)/);
    return match ? hatches[match[1]] : null;
};

const legendTitle = {
    deaths: {
        pastWeek: {
            perc: "Percentage of deaths due to COVID-19 in past week",
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
            perc: "Percent of ED visits diagnosed as COVID-19",
            perc_chg:
                "Percent change in % of visits diagnosed as COVID-19 from last week compared to prior week",
        },
    },
    testpos: {
        pastWeek: {
            perc_pos: "COVID-19 Test Positivity (%)",
            perc_pos_chg: "% Change in test positivity from prior week",
        },
        past2Weeks: {
            perc_pos: "COVID-19 Test Positivity (%)",
        },
        past4Weeks: {
            perc_pos: "COVID-19 Test Positivity (%)",
        },
    },
};

const Legend = () => {
    const { state } = useContext(AppContext);

    const title = getStateKey(legendTitle, state);
    const { colorScale } = getStateKey(colorScaleMap, state);
    const categories = colorScale.domain();

    return (
        <div className="border border-gray-300 rounded-md p-2">
            <h2 className="text-center font-semibold mb-5">{title}</h2>
            <div className="flex justify-center">
                <div className="w-full flex flex-row justify-between">
                    {categories.map((category, i) => {
                        let style;
                        const color = colorScale(category);
                        if (color.startsWith("url")) {
                            const hatch = extractHatch(color);
                            style = { backgroundImage: `url(${hatch})` };
                        } else {
                            style = { backgroundColor: color };
                        }

                        return (
                            <div
                                key={i}
                                className="flex flex-col items-center text-center"
                            >
                                <div
                                    className="w-5 h-5 rounded-full border border-gray-300 mb-1"
                                    style={style}
                                ></div>
                                <p className="text-sm">{category}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Legend;
