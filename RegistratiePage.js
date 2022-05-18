import axios from "axios";
import React, { Fragment, useState, use } from "react"
import {Link, } from "react-router-dom"
import {Cookies} from "js-cookie"
import { useNavigate } from "react-router";


 
function RegistratiePage() {

    const axios = require('axios');
    const navigate = useNavigate()


    function nav(){
        console.log(34567)
        navigate("/home", {state: {page: "/home"}})
    }

    const [inputs, setInputs] = useState({
            email : "",
            password: "",
            firstName: "",
            lastName: "",
            checkPassword:"",
    })

    const {email, password, checkPassword, firstName, lastName} = inputs; 

    const onChange = e => {
         setInputs({...inputs, [e.target.name] : e.target.value})
    }

    const onSubmitForm = async(e) => {
        //  e.preventDefault();
    
        if(password === checkPassword){ 
            try {
                const data = JSON.stringify({
                    email, password, firstName, lastName
                });
        

                const registerRequest = {
                method: 'post',
                url: 'http://localhost:5000/auth/register',
                headers: { 
                    'Content-Type': 'application/json'
                },
                data : data
                };

                axios(registerRequest)
                .then(function (response){
                    const priToken = response.data.priToken
                    const pubToken = response.data.pubToken
                    Cookies.set('priToken', priToken)   
                    Cookies.set('pubToken', pubToken)  
                    console.log(pubToken)
                    console.log(priToken)
                })

            
            } catch (error) {
                    console.log(error.message)
                }
        } else{
            alert("passwords dont match")
        }
    }

    const onSubmitForm1 = async(e) => {
        try {
            console.log(0)
            await onSubmitForm()
            nav()
        } catch (error) {
            console.log(error.message)
        }
    }

    return (
        <form>
            <div className = "form-inner">
                <h2>Registreren</h2>

                <div className= "form-group">
                    <label htmlFor="firstName">Voornaam: </label>
                    <input type="firstName" name="firstName" id="firstName"
                    value= {firstName} 
                    onChange = {e => onChange(e)}/>
                </div>

                <div className= "form-group">
                    <label htmlFor="lastName">Achternaam: </label>
                    <input type="lastName" name="lastName" id="lastName"
                    value= {lastName} 
                    onChange = {e => onChange(e)}/>
                </div>

                <div className= "form-group">
                    <label htmlFor="email">Email: </label>
                    <input type="email" name="email" id="email" 
                    value= {email} onChange = {e => onChange(e)} />
                </div>

                <div className= "form-group">
                    <label htmlFor="password_1">Wachtwoord: </label>
                    <input type="password" name="password" id="password"
                    value= {password} onChange = {e => onChange(e)}/>
                </div>

                <div className= "form-group">
                    <label htmlFor="checkPassword">Herhaal Wachtwoord: </label>
                    <input type="password" name="checkPassword" id="checkPassword"
                    value={checkPassword} 
                    onChange = {e => onChange(e)}/>
                </div> 

                <button className="RegistrerenButton" onClick={onSubmitForm1}>REGISTREREN</button>

            </div>
            
        </form>

        
    )
}

 
export default RegistratiePage
