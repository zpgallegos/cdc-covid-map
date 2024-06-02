import InputControls from "./components/InputControls";
import ChartTitle from "./components/ChartTitle";
import CovidMap from "./components/CovidMap";
import Legend from "./components/Legend";

import usMap from "./data/counties-10m.json";
import data from "./data/properties.json";
import regionMap from "./data/region_map.json";

import { feature, merge } from "topojson-client";

const stateFeatures = feature(
    usMap,
    usMap.objects.states,
    (a, b) => a !== b
).features.filter((obj) => data.hasOwnProperty(obj.id));

stateFeatures.forEach((d) => {
    d.measures = data[d.id];
});

const regionFeatures = [];
for (let key in regionMap) {
    const merged = merge(
        usMap,
        usMap.objects.states.geometries.filter((d) => regionMap[key].ids.includes(d.id))
    );

    regionFeatures.push({
        type: "Feature",
        id: key,
        geometry: merged,
        centroid: regionMap[key].centroid,
    });
}

function App() {
    return (
        <div className="App">
            <div className="mx-auto" style={{ width: "75%" }}>
                <InputControls />
                <ChartTitle />
                <CovidMap stateFeatures={stateFeatures} regionFeatures={regionFeatures} />
                <Legend />
            </div>
        </div>
    );
}

export default App;
