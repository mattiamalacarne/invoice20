import React, { useEffect, useState } from "react";
import { configureUser } from "../../services/UserService";
import { getAuth } from "firebase/auth";

const Install = () => {

    const [name, setName] = useState("")
    const [surname, setSurname] = useState("")
    const [ragSociale, setRagSociale] = useState("")
    const [mail, setMail] = useState("")
    const [cf, setCf] = useState("")
    const [address, setAddress] = useState("")

    

    
    useEffect(() => {
        const auth = getAuth()
        const user = auth.currentUser
        setMail(user.email)
    }, [])

    const saveConfiguration = async (event) => {
        event.preventDefault()
        if (validate) {

            const userData = {
                name: name,
                surname: surname,
                ragSociale: ragSociale,
                mail: mail,
                cf: cf,
                address: address
            }

            const configured = await configureUser(userData)
            if (configured) window.location.reload(false)
        } else {
            return false
        }
    }

    const validate = () => {
        return true
    }

    return(
        <div>
            <h1>Configura il tuo software</h1>
            <form>
                <label>Nome</label><br></br>
                <input value={name} onChange = {(v) => setName(v.target.value)} type = "text" /><br></br>
                <label>Cognome</label><br></br>
                <input value={surname} onChange = {(v) => setSurname(v.target.value)} type = "text" /><br></br>
                <label>Ragione Sociale</label><br></br>
                <input value={ragSociale} onChange = {(v) => setRagSociale(v.target.value)} type = "text" /><br></br>
                <label>Mail</label><br></br>
                <input value={mail} onChange = {(v) => setMail(v.target.value)} type = "text" /><br></br>
                <label>Codice fiscale</label><br></br>
                <input value={cf} onChange = {(v) => setCf(v.target.value)} type = "text" /><br></br>
                <label>Indirizzo</label><br></br>
                <input value={address} onChange = {(v) => setAddress(v.target.value)} type = "text" /><br></br>
                <button type="submit" onClick={saveConfiguration}>Login</button>
            </form>
        </div>
    )
}

export default Install