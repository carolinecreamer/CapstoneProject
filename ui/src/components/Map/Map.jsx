import React from "react";
import { geoCentroid } from "d3-geo";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import { BsStar, BsStarFill } from "react-icons/bs";
import Popover from 'react-bootstrap/Popover';
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  Annotation
} from "react-simple-maps";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Map.css'

import allStates from "../../../public/allstates.json";
import states from "../../../public/cityData.json";

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

const Map = () => {
  return (
    <ComposableMap projection="geoAlbers">
      <Geographies geography={geoUrl}>
        {({ geographies }) => (
          <>
          {/* Maps over each state to create a Geography object for each state -> Geography object is the state image on the map */}
            {geographies.map(geo => (
              <Geography
                key={geo.rsmKey}
                stroke="#FFF"
                geography={geo}
                fill="#DDD"
                className="state"
              />
            ))}
            {/* Maps over each state to add a label to each state*/}
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

      {
        // Maps over each city in each state to add a marker on its location. The markers are encapsulated by an Overlay Trigger so that a
        // popup window appears with info about the city, when the marker is clicked on
        states.map((state) => (
          state.cities.map(({name, coordinates}) => {
            return (
            <Marker key={name} coordinates={coordinates}>
              <OverlayTrigger key={name} rootClose trigger="click" placement="right" overlay={
                <Popover className="popover" id="popover-basic" key="state">
                  <Popover.Header as="h4"><h4 className="popover-title">{name}</h4><BsStar className="popover-star"/></Popover.Header>

                  <Popover.Body>Api call using name as search param here</Popover.Body>
                </Popover>}>
                <circle r={5} fill="#F00" stroke="#fff" strokeWidth={2} /></OverlayTrigger>
            </Marker>)
          })
        )
        )
      }
    </ComposableMap>
  );
};

export default Map;
