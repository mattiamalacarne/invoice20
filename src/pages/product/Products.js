import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import AuthManager from "../../components/AuthManager";
import { getListProduct, newProduct } from "../../services/ProductService";
import ProductListRow from "./ProductListRow";
import ProductModal from "./ProductModal";

import "./_product.scss"

const Products = () => {

    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [desc, setDesc] = useState("")

    const [productList, setProductList] = useState(null)
    const [selProduct, setSelProduct] = useState(null)

    const [showModal, setShowModal] = useState(false)

    useEffect(() => {
        getListProduct()
        .then((data) => {
            setProductList(data)
        })
    }, [])

    const saveProduct = async (event) => {
        event.preventDefault()
        if (!validate()) {
            alert("Devi compilar tutti i campi")
            return
        } else 
        {
            const product = {
                id : (new Date()).getTime(),
                productName : name,
                productPrice : parseFloat(price),
                productDesc : desc
            }

            const added = await newProduct(product)
        }
    }

    const validate = () => {

        if (name === "") return false
        if (price === "") return false
        return true
    }


    const openModal = () => {
        setShowModal(true)
    }

    const closeModal = async () => {
        await setSelProduct(null)
        getListProduct()
        .then((data) => {
            setProductList(data)
        })
        setShowModal(false)
    }

    const showProductInfo = async (product) => {
        await setSelProduct(product)
        openModal()
    }

    return(
        <AuthManager>

            <div>
                <ProductModal product={selProduct} show = {showModal} onClose = {closeModal} />
            </div>

            <div id = "productPage">
            <h3 className="title">Articoli</h3>
            <Button className = "title-button" onClick = {openModal}>Nuovo articolo</Button>
        <Table style={{background: "#fff"}}>
            <thead>
            <tr>
                <th>Nome</th>
                <th>Prezzo</th>
                <th>Descrizione</th>
            </tr>
            </thead>
            <tbody>
            {productList && productList.map((product) => {
                return(
                    <ProductListRow key={product.id} onClick = {showProductInfo} product = {product}/>
                )
            })}
            </tbody>
        </Table>
        </div>
            
        </AuthManager>
    )

}
export default Products