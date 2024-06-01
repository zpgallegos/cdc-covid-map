import React, { createContext, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [state, setState] = useState({
        view: "deaths",
        timePeriod: "pastWeek",
        metric: "perc",
        tooltipData: {},
    });

    return (
        <AppContext.Provider value={{ state, setState }}>{children}</AppContext.Provider>
    );
};
