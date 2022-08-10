import * as React from "react"
import "./Roadtrip.css"
import { geoCentroid } from "d3-geo";
import {
    ComposableMap,
    Geographies,
    Geography,
    Line,
    Marker,
    Annotation,
    ZoomableGroup
  } from "react-simple-maps";
  import states from "../../../public/cityData.json";
  import statesJSON from "../../../public/states.json";
  import PopoverTrigger from "../PopoverTrigger/PopoverTrigger";
  import { OverlayTrigger, Popover } from "react-bootstrap";
  import 'bootstrap/dist/css/bootstrap.min.css';
  import allStates from "../../../public/allstates.json";
  import Map from "../Map/Map";
const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

export default function Roadtrip({currentUser, friendFavorites, getCities, setCities, cities, getFollowing, setFollowing, following, queryCityFromDB}) {
  React.useEffect(() => {
    async function onLoad() {
      const citiesRes = await getCities();
      if (typeof citiesRes.data?.cities != 'undefined') {
        setCities(citiesRes.data.cities);
      }
      else {
        setCities(citiesRes.data);
      }

      const followingRes = await getFollowing();
      if (typeof followingRes.data?.following != 'undefined') {
        setFollowing(followingRes.data.following);
      }
      else {
        setFollowing(followingRes.data);
      }
    }

    onLoad()
  }, [])

  following?.map((friend) => {
    if (friend.username != currentUser.username) {
      friend?.cities?.map((cityArr) => {
        let city = cityArr.join(',')
        if (typeof friendFavorites != 'undefined' && friendFavorites.has(city)) {
          let currentFriends = friendFavorites.get(city);
          currentFriends.push(friend);
          friendFavorites.set(city, currentFriends);
        }
        else {
          friendFavorites.set(city, [friend]);
        }
      })
    }
  })

 if (friendFavorites.size > 0) {
    let currPath= [];

    let bestPath = [];
    let bestPathLen = 0;

    let currCost = 0;

    let numCoordinates = 0;

    let coordinates = [];
    let weight = 0;
    let vertices = [];

    function promising(permLength) {
        if (currCost >= bestPathLen) {
            return false;
        }

        if (currPath.length- permLength <= 5) {
            return true;
        }

        let connectingArmDistance1 = Infinity;
        let connectingArmDistance2 = Infinity;

        for (let i = permLength; i < currPath.length; ++i) {
            let distance1 = distance(currPath[0], currPath[i]);
            let distance2 = distance(currPath[permLength - 1], currPath[i]);

            if (distance1 < connectingArmDistance1) {
                connectingArmDistance1 = distance1;
            }

            if (distance2 < connectingArmDistance2) {
                connectingArmDistance2 = distance2;
            }
        }

        if ((connectingArmDistance1 + connectingArmDistance2 + currCost) >= bestPathLen) {
            return false;
        }

        let out = 0;

        for (let i = permLength; i < currPath.length; ++i) {
            let currCoordinate = currPath[i];
            vertices[currCoordinate].visited = false;
            vertices[currCoordinate].distance = Infinity;
        }

        vertices[currPath[permLength]].distance = 0;

        let currDistance = Infinity;
        let currVertex = Infinity;

        for (let i = permLength; i < currPath.length; ++i) {
            for (let j = permLength; j < currPath.length; ++j) {
                let point = currPath[j];

                if (!vertices[point].visited && vertices[point].distance < currDistance) {
                    currVertex = point;
                    currDistance = vertices[point].distance;
                }
            }

            if (currDistance == Infinity) {
                alert("Cannot construct MST");
                return;
            }

            vertices[currVertex].visited = true;
            out += currDistance;

            for (let k = permLength + 1; k < currPath.length; ++k) {
                let coordinate = currPath[k];
                if (!vertices[coordinate].visited) {
                    let dist = distance(vertices[coordinate].vertex, vertices[currVertex].vertex);
                    if (dist < vertices[coordinate].distance) {
                        vertices[coordinate].distance = dist;
                        vertices[coordinate].prev = currVertex;
                    }
                }
            }

            currDistance = Infinity;
        }

        let total = (connectingArmDistance1+connectingArmDistance2+currCost+out);

        if (total >= bestPathLen) {
            return false;
        }
        else {
            return true;
        }
    }

    function genPerms(permLength) {
        if (permLength == currPath.length) {
            let finaldist = distance(currPath[0], currPath[permLength - 1]);
            currCost += finaldist;

            if (currCost < bestPathLen) {
                bestPathLen = currCost;
                bestPath = currPath;
            }

            currCost -= finaldist;
            return;
        }

        if (!promising(permLength)) {
            return;
        }

        for (let i = permLength; i < currPath.length; ++i) {
            [currPath[permLength], currPath[i]] = [currPath[i], currPath[permLength]];
            let dist = distance(currPath[permLength - 1], currPath[permLength]);
            currCost += dist;
            genPerms(permLength + 1);
            currCost -= dist;
            [currPath[permLength], currPath[i]] = [currPath[i], currPath[permLength]];
        }
    }

    function isConnected(vertex1, vertex2) {
        if (coordinates[vertex1][0] < 0 && coordinates[vertex1][1] < 0) {
            if (coordinates[vertex2][0] > 0 || coordinates[vertex2][1]> 0) {
                return false;
            }
        }
        else if (coordinates[vertex2][0] < 0 && coordinates[vertex2][1] < 0) {
            if (coordinates[vertex1][0] > 0 || coordinates[vertex1][1] > 0) {
                return false;
            }
        }
        return true;
    }

    function distance(coor1, coor2) {
        let x = coordinates[coor1][0] - coordinates[coor2][0];
        let y = coordinates[coor1][1] - coordinates[coor2][1];

        return Math.sqrt((x*x) + (y*y));
    }

    function mst() {
        vertices[0].distance = 0;
        let currDistance = Infinity;
        let currVertex = Infinity;

        for (let i = 0; i < numCoordinates; ++i) {
            for (let j = 0; j < numCoordinates; ++j) {
                if (!vertices[j].visited && vertices[j].distance < currDistance) {
                    currVertex = j;
                    currDistance = vertices[j].distance;
                }
            }

            if (currDistance == Infinity) {
                alert("Cannot construct MST");
                return;
            }

            vertices[currVertex].visited = true;
            weight += currDistance;

            for (let k = 1; k < numCoordinates; ++k) {
                if (!vertices[k].visited && isConnected(currVertex, k)) {
                    let dist = distance(k, currVertex);

                    if (dist < vertices[k].distance) {
                        vertices[k].distance = dist;
                        vertices[k].prev = currVertex;
                    }
                }
            }

            let currDistance = Infinity;
        }
    }

    function triangulardist(a, b, c) {
        return distance(a, c) + distance(b, c) - distance(a, b);
    }

    function fasttsp() {
        let indices = [0, 1, 2, 0];
        let prev = Infinity;

        for (let j = 3; j < numCoordinates; ++j) {
            let mindistance = Infinity;
            let currdist = Infinity;
            let index = 0;

            for (let i = 0; i < (indices.length - 1); ++i) {
                currdist = triangulardist(indices[i], indices[i + 1], j);
                if (currdist < mindistance) {
                    index = i + 1;
                    mindistance = currdist;
                }
            }

            indices.splice(index, 0, j);
        }

        prev = 0;

        for (let i = 1; i < indices.length; ++i) {
            weight += distance(indices[prev], indices[i]);
            prev = i;
        }

        indices.pop();

        return indices;
    }

    function opttsp() {
        weight = 0;
        bestPath = fasttsp();
        bestPathLen = weight;

        currPath = bestPath;
        genPerms(1);

        let prev = 0;
        weight = 0;

        for (let i = 1; i < bestPath.length; ++i) {
            weight += distance(bestPath[prev], bestPath[i]);
            prev = i;
        }

        weight += distance(bestPath[0], bestPath[bestPath.length-1]);
        return bestPath;
    }




    function readIn() {
        let index = 0;
        for (let cityArr of friendFavorites.keys()) {
            let city = cityArr.split(',')
            coordinates.push(statesJSON[city[1]].cities[city[0]]['coordinates'])
            const vertex = {
                vertex: index,
                visited: false,
                distance: Infinity,
                prev: Infinity,
            }

            vertices.push(vertex)
            ++index;
        }

    }

    readIn();
    numCoordinates = friendFavorites.size
    let path = opttsp();
    let start = path[0];

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

    if (cities == null || following == null) {
        return (
          <Spinner animation="border" role="status" className="loading">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        )
      }

    return (
        <div className="map-container">
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
                path.map((coorIdx, idx) => {
                    if (idx == 0) {
                        return (
                            <Line
                            from={coordinates[path[path.length - 1]]}
                            to={coordinates[path[0]]}
                            stroke="#1266F1"
                            strokeWidth={4}
                            strokeLinecap="round"
                            />
                        )
                    }
                    else if (idx != 0) {
                        return (
                            <Line
                            from={coordinates[path[idx - 1]]}
                            to={coordinates[coorIdx]}
                            stroke="#1266F1"
                            strokeWidth={4}
                            strokeLinecap="round"
                            />
                        )
                    }

                })

            }

            {
              // Maps over each city in each state to add a marker on its location. The markers are encapsulated by an Overlay Trigger so that a
              // popup window appears with info about the city, when the marker is clicked on
              states?.map((state) => (
                state?.cities?.map(({ name, coordinates }) => {
                  let saved = false;
                  cities?.map((city) => {
                    if (city.includes(name) && city.includes(state.abbreviation)) {
                      saved = true;
                    }
                  })
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
        </div>
      );
 }
 else {
     return (
        <Map cities={cities} friendFavorites={friendFavorites} following={following} queryCityFromDB={queryCityFromDB} currentUser={currentUser} />
     )
 }
}
