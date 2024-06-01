import { useContext } from "react";
import { AppContext } from "../AppContext";

const InputExplainBox = () => {
    const { state } = useContext(AppContext);

    const content = {
        deaths: {
            pastWeek: {
                perc: (
                    <p>
                        This shows the percentage of deaths due to COVID-19 in the past
                        week, as a timely measure of mortality trends. The percentage of
                        COVID-19 deaths is less affected by incomplete reporting in recent
                        weeks because death certificate data from COVID-19 and all causes
                        have similar timeliness. For more information on deaths, see the{" "}
                        <span className="text-blue-600">trends</span> page.
                    </p>
                ),
            },
            past3mo: {
                count: (
                    <p>
                        This shows the total number of COVID-19 deaths in the past 3
                        months. For more information on deaths, see the{" "}
                        <span className="text-blue-600">trends</span> page.
                    </p>
                ),
                per_cap: (
                    <p>
                        This shows the number of COVID-19 deaths for every 100,000 people
                        in the past 3 months, allowing for comparisons between areas with
                        different population sizes and age distributions. For more
                        information on deaths, see the{" "}
                        <span className="text-blue-600">trends</span> page.
                    </p>
                ),
            },
            all: {
                count: (
                    <p>
                        This shows the total number of COVID-19 deaths since January 1,
                        2020. For more information on deaths, see the{" "}
                        <span className="text-blue-600">trends</span> page.
                    </p>
                ),
                per_cap: (
                    <p>
                        This shows the number of deaths since January 1, 2020 for every
                        100,000 people, allowing for comparisons between areas with
                        different population sizes and age distributions. For more
                        information on deaths, see the{" "}
                        <span className="text-blue-600">trends</span> page.
                    </p>
                ),
            },
        },
        ed: {
            pastWeek: {
                perc: (
                    <p>
                        This shows the percentage of emergency department visits that were
                        diagnosed as COVID-19 in the past week, as a timely measure of
                        burden. For more information on emergency department visits, see
                        the <span className="text-blue-600">trends</span> page. For daily
                        data updated twice a week, please see the{" "}
                        <span className="text-blue-600">
                            Trends in Emergency Department (ED) Visits
                        </span>{" "}
                        page.
                    </p>
                ),
                perc_chg: (
                    <p>
                        This shows the percent change in the percentage of emergency
                        department visits that were diagnosed as COVID-19 in the past week
                        compared with the prior week, as a timely measure of how trends
                        are changing. For more information on emergency department visits,
                        see the <span className="text-blue-600">trends</span> page. For
                        daily data updated twice a week, please see the{" "}
                        <span className="text-blue-600">
                            Trends in Emergency Department (ED) Visits
                        </span>{" "}
                        page.
                    </p>
                ),
            },
        },
        testpos: {
            pastWeek: {
                perc_pos: (
                    <p>
                        This shows the percentage of COVID-19 nucleic antigen
                        amplification tests that were positive over the past week.
                    </p>
                ),
                perc_pos_chg: (
                    <p>
                        This shows the percent change in the percentage of COVID-19
                        nucleic antigen amplification tests in the past week compared with
                        the prior week, as a timely measure of how trends are changing.
                    </p>
                ),
            },
            past2Weeks: {
                perc_pos: (
                    <p>
                        This shows the percentage of COVID-19 nucleic antigen
                        amplification tests that were positive over the past 2 weeks.
                    </p>
                ),
            },
            past4Weeks: {
                perc_pos: (
                    <p>
                        This shows the percentage of COVID-19 nucleic antigen
                        amplification tests that were positive over the past 4 weeks.
                    </p>
                ),
            },
        },
    };

    return (
        <div className="bg-gray-200 rounded-md p-4">
            {content[state.view][state.timePeriod][state.metric]}
        </div>
    );
};

export default InputExplainBox;
