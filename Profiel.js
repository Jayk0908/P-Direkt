import React, { useEffect, useState } from 'react'
import logo from '../images/logo_horizontal_final.png'
import vector from '../images/ProfielVector.png'
import { NavLink } from 'react-router-dom'
import Cookies from 'js-cookie'
import Checkbox from '../Animations/Checkbox'

const Profiel = () => {
    const [email, setEmail] = useState('')
    useEffect(() => {
        document.title = `page has been refreshed ${email, name}`
        
    });

    var axios = require('axios')
    var data = ' '
    var user_id = 0
    var allInterests = []
    var setAllInterests = []
    const [name, setName] = useState('')
    const [interests, setInterests] = React.useState(null)
    const [inputs, setInputs] = useState({
        newEmail: "",
        newFirstName: "",
        newLastName: ""
    })
    const { newEmail, newFirstName, newLastName } = inputs;
    // make it possible to change the inouts
    const onChange = e => {
        setInputs({ ...inputs, [e.target.name]: e.target.value })
    }
    const getCookie = () => {
        user_id = Cookies.get('user_id')
    }

    const getEmail = async (e) => {
        var config = {
            method: 'post',
            url: 'http://localhost:5000/email',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
                const email1 = ' ' + response.data[0].email
                setEmail(email1)
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const changeName = async (e) => {
        var data = JSON.stringify({
            "firstName": newFirstName,
            "lastName": newLastName,
            "user_id": user_id
        });

        var config = {
            method: 'put',
            url: 'http://localhost:5000/name',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
            })
            .catch(function (error) {
                console.log(error);
            });
            setName(' ' +newFirstName + ' '+ newLastName)
    }

    const changeNewEmail = async (e) => {
        var data = JSON.stringify({
            "email": newEmail,
            "user_id": user_id
        });

        var config = {
            method: 'put',
            url: 'http://localhost:5000/email',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
            })
            .catch(function (error) {
                console.log(error);
            });
        setEmail(newEmail)
    }


    const getName = async (e) => {
        var config = {
            method: 'post',
            url: 'http://localhost:5000/name',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
                const firstName = ' ' + response.data[0].first_name
                const lastName = ' ' + response.data[0].last_name

                setName(firstName + lastName)
            })
            .catch(function (error) {
                console.log(error);
            });

    }

    const getInterest = async (e) => {
        var config = {
            method: 'post',
            url: 'http://localhost:5000/interestUser',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        await axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
                // const interests = response.data[0].interest_name
                allInterests = (response.data)
                // setInterests(interests)
            })
            .catch(function (error) {
                console.log(error);
            });


        setAllInterests = []
        console.log(allInterests)
        for (let index = 0; index < allInterests.length; index++) {
            setAllInterests[index] = allInterests[index].interest_name + " / "
            console.log(allInterests)
        }

        console.log(setAllInterests)
        setInterests(setAllInterests)
    }

    const information = async (e) => {
        getCookie()
        data = JSON.stringify({
            "id": user_id
        })

        if (!email) {
            await getEmail()
        }

        if (!name) {
            await getName()
        }

        if (!interests) {
            await getInterest()
        }



    }

    const changeInfo = () => {
        if (newEmail !== "") {
            changeNewEmail()
        }
        if (newFirstName !== "" && newLastName !== "") {
            changeName()
        }

    }

    information()


const profiel = () => {
    return (
        <>
            <div className='profielContainer'>
                <div className='profielLogo'>
                    <NavLink to='/Home'> <img src={logo} height='180px' width='700px' alt='main logo' /> </NavLink>
                </div>
                <div className='profielBox'>
                    <img src={vector} height='125px' width='130px' alt='vector profiel poppetje' />
                    <div className='profielInfo'>

                        <h4>E-mailadres:
                            {" " + email}
                        </h4>
                        <div className='changeInputBox'>
                            verander emailadres:
                            <input type="newEmail"
                                name="newEmail"
                                id="newEmail"
                                placeholder="Emailadres"
                                value={newEmail}
                                onChange={e => onChange(e)}></input>
                        </div>

                        <h4>Naam:
                            {name}
                        </h4>

                        <div className='changeInputBox'>
                            verander voor/achternaam:
                            <input type="newFirstName"
                                name="newFirstName"
                                id="newFirstName"
                                placeholder="Voornaam"
                                value={newFirstName}
                                onChange={e => onChange(e)}></input>
                            <input type="newLastName"
                                name="newLastName"
                                id="newLastName"
                                placeholder="Achternaam"
                                value={newLastName}
                                onChange={e => onChange(e)}></input>
                        </div>

                        <h4>Interesses:
                            {interests}
                        </h4>

                        <div className='checkboxContainer'><Checkbox /></div>

                        <button className="opslaanButton" onClick={changeInfo}>
                            Opslaan
                        </button>
                    </div>
                </div>
            </div>

        </>
    )
}

export default profiel
