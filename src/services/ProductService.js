import { getFirestore, collection, addDoc, query, getDocs, setDoc, doc, deleteDoc } from "firebase/firestore"

const p = "products"

// Nuovo prodotto
export const newProduct = async (productData) => {
    const db = getFirestore()
    const document = doc(db, p, productData.id)

    try {
        await setDoc(document, productData)
        return true
    } catch (e)
    {
        console.error(e)
        return false
    }
}

// Modifica clienti
export const editProduct = async (product, data) => {
    const db = getFirestore()
    const document = doc(db, p, product)

    try {
        await setDoc(document, {
            ...data
        })
    } catch (e) {
        console.error(e)
    }
}

// Delete client
export const delProduct = async (product) => {
    const db = getFirestore()
    const toDel = doc(db, p, product)

    await deleteDoc(toDel)
}

// Ottengo lista prodotti
export const getListProduct = async () => {
    const db = getFirestore()
    const coll = collection(db, p)
    const q = query(coll)

    const snap = await getDocs(q)
    var products = []

    snap.forEach((doc) => {
        products.push(doc.data())
    })

    if (products.length === 0) return false
    return products
}