import { median, extent } from "d3";

export const getStateKey = (obj, state) => {
    return obj[state.view][state.timePeriod][state.metric];
};

export const centroid = (geometry) => {
    const coords = geometry.coordinates;

    const xVals = coords
        .map((a) => a[0])
        .map((b) => b.map((c) => c[0]))
        .flat();
    const yVals = coords
        .map((a) => a[0])
        .map((b) => b.map((c) => c[1]))
        .flat();
    const extentX = extent(xVals);
    const extentY = extent(yVals);
    return [median(extentX), median(extentY)];
};
