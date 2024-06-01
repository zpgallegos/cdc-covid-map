import re
import json
import argparse
import pandas as pd

from numpy import nan

DATA_THROUGH = "May 18 2024"  # hardcoded from the tooltips on the site

ID_MAP = json.loads(open("id_map.json").read())

DATE_RE = re.compile(r"^date generated: \w+ (?P<date>\w+ \d+ \d+)", re.I)


def get_date_generated(file: str) -> str:
    line = pd.read_csv(file, skiprows=1, nrows=1, header=None).iloc[0, 0]
    return DATE_RE.search(line).group("date")


def format_signed_percent(val: float) -> str:
    if pd.isnull(val):
        return "N/A"
    sign = "+" if val > 0 else "-" if val < 0 else ""
    return f"{sign}{abs(val):.1f}%"


def format_comma_int(val: int) -> str:
    if not isinstance(val, int):
        val = int(val)
    return f"{val:,}"


def format_comma_float(val: float) -> str:
    return f"{val:,.1f}"


REMOVE_STATES = set(
    [
        "American Samoa",
        "Federated States of Micronesia",
        "Guam",
        "New York (excludes NYC)",
        "New York City",
        "Northern Mariana Islands",
        "Palau",
        "Republic of Marshall Islands",
        "Virgin Islands",
        "United States of America",
    ]
)

RENAME = {
    "State/Territory": "state",
    "HHS Region": "region",
    "Percentage of deaths due to COVID-19 in past week": "perc_deaths_past_week",
    "Percent change percentage of deaths due to COVID-19 in past week": "perc_chg_past_week",
    "Absolute change percentage of deaths due to COVID-19 in past week": "abs_chg_past_week",
    "Deaths in the Past 3 Months": "deaths_3mo",
    "Death Rate per 100000 for the Past 3 Months": "deaths_per100k_3mo_fmt",
    "Total Deaths": "total_deaths",
    "Total Death rate per 100000": "total_deaths_per100k",
    "Percent of ED visits diagnosed as COVID-19": "perc_ed_cov",
    "Percent change in % of visits diagnosed as COVID-19 from last week compared to prior week": "perc_ed_chg",
    "Test positivity (%) in past week": "testpos_past_week",
    "% Change in test positivity compared with prior week": "testpos_chg",
    "Test positivity (%) in past 2 weeks": "testpos_past_2weeks",
    "Test positivity (%) in past 4 weeks": "testpos_past_4weeks",
    "Test volume in past week": "testvol_past_week",
    "Test volume in past 2 weeks": "testvol_past_2weeks",
    "Test volume in past 4 weeks": "testvol_past_4weeks",
}

DTYPES = {
    "deaths_3mo": int,
    "total_deaths": int,
}

FORMATS = {
    "perc_chg_past_week": format_signed_percent,
    "abs_chg_past_week": format_signed_percent,
    "deaths_3mo": format_comma_int,
    "total_deaths": format_comma_int,
    "total_deaths_per100k": format_comma_float,
}


