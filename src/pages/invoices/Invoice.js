import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row, Table } from "react-bootstrap";
import { useParams } from "react-router-dom";
import AuthManager from "../../components/AuthManager";
import Box from "../../components/Box";
import { getClientLIst } from "../../services/ClientService";
import { getListProduct } from "../../services/ProductService";
import InvoiceProductRow from "./InvoiceProductRow";

import "./_invoice.scss"

const Invoice = () => {

    const {id} = useParams()

    const [clientList, setClientList] = useState(null)
    const [client, setClient] = useState(null)
    const [productList, setProductList] = useState(null)
    const [invoiceProductList, setInvoceProductList] = useState([])

    

    useEffect(() => {
        getClientLIst()
        .then((list) => {
            setClientList(list)
        })
        getListProduct()
        .then((list) => {
            setProductList(list)
        })

        addInvoiceProduct()
    },[])

    const addInvoiceProduct = () => {
        let p = []
        invoiceProductList.forEach((pr) => {
            p.push(pr)
        })
        p.push(null)
        console.log(invoiceProductList)
        
        setInvoceProductList(p)
    }

    return(
        <AuthManager>

            <div id = "invoicePage">
                <h3 className="title">{id === "new" ? "Nuova ricevuta" : "Modifica ricevuta" }</h3>
                
                <Box>
                    <Row>
                        <Col>
                            <Row>
                                <p><b>Informazioni cliente</b></p>
                            </Row>
                            <Row>
                                <Form>
                                    <Form.Select onChange={(v) => setClient(v.target.value)} size = "lg">
                                        <option key = "client" value = {null}>Seleziona un cliente</option>
                                        {clientList && clientList.map((client) => {
                                            return <option key = {client.id} value = {client}>{client.name} {client.surname}</option>
                                        })}
                                    </Form.Select>
                                </Form>
                            </Row>
                        </Col>
                        <Col>
                            <Row>
                                <p><b>Dettagli ricevuta</b></p>
                            </Row>
                        </Col>
                    </Row>
                </Box>

                <Box>
                    <Row>
                        <p><b>Articoli</b></p>
                    </Row>
                    <Row>
                
                    <Col xs lg = "8">
                        <p>Articolo</p>
                    </Col>
                    <Col>
                        <p>Costo unitario</p>
                    </Col>
                    <Col>
                        <p>Quantità</p>
                    </Col>
                
            </Row>
                    <Row>
                        {productList && invoiceProductList.map((pList) => {
                            return (
                                <InvoiceProductRow key = {Math.random()} products={productList} />
                            )
                        })}
                        <Button className = "title-button" onClick = {addInvoiceProduct}>Aggiungi</Button>
                    </Row>
                </Box>
            </div>
            
        </AuthManager>
    )

}
export default Invoice