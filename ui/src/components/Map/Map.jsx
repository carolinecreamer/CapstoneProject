import React from "react";
import { geoCentroid } from "d3-geo";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  Annotation
} from "react-simple-maps";
import 'bootstrap/dist/css/bootstrap.min.css';

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


// Iterates over each state and renders a "Geography" component (image of the state). Then iterates over each state and adds an abbreviation
// label to each state. Abbreviations are enclosed in an overlay trigger component that renders a popover when the abbreviation is clicked on
const Map = () => {
  return (
    <ComposableMap projection="geoAlbersUsa">
      <Geographies geography={geoUrl}>
        {({ geographies }) => (
          <>
            {geographies.map(geo => (
              <Geography
                key={geo.rsmKey}
                stroke="#FFF"
                geography={geo}
                fill="#DDD"
                className="state"
              />
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
                        <OverlayTrigger key={geo.rsmKey} rootClose trigger="click" placement="right" overlay={
                            <Popover className="popover" id="popover-basic" key="state">
                              <Popover.Header as="h3">{geo.properties.name}</Popover.Header>
                              <Popover.Body>Api call using name as search param here</Popover.Body>
                            </Popover>
                          }>

                        <text y="2" fontSize={14} textAnchor="middle">
                          {cur.id}
                        </text>
                      </OverlayTrigger>
                      </Marker>
                    ) : (
                      <Annotation
                        subject={centroid}
                        dx={offsets[cur.id][0]}
                        dy={offsets[cur.id][1]}
                      >
                        <OverlayTrigger key={geo.rsmKey} rootClose trigger="click" placement="right" overlay={
                          <Popover className="popover" id="popover-basic" key="state">
                            <Popover.Header as="h3">{geo.properties.name}</Popover.Header>
                            <Popover.Body>Api call using name as search param here</Popover.Body>
                          </Popover>
                        }>

                        <text x={4} fontSize={14} alignmentBaseline="middle">
                          {cur.id}
                        </text>
                      </OverlayTrigger>
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
