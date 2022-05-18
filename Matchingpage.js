import Footer from '../Menubar/Footer'
import Menubar from '../Menubar/Menubar'
import logo from '../images/logo_horizontal_final.png'
import { Suspense, useState } from 'react';
import LoadingAnim from '../Animations/LoadingAnim';
import { NavLink } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';
import { First, Last } from 'react-bootstrap/esm/PageItem';

export default function MatchingPage() {
  const [matchedName, setMatchedName] = useState("")
  const axios = require('axios')

  const getMatchedName = () => {
    const matchedUser = Cookies.get("Matched_user")
    var data = JSON.stringify({
      "user_id": matchedUser
    });

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
        const name = (response.data.firstName + ' ' + response.data.lastName)
        setMatchedName(name)
      })
      .catch(function (error) {
        console.log(error);
      });

  }
  getMatchedName()
  return (
    <>
      <div className="App">

        <div className='headerContainer'>

          <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>

          <NavLink to='/Home' ><img src={logo} height='100px' width='400px' alt='main logo' /> </NavLink>

          <Menubar />

        </div>
        <div className='rectangle'>
          <LoadingAnim />
          <Suspense fallback={<LoadingAnim />}>
            {matchedName}
          </Suspense>
        </div>
        <Footer />
      </div>
    </>
  )
}
