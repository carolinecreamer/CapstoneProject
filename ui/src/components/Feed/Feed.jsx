import * as React from "react"
import * as Bootstrap from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css';
import { BsPinFill } from "react-icons/bs"
import Friends from "../Friends/Friends";
import FilteredFeed from "../FilteredFeed/FilteredFeed";
import UnfilteredFeed from "../UnfilteredFeed/UnfilteredFeed";
import "./Feed.css"
import { useState } from "react";
import Recommend from 'collaborative-filter';
import states from "../../../public/cityData.json";
import { Spinner } from "react-bootstrap";

export default function Feed({ setUsers, setFollowing, currentUser, getUsers, users, getFollowing, following }) {
    const [filtered, setFiltered] = useState(false);
    const cities = states.map(state => state.cities.map(city => ([state.abbreviation, city.name]))).flat();
    let recommended = null;

    React.useEffect(() => {
        async function onLoad() {
            const usersRes = await getUsers();
            if (typeof usersRes.data.users != 'undefined') {
                setUsers(usersRes.data.users);
            }
            else {
                setUsers(usersRes.data);
            }

            const followingRes = await getFollowing();
            if (typeof followingRes.data.following != 'undefined') {
                setFollowing(followingRes.data.following)
            }
            else {
                setFollowing(followingRes.data)
            }
        }

        onLoad()
    }, [])

    if (users!=null) {
        const ratings = users.map((user) => {
            return cities.map((city) => {
                // city is in user.city
                const favorited = user.cities?.some((userCity) => {
                    if (city[0] == userCity[1] && city[1] == userCity[0]) {
                        return true;
                    }
                    return false;
                });
                return favorited ? 1 : 0;
            }
            );
        })

        const result = Recommend.cFilter(ratings, 0);
        recommended = result.map(resultIndex => cities[resultIndex])
    }


    if ( users == null || recommended == null) {
        return (
            <Spinner animation="border" role="status" className="loading">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        )
    }

    // Display other users that use the web page
    // Iterate over users, if the user is not the current user, display the user in the feed, if the user is in the array of "followed" users, change the user's icon
    // Iterate over each saved city for the user being displayed and display the city next to the user's name
    return (
        <div>
            <div className="recommended">
                <h5>Cities Recommended For You</h5>
                <Bootstrap.Container className="homepage">
                    <Bootstrap.ListGroup >

                        {recommended?.map((city) => {

                            return (
                                <Bootstrap.ListGroupItem key={city.join(',')} className="list-group-item">
                                    <h6 key={city.join(',')}>{city[1]}, {city[0]}</h6>

                                </Bootstrap.ListGroupItem>
                            )

                        })}
                    </Bootstrap.ListGroup>
                </Bootstrap.Container>
            </div>
            <div className="userFeed">
                <div className="userFeedHeader">
                    <h5>Users</h5>
                    <Bootstrap.Button className="filterButton" onClick={() => setFiltered(true)}>Filter Users by Cities!</Bootstrap.Button>
                </div>
                {filtered ? <FilteredFeed currentUser={currentUser} users={users} following={following} /> :
                    <UnfilteredFeed currentUser={currentUser} users={users} following={following} />}
            </div>
        </div>
    )
}
