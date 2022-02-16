import { addDoc, collection, query, getFirestore, getDocs, where, deleteDoc, setDoc, doc } from "firebase/firestore" 

const c = "clients"

// Nuovo cliente
export const newClient = async (clientData) => {
    const db = getFirestore()
    const document = doc(db, c, clientData.id)

    try {
        //await addDoc(coll, clientData)
        await setDoc(document, clientData)
        return true
    } catch (e) 
    {
        console.error(e)
        return false
    }
}

// Modifica clienti
export const editClient = async (client, data) => {
    const db = getFirestore()
    const document = doc(db, c, client)

    try {
        await setDoc(document, {
            ...data
        })
    } catch (e) {
        console.error(e)
    }
}

// Delete client
export const delClient = async (client) => {
    const db = getFirestore()
    const coll = collection(db, c)
    const toDel = doc(db, c, client)

    await deleteDoc(toDel)
}

// Lista clienti
export const getClientLIst = async () => {
    const db = getFirestore()
    const coll = collection(db, c)
    const q = query(coll)

    const snap = await getDocs(q)
    var clients = []

    snap.forEach((doc) => {
        clients.push(doc.data())
    })

    if (clients.length == 0) return false
    return clients 
}