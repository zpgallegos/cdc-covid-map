import { feature } from "topojson-client";

import InputControls from "./components/InputControls";
import ChartTitle from "./components/ChartTitle";
import CovidMap from "./components/CovidMap";
import Legend from "./components/Legend";

import usMap from "./data/counties-10m.json";
import data from "./data/properties.json";

const stateFeatures = feature(
    usMap,
    usMap.objects.states,
    (a, b) => a !== b
).features.filter((obj) => data.state_data.hasOwnProperty(obj.id));

stateFeatures.forEach((d) => {
    d.measures = data.state_data[d.id];
});

const regionData = data.region_data;


function App() {
    return (
        <div className="App">
            <div className="mx-auto" style={{ width: "75%" }}>
                <InputControls />
                <ChartTitle />
                <CovidMap stateFeatures={stateFeatures} regionData={regionData} />
                <Legend />
            </div>
        </div>
    );
}

export default App;
