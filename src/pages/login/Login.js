import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { userLogin } from "../../services/UserService";
import { useNavigate } from "react-router-dom";

const Login = () => {

    const [mail, setMail] = useState("mattia@mattiamalacarne.com")
    const [pass, setPass] = useState("Stardast1")

    const nav = useNavigate()
    const auth = getAuth()

    const login = (event) => {
        event.preventDefault()

        userLogin(mail, pass)

    }

    useEffect(() => {
        const authObserver = onAuthStateChanged(auth, (user) => {
            if (user) nav("/home")
            else console.log("NOT IN")
        })
    }, [])

    return(
        <div>
            <form>
                <label>Mail</label><br></br>
                <input value={mail} onChange = {(v) => setMail(v.target.value)} type = "text" /><br></br>
                <label>Password</label><br></br>
                <input value={pass} onChange = {(v) => setPass(v.target.value)} type = "text" /><br></br>
                <button type="submit" onClick={login}>Login</button>
            </form>
        </div>
    )
}

export default Login