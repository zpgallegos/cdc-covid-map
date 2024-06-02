const IntroBox = () => {
    return (
        <div className="bg-red-100 rounded-md mb-4 p-4">
            <div className="text-center font-bold text-lg mb-4">
                <p>Good day! 😀</p>
            </div>
            <div>
                <p>
                    This is a recreation of the CDC's COVID-19 tracker map found{" "}
                    <a
                        className="text-blue-600"
                        href="https://covid.cdc.gov/covid-data-tracker/#maps_percent-covid-deaths"
                        target="_blank"
                        rel="noreferrer"
                    >
                        here
                    </a>
                    . It's created from scratch from the{" "}
                    <a
                        className="text-blue-600"
                        href="https://github.com/zpgallegos/cdc-covid-map/blob/master/covid-react-viz/src/data/united_states_covid19_deaths_ed_visits_and_positivity_by_state.csv"
                        target="_blank"
                        rel="noreferrer"
                    >
                        data downloadable from the site
                    </a>
                    . The map is made via D3.js with React and TailwindCSS. See the full
                    code on{" "}
                    <a
                        className="text-blue-600"
                        href="https://github.com/zpgallegos/cdc-covid-map/tree/master"
                        target="_blank"
                        rel="noreferrer"
                    >
                        GitHub
                    </a>{" "}
                    (the Python preprocessing code is{" "}
                    <a
                        className="text-blue-600"
                        href="https://github.com/zpgallegos/cdc-covid-map/tree/master/dataprep"
                        target="_blank"
                        rel="noreferrer"
                    >
                        here
                    </a>
                    , and the React viz is{" "}
                    <a
                        className="text-blue-600"
                        href="https://github.com/zpgallegos/cdc-covid-map/tree/master/covid-react-viz"
                        target="_blank"
                        rel="noreferrer"
                    >
                        here
                    </a>
                    ). Thanks! 🍾
                </p>
            </div>
        </div>
    );
};

export default IntroBox;
