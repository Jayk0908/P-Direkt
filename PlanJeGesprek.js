import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import logo from "../images/logo_horizontal_final.png"
import Footer from '../Menubar/Footer';
import Menubar from '../Menubar/Menubar';
import { NavLink } from 'react-router-dom'
import Checkbox from '../Animations/Checkbox';
import { remove } from 'react-cookies';
import Cookies from 'js-cookie';


function PlanJeGesprek() {

    const axios = require('axios');
    var allInterests = []
    var tagsarray = []
    var confirmedTagsArray = []
    const [yourInterests, setYourInterests] = useState([])
    const [tags, setTags] = React.useState([]);

    const loadTags = async (e) => {
        try {
            const getInterests = {
                method: 'get',
                url: 'http://localhost:5000/interests',
                headers: {}
            };

            await axios(getInterests)
                .then(function (response) {
                    allInterests = (response.data)
                    // console.log(response.data);
                })
                .catch(function (error) {
                    console.log(error);
                });

        } catch (error) {
            console.log(error.message)


        }
        tagsarray = []
        for (let index = 0; index < allInterests.length; index++) {
            tagsarray[index] = allInterests[index].interest_name
        }
        setTags(tagsarray)
    }

    const confirmInterest = (tag) => {
        console.log(confirmedTagsArray)
        confirmedTagsArray = yourInterests
        confirmedTagsArray.push(tag)
        setYourInterests(confirmedTagsArray)
        console.log(confirmedTagsArray)
    }

    const remove = (interest) => {
        var element = interest;
        element.remove();
    }
    var confirmedTagsId = []
    const matchUser = async (e) => {
        for (let i = 0; i < yourInterests.length; i++) {
            var data = JSON.stringify({
                "interest_name": yourInterests[i]
              });
            var config = {
                method: 'post',
                url: 'http://localhost:5000/interestByName',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: data
            };

            await axios(config)
                .then(function (response) {
                    const responseData = response.data
                    confirmedTagsId.push(responseData[0].interest_id)
                    console.log(confirmedTagsId)
                })
                .catch(function (error) {
                    console.log(error);
                });
            }



            console.log("123");
            const user_id = Cookies.get('user_id')
            console.log(user_id)
            var data = JSON.stringify({
                "user_id": user_id,
                "new_interests_id": confirmedTagsId,
                "timeForMeeting": "evening"
            });

            var config = {
                method: 'post',
                url: 'http://localhost:5000/matchUsers',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: data
            };
            await axios(config)
                .then(function (response) {
                    console.log(response.data);
                    Cookies.set('Matched_user', response.data)
                })
                .catch(function (error) {
                    console.log(error);
                });

        }
    

    loadTags()
    return (
        <>
            <div className="App">

                <div className='headerContainer'>

                    <NavLink to='/Home' ><img src={logo} height='100px' width='400px' alt='main logo' /> </NavLink>

                    <Menubar />

                </div>

                <div className="rectangle">

                    <div className="PJGContainer">

                        <h1> Klik op de interesses waarover je het wilt hebben en geef aan welk dagdeel je contact wilt leggen </h1>

                        <div className='tagBoxContainer'>

                            <div className="tagBox">
                                Alle interesses:
                                <div className="tags-input">
                                    <ul id="tags">
                                        {tags.map((tag, index) => (
                                            <li key={index} className="tag" onClick={() => confirmInterest(tag)}>
                                                <span className='tag-title'>{tag}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            <div className='tagBox'>
                                Jouw interessses:
                                {yourInterests.map((interest) => (
                                    <div className='tag'>
                                        {interest}
                                        <li key={interest} onClick={() => remove(interest)}>
                                            <span>  </span>
                                        </li>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <Checkbox />

                        <Link to="/MatchingPage">
                            <button className="PJGZoeken" onClick={matchUser}>zoeken</button>
                        </Link>

                    </div>

                </div>

            </div >
            <Footer />
        </>
    );
}

export default PlanJeGesprek
