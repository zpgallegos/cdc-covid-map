import { scaleOrdinal } from "d3";

const coolWarm = ["#399f9a", "#46cc99", "#fcff99", "#f6b871", "#f48d59"];

const blues = [
    "#808080",
    "#cdffcd",
    "#80cdbb",
    "#42b6c4",
    "#1c91c0",
    "#235ea8",
    "#003367",
];

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
    .range(["url(#blueDiagonalHatch)"].concat(coolWarm));

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
    .range(blues.slice(0, 1).concat(["#ffffff"]).concat(blues.slice(1)));

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
    .range(blues.slice(0, 1).concat(["url(#greenDiagonalHatch)"]).concat(blues.slice(1)));

// View: Deaths
// Time Period: all
// Metric: Count

const scale3 = scaleOrdinal()
    .domain([
        "Data not available",
        "1,166 - 4,141",
        "5,760 - 9,917",
        "11,054 - 16,575",
        "18,036 - 30,651",
        "35,918 - 55,205",
        "83,308 - 113,073",
    ])
    .range(blues);

// View: Deaths
// Time Period: all
// Metric: Rate per 100,000 (age adjusted)


const scale4 = scaleOrdinal()
    .domain([
        "Data not available",
        "104.9 - 206.5",
        "238.5 - 264.2",
        "273.3 - 294.5",
        "303.1 - 329.8",
        "335.0 - 375.9",
        "387.3 - 449.4",
    ])
    .range(blues);

// View: Emergency Department Visits
// Time Period: Past Week
// Metric: % of ED visits diagnosed as COVID-19

const scale5 = scaleOrdinal()
    .domain([
        "Insufficient Data",
        "Minimal (<1.5%)",
        "Low (1.5% to 2.9%)",
        "Moderate (3.0% to 4.4%)",
        "Substantial (4.5% to 5.9%)",
        "High (≥6%)",
    ])
    .range(["#808080"].concat(coolWarm));

// View: Emergency Department Visits
// Time Period: Past Week
// Metric: Percent change, % of ED visits diagnosed as COVID-19 from prior week

const scale6 = scale5
    .copy()
    .domain([
        "Insufficient Data",
        "Substantial Decrease (<19.9%)",
        "Moderate Decrease (-19.9% to -10.0%)",
        "Stable (-9.9% to 9.9%)",
        "Moderate Increase (10.0% to 19.9%)",
        "Substantial Increase (>19.9%)",
    ]);

// View: Test Positivity
// Time Period: Past Week
// Metric: Test positivity (%), past week

const scale7 = scale5
    .copy()
    .domain([
        "Insufficient Data",
        "<5%",
        "5% to 9.9%",
        "10% to 14.9%",
        "15% to 19.9%",
        "≥20%",
    ]);

// View: Test Positivity
// Time Period: Past Week
// Metric: % Change in % positivity from prior week

const scale8 = scale5
    .copy()
    .domain([
        "Insufficient Data",
        "≤ -20.0%",
        "-19.9% to -10.0%",
        "-9.9% to 9.9%",
        "10.0% to 19.9%",
        "≥ 20.0%",
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
        all: {
            count: {
                metric: "total_deaths_cat",
                colorScale: scale3,
            },
            per_cap: {
                metric: "total_deaths_per100k_cat",
                colorScale: scale4,
            },
        },
    },
    ed: {
        pastWeek: {
            perc: {
                metric: "perc_ed_cov_cat",
                colorScale: scale5,
            },
            perc_chg: {
                metric: "perc_ed_chg_cat",
                colorScale: scale6,
            },
        },
    },
    testpos: {
        pastWeek: {
            perc_pos: {
                metric: "testpos_past_week_cat",
                colorScale: scale7,
            },
            perc_pos_chg: {
                metric: "testpos_chg_cat",
                colorScale: scale8,
            },
        },
        past2Weeks: {
            perc_pos: {
                metric: "testpos_past_2weeks_cat",
                colorScale: scale7,
            },
        },
        past4Weeks: {
            perc_pos: {
                metric: "testpos_past_4weeks_cat",
                colorScale: scale7,
            },
        },
    },
};

export default colorScaleMap;
