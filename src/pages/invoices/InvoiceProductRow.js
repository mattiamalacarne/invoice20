import React, { useState } from "react";
import { Col, Form, Row } from "react-bootstrap";

const InvoiceProductRow = ({products}) => {

    const [selProduct, setSelProduct] = useState(null)
    const [prodQ, setProdQ] = useState("0")

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
                            <Form.Control value = {prodQ} onChange = {(v) => setProdQ(v.target.value)} />
                    </Col>
                
            </Row>
            </Form>
        </div>
    )
}

export default InvoiceProductRow