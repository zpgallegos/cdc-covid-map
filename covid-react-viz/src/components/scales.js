import { scaleOrdinal } from "d3";

// View: Deaths
// Time Period: In Past Week
// Metric: Percentage of deaths due to COVID-19 in past week

const scale0 = scaleOrdinal()
    .domain([
        "1-9 COVID-19 deaths",
        "<2%",
        "2.0% to 3.9%",
        "4.0% to 5.9%",
        "6.0% to 7.9%",
        "≥8%",
    ])
    .range([
        "url(#blueDiagonalHatch)",
        "#399f9a",
        "#46cc99",
        "#fcff99",
        "#f6b871",
        "#f48d59",
    ]);

// View: Deaths
// Time Period: Past 3 Months
// Metric: Count

const scale1 = scaleOrdinal()
    .domain([
        "Data not available",
        "0",
        "1-9",
        "10-24",
        "25-49",
        "50-99",
        "100-199",
        "≥200",
    ])
    .range([
        "#808080",
        "#ffffff",
        "#cbffcc",
        "#80cdbb",
        "#42b5c3",
        "#1c91c0",
        "#235ea8",
        "#003367",
    ]);

// View: Deaths
// Time Period: Past 3 Months
// Metric: Rate per 100,000 (age adjusted)

const scale2 = scaleOrdinal()
    .domain([
        "Data not available",
        "Not Calculated (<20 deaths)",
        "1.0-1.4",
        "1.5-1.7",
        "1.8-1.9",
        "2.0-2.2",
        "2.3-3.1",
        "3.2-4.7",
    ])
    .range([
        "#808080",
        "url(#greenDiagonalHatch)",
        "#cdffcd",
        "#80cdbb",
        "#42b6c4",
        "#f8f8f8",
        "#235ea8",
        "#003367",
    ]);

const colorScaleMap = {
    deaths: {
        pastWeek: {
            perc: {
                metric: "perc_deaths_past_week_cat",
                colorScale: scale0,
            },
        },
        past3mo: {
            count: {
                metric: "deaths_3mo_cat",
                colorScale: scale1,
            },
            per_cap: {
                metric: "deaths_per100k_3mo_cat",
                colorScale: scale2,
            },
        },
    },
};

export default colorScaleMap;