if __name__ == "__main__":

    infile = "united_states_covid19_deaths_ed_visits_and_positivity_by_state.csv"

    ap = argparse.ArgumentParser()
    ap.add_argument("-f", "--infile", required=True)
    args = vars(ap.parse_args())

    infile = args["infile"]

    read_args = {
        "filepath_or_buffer":infile,
        "skiprows": 2,
        "header": "infer",
        "na_values": ["N/A", "Data not available"],
    }

    d = pd.read_csv(**read_args).rename(columns=RENAME)
    d = d[~d.state.isin(REMOVE_STATES)].astype(DTYPES)
    d["id"] = d.state.map(ID_MAP)
    d = d.set_index("id").sort_index()

    for col, f in FORMATS.items():
        d.insert(d.columns.get_loc(col) + 1, col + "_fmt", d[col].apply(f))

    # View: Deaths
    # Time Period: In Past Week
    # Metric: Percentage of deaths due to COVID-19 in past week

    col = "perc_deaths_past_week"
    idx = d.columns.get_loc(col)

    def format(x: str) -> str:
        if x == "Counts 1-9":
            return x
        return f"{x}%"

    def categorize(x: str) -> str:
        if x == "Counts 1-9":
            return "1-9 COVID-19 deaths"
        val = float(x)
        if val < 2:
            return "<2%"
        if val < 4:
            return "2.0% to 3.9%"
        if val < 6:
            return "4.0% to 5.9%"
        if val < 8:
            return "6.0% to 7.9%"

        return "≥8.0%"

    d.insert(idx + 1, f"{col}_fmt", d[col].apply(format))
    d.insert(idx + 2, f"{col}_cat", d[col].apply(categorize))

    # View: Deaths
    # Time Period: Past 3 Months
    # Metric: Count

    col = "deaths_3mo"

    def categorize(x: int) -> str:
        if pd.isnull(x):
            return "Data not available"

        if x == 0:
            return "0"

        cuts = [0, 9, 24, 49, 99, 199]
        for a, b in zip(cuts, cuts[1:]):
            if x <= b:
                return f"{a+1}-{b}"

        return "≥200"

    d.insert(d.columns.get_loc(col) + 1, f"{col}_cat", d[col].apply(categorize))

    # View: Deaths
    # Time Period: Past 3 Months
    # Metric: Rate per 100,000 (age adjusted)

    col = "deaths_per100k_3mo_fmt"
    pref = col[:-4]

    def categorize(x: str) -> str:
        if pd.isnull(x):
            return "Data not available"

        if x.startswith("Not Calculated"):
            return x

        val = float(x)

        cuts = [0.9, 1.4, 1.7, 1.9, 2.2, 3.1, 4.7]
        for a, b in zip(cuts, cuts[1:]):
            if a <= val <= b:
                return f"{(a+.1):.1f}-{b:.1f}"

    d.insert(d.columns.get_loc(col) + 1, f"{pref}_cat", d[col].apply(categorize))

    # View: Deaths
    # Time Period: Since Jan 1, 2020
    # Metric: Count

    col = "total_deaths"

    def categorize(x: int) -> str:
        if pd.isnull(x):
            return "Data not available"

        buckets = [
            # not sure how they came up with these...
            [1166, 4141],
            [5759, 9910],
            [11053, 16564],
            [18035, 30638],
            [35903, 55198],
            [83291, 113045],
        ]

        for a, b in buckets:
            if a <= x <= b:
                return f"{a:,} - {b:,}"

    d.insert(d.columns.get_loc(col) + 1, f"{col}_cat", d[col].apply(categorize))

    # View: Deaths
    # Time Period: Since Jan 1, 2020
    # Metric: Rate per 100,000 (age adjusted)

    col = "total_deaths_per100k"

    def categorize(x: int) -> str:
        if pd.isnull(x):
            return "Data not available"

        buckets = [
            [104.8, 206.3],
            [238.2, 264.2],
            [273.3, 294.5],
            [303, 329.6],
            [334.8, 375.8],
            [387.2, 449.3],
        ]

        for a, b in buckets:
            if a <= x <= b:
                return f"{a:,} - {b:,}"

    d.insert(d.columns.get_loc(col) + 1, f"{col}_cat", d[col].apply(categorize))

    # View: Emergency Department Visits
    # Time Period: In Past Week
    # Metric:
    #   Percent of ED visits diagnosed as COVID-19
    #   Percent change in % of visits diagnosed as COVID-19 from prior week

    def categorize0(x: str) -> str:  # perc_ed_cov
        if pd.isnull(x):
            return "Insufficient Data"

        val = float(x[:-1])
        if val < 1.5:
            return "Minimal (<1.5%)"
        if val < 3:
            return "Low (1.5% to 2.9%)"
        if val < 4.5:
            return "Moderate (3.0% to 4.4%)"
        if val < 6:
            return "Substantial (4.5% to 5.9%)"

        return "High (≥6%)"

    def categorize1(x: str) -> str:  # perc_ed_chg
        if pd.isnull(x):
            return "Insufficient Data"

        val = float(x[:-1])
        pos = val > 0
        val = abs(val)

        sfx = "Increase" if pos else "Decrease"

        if val >= 20:
            return f"Substantial {sfx} ({'>' if pos else '<'}19.9%)"

        if val >= 10:
            rng = ["10.0%", "19.9%"]
            if not pos:
                rng = ["-" + x for x in rng[::-1]]
            return f"Moderate {sfx} ({' to '.join(rng)})"

        return "Stable (-9.9% to 9.9%)"

    for col, f in zip(["perc_ed_cov", "perc_ed_chg"], [categorize0, categorize1]):
        idx = d.columns.get_loc(col)
        cat_col, fmt_col = f"{col}_cat", f"{col}_fmt"
        d.insert(idx + 1, cat_col, d[col].apply(f))
        d.insert(idx + 1, fmt_col, d[col] + ", " + d[cat_col])
        d.loc[d[fmt_col].isnull(), fmt_col] = "N/A"

    # View: Test Positivity
    # Time Period: All
    # Metric: All

    tbl = d.groupby("region").agg(
        testpos_past_week=("testpos_past_week", "mean"),
        testvol_past_week=("testvol_past_week", "mean"),
        testpos_chg=("testpos_chg", "mean"),
        testpos_past_2weeks=("testpos_past_2weeks", "mean"),
        testvol_past_2weeks=("testvol_past_2weeks", "mean"),
        testpos_past_4weeks=("testpos_past_4weeks", "mean"),
        testvol_past_4weeks=("testvol_past_4weeks", "mean"),
    )

    tbl["ids"] = d.groupby("region").apply(lambda grp: sorted(grp.index.tolist()))

    for col in [
        "testpos_past_week",
        "testpos_chg",
        "testpos_past_2weeks",
        "testpos_past_4weeks",
    ]:
        tbl.insert(
            tbl.columns.get_loc(col) + 1,
            f"{col}_fmt",
            tbl[col].apply(lambda x: f"{x:.1f}%"),
        )

    for col in ["testvol_past_week", "testvol_past_2weeks", "testvol_past_4weeks"]:
        tbl.insert(
            tbl.columns.get_loc(col) + 1, f"{col}_fmt", tbl[col].apply(format_comma_int)
        )

    def categorize(x: float) -> str:
        if pd.isnull(x):
            return "Insufficient Data"

        if x < 5:
            return "<5%"
        if x < 10:
            return "5% to 9.9%"
        if x < 15:
            return "10% to 14.9%"
        if x < 20:
            return "15% to 19.9%"

        return "≥20%"

    for col in ["testpos_past_week", "testpos_past_2weeks", "testpos_past_4weeks"]:
        tbl.insert(
            tbl.columns.get_loc(f"{col}_fmt") + 1,
            f"{col}_cat",
            tbl[col].apply(categorize),
        )

    col = "testpos_chg"

    def categorize(x: float) -> str:
        if pd.isnull(x):
            return "Insufficient Data"

        if x <= -20:
            return "≤ -20.0%"
        if x < -10:
            return "-19.9% to -10.0%"
        if x < 10:
            return "-9.9% to 9.9%"
        if x < 20:
            return "10.0% to 19.9%"

        return "≥ 20.0%"

    tbl.insert(tbl.columns.get_loc(col) + 1, f"{col}_cat", tbl[col].apply(categorize))

    # done, write out

    d = d.replace(nan, None)

    date_gend = get_date_generated(infile)
    for df in (d, tbl):
        df["date_generated"] = date_gend
        df["data_through"] = DATA_THROUGH

    obj = {
        "state_data": d.to_dict(orient="index"),
        "region_data": tbl.to_dict(orient="index"),
    }

    with open(infile.replace(".csv", ".json"), "w") as f:
        json.dump(obj, f, indent=2)

    d.to_pickle(infile.replace(".csv", ".pkl"))
