import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth"
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore"

// Controllo se l'utente ha gia configurato le sue informazioni
export const getUserConfiguration = async () => {
    const db = getFirestore()

    const docRef = doc(db, "configuration", "main")
    const snap = await getDoc(docRef)

    if (snap.exists()) return snap.data()
    else return false

}

// Configurazione dell'utente
export const configureUser = async (userData) => {
    const db = getFirestore()
    const docData = doc(db, "configuration", "main")
    try {
        await setDoc(docData, userData)
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