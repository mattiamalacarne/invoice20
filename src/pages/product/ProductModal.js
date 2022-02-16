import React, { useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { delProduct, editProduct, newProduct } from "../../services/ProductService";

const ProductModal = ({product, onClose, show}) => {

    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [desc, setDesc] = useState("")


    useEffect(() => {
        updateModal()
    }, [show])

    const updateModal = () => {
        setName(product === null ? "" : product.productName)
        setPrice(product === null ? "" : product.productPrice)
        setDesc(product === null ? "" : product.productDesc)
    }

    const createProduct = (event) => {
        event.preventDefault()

        if (validate) {
            const product = {
                id: crypto.randomUUID(),
                productName: name,
                productPrice: parseFloat(price),
                productDesc: desc
            }

            const created = newProduct(product)
            if (created) onClose()
        }

    }

    const validate = () => {

        if (name === "") return false
        if (price === "") return false
        return true
    }

    const deleteProduct = () => {
        delProduct(product.id)
        onClose()
    }

    const changeProduct = () => {
        const editP = {
            id: product.id,
            productName: name,
            productPrice: price,
            productDesc: desc
        }
        editProduct(product.id, editP)
        onClose()
    }

    return(
        <Modal
                show = {show}
                onHide = {onClose}
        >
            <Modal.Header closeButton>{product == null ? "Nuovo prodotto" : product.productName}</Modal.Header>
                <Modal.Body>
        <Form>
            
            <Row>
                <Col>
                    <Form.Label>Nome</Form.Label><br></br>
                    <Form.Control value={name} onChange = {(v) => setName(v.target.value)} type = "text" /><br></br>
                </Col>
                <Col>
                    <Form.Label>Prezzo</Form.Label><br></br>
                    <Form.Control placeholder="€" value={price} onChange = {(v) => setPrice(v.target.value)} type = "text" /><br></br>
                </Col>
                
            </Row>
            <Row>
                
                <Col>
                    <Form.Label>Desc</Form.Label><br></br>
                    <Form.Control value={desc} onChange = {(v) => setDesc(v.target.value)} type = "text" /><br></br>
                </Col>
            </Row>

        </Form>
        </Modal.Body>
        <Modal.Footer>
            {!product && (<Button onClick = {createProduct} >Salva</Button>)}
            {product && (<Button onClick = {changeProduct}>Modifica</Button>)}
            {product && (<Button variant = "danger" onClick = {deleteProduct}>Elimina</Button>)}
        </Modal.Footer>
        </Modal>
    )
}

export default ProductModal