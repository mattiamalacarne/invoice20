import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row, Table } from "react-bootstrap";
import { useParams } from "react-router-dom";
import AuthManager from "../../components/AuthManager";
import Box from "../../components/Box";
import { getClientLIst } from "../../services/ClientService";
import { getListProduct } from "../../services/ProductService";
import InvoiceProductListRow from "./InvoiceProductListRow";
import InvoiceProductRow from "./InvoiceProductRow";

import "./_invoice.scss"

const Invoice = () => {

    const {id} = useParams()

    const [clientList, setClientList] = useState(null)
    const [client, setClient] = useState(null)
    const [productList, setProductList] = useState(null)
    const [invoiceProductList, setInvoceProductList] = useState([])

    const [priceTotal, setPriceTotal] = useState(0)
    const [total, setTotal] = useState(0)
    const totale = 0

    useEffect(() => {
        getClientLIst()
        .then((list) => {
            setClientList(list)
        })
        getListProduct()
        .then((list) => {
            setProductList(list)
        })

    },[])

    const delProduct = (product) => {
        const p = invoiceProductList.filter(prod => prod !== product)
        setInvoceProductList(p)
        setPriceTotal(priceTotal-product.price)
        setTotal(total-product.total)
    }

    const addProductToInvoiceList = (product) => {
        
        let p = []
        invoiceProductList.forEach((pr) => {
            p.push(pr)
        })
        p.push(product)
        setInvoceProductList(p)
        setPriceTotal(priceTotal+product.price)
        setTotal(total+product.total)
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
                        <p>Costo</p>
                    </Col>
                    <Col>
                        <p>Quantità</p>
                    </Col>
                    <Col>
                        <p></p>
                    </Col>
                
            </Row>
                    <Row>
                        <InvoiceProductRow add = {addProductToInvoiceList} key = {Math.random()} products={productList} />
                            
                        <Table>
                            <thead>
                                <th>Articolo</th>
                                <th>Prezzo</th>
                                <th>Q.ta</th>
                                <th>Lordo</th>
                                <th>Netto</th>
                                <th></th>
                            </thead>
                            <tbody>
                                {invoiceProductList && invoiceProductList.map((product) => {
                                    return (<InvoiceProductListRow delProduct={delProduct} product={product}/>)
                                })}
                            </tbody>
                        </Table>
                    </Row>
                    <hr></hr>
                    <Row>
                        <Col>
                            <p>Totale lordo: {priceTotal}</p>
                            <p>Ritenuta (20%): {priceTotal*0.2}</p>
                            <p>Totale: {total} €</p>
                        </Col>
                    </Row>
                </Box>
            </div>
            
        </AuthManager>
    )

}
export default Invoice