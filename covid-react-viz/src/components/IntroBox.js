const IntroBox = () => {
    return (
        <div class="bg-red-100 rounded-md mb-12 p-4">
            <div class="text-center font-bold text-lg mb-4">
                <p>Good day!</p>
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
                    . It's created from scratch from the data downloadable from the site.
                </p>
            </div>
        </div>
    );
};

export default IntroBox;
