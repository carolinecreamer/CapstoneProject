import React from "react";
import { geoCentroid } from "d3-geo";
import Popover from 'react-bootstrap/Popover';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  Annotation
} from "react-simple-maps";

import allStates from "../../../public/allstates.json";

const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

// Offsets are states that are too small to fit a label -- these coordinates determine where their label goes relative to the state so that
// the map doesn't look too cluttered
const offsets = {
  VT: [50, -8],
  NH: [34, 2],
  MA: [30, -1],
  RI: [28, 2],
  CT: [35, 10],
  NJ: [34, 1],
  DE: [33, 0],
  MD: [47, 10],
  DC: [49, 21]
};

function handleMouseClick(geo) {
  console.log(geo.properties.name);
}

const popover = (geo) => (
  <Popover className="popover" id="popover-basic" key={geo.rsmKey}>
    <Popover.Header as="h3">{geo.properties.name}</Popover.Header>
  </Popover>
)

const Map = () => {
  return (
    <ComposableMap projection="geoAlbersUsa">
      <Geographies geography={geoUrl}>
        {({ geographies }) => (
          <>
            {geographies.map(geo => (
              <OverlayTrigger trigger="click" placement="left" overlay={() => popover(geo)} rootClose={true} onHide={() => {show = false}}>
                <Geography
                  key={geo.rsmKey}
                  stroke="#FFF"
                  geography={geo}
                  fill="#DDD"
                  className="state"
                />
              </OverlayTrigger>
            ))}
            {geographies.map(geo => {
              const centroid = geoCentroid(geo);
              const cur = allStates.find(s => s.val === geo.id);
              return (
                <g key={geo.rsmKey + "-name"}>
                  {cur &&
                    centroid[0] > -160 &&
                    centroid[0] < -67 &&
                    (Object.keys(offsets).indexOf(cur.id) === -1 ? (
                      <Marker coordinates={centroid}>
                        <text y="2" fontSize={14} textAnchor="middle">
                          {cur.id}
                        </text>
                      </Marker>
                    ) : (
                      <Annotation
                        subject={centroid}
                        dx={offsets[cur.id][0]}
                        dy={offsets[cur.id][1]}
                      >
                        <text x={4} fontSize={14} alignmentBaseline="middle">
                          {cur.id}
                        </text>
                      </Annotation>
                    ))}
                </g>
              );
            })}
          </>
        )}
      </Geographies>
    </ComposableMap>
  );
};

export default Map;
