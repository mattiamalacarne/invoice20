import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth"
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore"

const conf = "configuration"
const main = "main"
const stat = "stat"

// Controllo se l'utente ha gia configurato le sue informazioni
export const getUserConfiguration = async () => {
    const db = getFirestore()

    const docRef = doc(db, conf, main)
    const snap = await getDoc(docRef)

    if (snap.exists()) return snap.data()
    else return false

}

// Ottengo le statistiche
export const getStat = async () => {
    const db = getFirestore()

    const ref = doc(db, conf, stat)
    const snap = await getDoc(ref)

    if (snap.exists()) return snap.data()
    else return null
}

// Configurazione dell'utente
export const configureUser = async (userData) => {
    const db = getFirestore()
    const docData = doc(db, conf, main)
    const statData = doc(db, conf, stat)
    try {
        await setDoc(docData, userData)
        const stData = {
            invoice : 0,
            prev : 0
        }

        await setDoc(statData, stData)
        return true
    } catch (e)
    {
        console.log(e)
        return false
    }
}

// Login
export const userLogin = async (mail, pass) => {
    const auth = getAuth()
    let logged = signInWithEmailAndPassword(auth, mail, pass)
    .catch((e) => {
        console.log(e.message)
        return false   
    })
    .then(() => {
        console.log("Login")
        console.log(auth.currentUser)
        return true
    })

    return logged
}

// Logout
export const userLogout = async () => {
    const auth = getAuth()

    signOut(auth)
    .then(() => console.log("Logout"))
    .catch((e) => console.log(e.message))
}