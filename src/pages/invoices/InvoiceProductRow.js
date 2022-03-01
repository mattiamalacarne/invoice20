import React, { useEffect, useState } from "react";
import { Button, ButtonGroup, Col, Form, Row, ToggleButton } from "react-bootstrap";

const InvoiceProductRow = ({products, index, add}) => {

    const [selProduct, setSelProduct] = useState(null)
    const [prodQ, setProdQ] = useState(0)
    const [rit, setRit] = useState(true)
    const [desc, setDesc] = useState("")
    

    const addProduct = () => {
        console.log(rit)
        if (selProduct === null || prodQ === 0) return
        let d = {
            product: selProduct === null ? null : selProduct,
            quantity: prodQ,
            price: selProduct === null ? null : selProduct.productPrice * parseInt(prodQ),
            rit: rit,
            total: rit ? ((selProduct.productPrice * parseInt(prodQ)) - ((selProduct.productPrice * parseInt(prodQ))*0.2)) : selProduct.productPrice * parseInt(prodQ),
            desc: desc
        }

        add(d)
    }

    return (
        <div className="invoiceProductRow">
            <Form>
            <Row>
                    <Col xs lg = "8">
                        <Form.Select onChange = {(v) => { v.target.value === "Seleziona un prodotto" ? setSelProduct(null) : setSelProduct(JSON.parse(v.target.value))} }>
                            <option value = {null} key = {"product"} >Seleziona un prodotto</option>
                            {products.map((product) => {
                                return (<option value = {JSON.stringify(product)} key = {product.id} >{product.productName}</option>)
                            })}
                        </Form.Select>
                    </Col>
                    <Col>
                            <Form.Control readOnly value = {selProduct === null ? "0 €" : selProduct.productPrice.toString() + " €"} />
                    </Col>
                    <Col>
                            <Form.Control value = {prodQ.toString()} onChange = {(v) => v.target.value == "" ? setProdQ(0) : setProdQ(parseInt(v.target.value))} />
                    </Col>
                    <Col>
                            <Button onClick = {() => addProduct()}>Aggiungi</Button>
                    </Col>
                
            </Row>
            <Row>
                <Col xs lg = "8">
                    <Form.Control value = {desc} onChange = {(v) => setDesc(v.target.value)} placeholder="Descrizione"/>
                </Col>
                <Col>
                
                </Col>
            </Row>
            </Form>

        </div>
    )
}

export default InvoiceProductRow