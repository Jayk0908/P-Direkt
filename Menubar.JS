import React from 'react'
import Menubarlinks from './Menubarlinks'
import Agenda from '../Pages/Agenda'
import Contact from '../Pages/Contact'
import Overons from '../Pages/Overons.js'
import Profiel from '../Pages/Profiel'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Homepage from '../Pages/Homepage'

export default function Menubar() {
    return (
        <>
        <Menubarlinks />
        <div className="menubarStyling">
        <Routes>
             <Route path="/Home" element={<Homepage />} />
             <Route path="/Agenda" element={<Agenda />} />
             <Route path="/Contact" element={<Contact />} />
             <Route path="/Overons" element={<Overons/>} />
             <Route path="/Profiel" element={<Profiel/>} />
             
        </Routes>
        </div>

        </>

        
    )
}
