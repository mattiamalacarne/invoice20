import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged} from "firebase/auth"
import { getUserConfiguration, userLogout } from "../services/UserService"
import { useNavigate } from "react-router-dom"
import Install from "../pages/install/Install";
import { Col, Row, Spinner } from "react-bootstrap";

import "./_main.scss"

import 'bootstrap/dist/css/bootstrap.min.css';
import NavButton from "./NavButton";

const AuthManager = ({children}) => {

    const auth = getAuth()
    const nav = useNavigate()
    const [user, setUser] = useState(null)

    const [authenticated, setAuthenticated] = useState(null)

    const [showMenu, setShowMenu] = useState(true)

    const toggleMenu = () => setShowMenu((s) => !s)

    const getUser = async () => {
        const data = await getUserConfiguration()
        setUser(data)
    }

    const logOut = () => {
        userLogout()
    }

    useEffect(() => {
        const authSub = onAuthStateChanged(auth, (user) => {
            if (!user) {
                console.log("Error auth")
                setAuthenticated(false)
            } else 
            {
                setAuthenticated(true)
            }
            getUser()
        })
    }, [])

    if (authenticated === null || user === null) return(
        <Row style={{height: "100vh"}}>
                <div className="menu-button">
                    <button onClick = {toggleMenu}>Menu</button>
                </div>
                <Col id = "header" className = {showMenu ? "" : "hidden"}>
                    <div className="logo">
                        Invoice20
                    </div>
                    <div>
                        <NavButton text = "Home" link = "/home" key = "home"/>
                        <NavButton text = "Ricevute" link = "/invoices" key = "invoice"/>
                        <NavButton text = "Clienti" link = "/clients" key = "client"/>
                        <NavButton text = "Articoli" link = "/products" key = "product"/>
                        <hr></hr>
                        <button onClick = {logOut}>Esci</button>
                    </div>
                </Col>
                <Col id="pageContainer">
                    <Spinner>
                        
                    </Spinner>
                </Col>
                
            </Row>
    )
    if (!authenticated) {
        nav("/")    
        return(
            <h1>Non autorizzato!</h1>
        ) 
    }
    else {
        // Controllo se esiste la configurazione, se non esiste apro /install
        if (user === null || user === false) return(
            <div>
                <button onClick = {logOut}>Esci</button>
                <Install />
            </div>
        )
        else return(
            <Row style={{height: "100vh"}}>
                <div className="menu-button">
                    <button onClick = {toggleMenu}>Menu</button>
                </div>
                <Col id = "header" className = {showMenu ? "" : "hidden"}>
                    <div className="logo">
                        Invoice20
                    </div>
                    <div>
                        <NavButton text = "Home" link = "/home" key = "home"/>
                        <NavButton text = "Ricevute" link = "/invoices" key = "invoice"/>
                        <NavButton text = "Clienti" link = "/clients" key = "client"/>
                        <NavButton text = "Articoli" link = "/products" key = "product"/>
                        <hr></hr>
                        <button onClick = {logOut}>Esci</button>
                    </div>
                </Col>
                <Col id="pageContainer">
                    {children}
                </Col>
                
            </Row>
            
        )
    }
}

export default AuthManager