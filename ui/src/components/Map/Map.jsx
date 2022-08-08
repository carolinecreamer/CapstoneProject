import React from "react";
import { geoCentroid } from "d3-geo";
import PopoverTrigger from "../PopoverTrigger/PopoverTrigger";
import Popover from 'react-bootstrap/Popover';
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  Annotation,
  ZoomableGroup
} from "react-simple-maps";
import 'bootstrap/dist/css/bootstrap.min.css';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import './Map.css'
import allStates from "../../../public/allstates.json";
import states from "../../../public/cityData.json";
import statesJSON from "../../../public/states.json";

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


// consts for US boundaries in longitude
const MIN_US_LONGITUDE = -160;
const MAX_US_LONGITUDE = -67;

const Map = ({ cities, following, friendFavorites, queryCityFromDB }) => {
  return (
    <ComposableMap projection="geoAlbers">
      <ZoomableGroup>
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
                    {
                      cur &&
                      centroid[0] > MIN_US_LONGITUDE &&
                      centroid[0] < MAX_US_LONGITUDE &&
                      (cur.id in Object.keys(offsets) ? (
                        <Annotation
                          subject={centroid}
                          dx={offsets[cur.id][0]}
                          dy={offsets[cur.id][1]}
                        >

                          <text x={4} fontSize={14} alignmentBaseline="middle">
                            {cur.id}
                          </text>

                        </Annotation>
                      ) : (
                        <Marker coordinates={centroid}>
                          <text y="2" fontSize={14} textAnchor="middle">
                            {cur.id}
                          </text>
                        </Marker>
                      )
                      )}
                  </g>
                );
              })}
            </>
          )}
        </Geographies>

        {
          // Maps over each city in each state to add a marker on its location. The markers are encapsulated by an Overlay Trigger so that a
          // popup window appears with info about the city, when the marker is clicked on
          states?.map((state) => (
            state?.cities?.map(({ name, coordinates }) => {
              let saved = false;
              if (cities.length > 0) {
                cities?.map((city) => {
                  if (city.includes(name) && city.includes(state.abbreviation)) {
                    saved = true;
                  }
                })
              }
              // Upload a marker for each city and, if the city is saved by a user that the current user is following, add a popover
              // containing the names of users that have that city saved
              return (
                <Marker coordinates={coordinates}>
                  <PopoverTrigger friendFavorites={friendFavorites} city={name} state={state.abbreviation} saved={saved} queryCityFromDB={queryCityFromDB} />
                  {
                    friendFavorites.has([name, state.abbreviation].join(',')) ?
                      <OverlayTrigger rootClose trigger="click" placement="right" overlay={
                        <Popover className="popover" id="popover-basic" >
                          <Popover.Header >
                            <h4 className="popover-title">{name}, {state.abbreviation}</h4>
                          </Popover.Header>

                          <Popover.Body>
                            {
                              friendFavorites.get([name, state.abbreviation].join(',')).map((friend) => {
                                return (
                                  <p>{friend.username}</p>
                                )
                              })
                            }
                          </Popover.Body>
                        </Popover>
                      }>
                        <g
                          fill="#1266F1"

                          strokeWidth="1"
                          strokeLinecap="round"
                          strokeLinejoin="round"

                        >

                          <text>🤗</text>
                        </g>



                      </OverlayTrigger> : null

                  }
                </Marker>
              )


            })
          )
          )
        }
      </ZoomableGroup>
    </ComposableMap>
  );
};

export default Map;
