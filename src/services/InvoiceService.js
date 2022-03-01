import { getAuth } from "firebase/auth"
import { getFirestore, doc, getDoc, setDoc, collection, query, getDocs } from "firebase/firestore"

const i = "invoice"
const p = "prev"

// Salvo una nuova fattura
export const saveNewDraft = async (data) => {

    const db = getFirestore()
    const ref = doc(db, i, data.id)

    try {
        await setDoc(ref, data)
        return true
    } catch (e) {
        console.error(e)
        return false
    }
}

// Ottengo una ricevuta conoscendo il suo ID
export const getInvoice = async (id) => {
    const db = getFirestore()
    const ref = doc(db, i, id)
    const snap = await getDoc(ref)

    if (snap.exists()) return snap.data()
    else return null
}

// Ottengo le ricevute
export const getAllInvoice = async () => {
    const db = getFirestore()
    const coll = collection(db, i)
    const q = query(coll)

    const snap = await getDocs(q)
    var invoices = []

    snap.forEach((doc) => {
        invoices.push(doc.data())
    })

    if (invoices.length === 0) return null
    return invoices
}