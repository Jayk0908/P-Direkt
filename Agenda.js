const Agenda = () => {
    return (
<>
<div className="App">

    <div className='headerContainer'>

        <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>

        <NavLink to='/Home' ><img src={logo} height='100px' width='400px' alt= 'main logo'/> </NavLink>

    <Menubar />

    </div>
        <div className='rectangleAgenda'>
            
            <div className='agendaText'> Wordt aan gewerkt! </div>
        
        </div>
    )
}

export default Agenda
