import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row, Table } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import AuthManager from "../../components/AuthManager";
import Box from "../../components/Box";
import { getClientLIst } from "../../services/ClientService";
import { getInvoice, saveNewDraft } from "../../services/InvoiceService";
import { getListProduct } from "../../services/ProductService";
import InvoiceProductListRow from "./InvoiceProductListRow";
import InvoiceProductRow from "./InvoiceProductRow";

import "./_invoice.scss"

const Invoice = () => {

    const {id} = useParams()
    const nav = useNavigate()

    const [clientList, setClientList] = useState(null)
    const [client, setClient] = useState(null)
    const [productList, setProductList] = useState(null)
    const [invoiceProductList, setInvoceProductList] = useState([])

    const [priceTotal, setPriceTotal] = useState(0)
    const [total, setTotal] = useState(0)
    let totale = 0

    useEffect(() => {
        getClientLIst()
        .then((list) => {
            setClientList(list)
        })
        getListProduct()
        .then((list) => {
            setProductList(list)
        })

        if (id !== "new") {
            getInvoiceData()
        }

    },[])

    const getInvoiceData = async () => {
        const invoice = await getInvoice(id)
        if (invoice === null) nav("/invoices/new")
        setClient(invoice.client)
        setInvoceProductList(invoice.products)
        setTotal(invoice.total)
        setPriceTotal(invoice.price)
        totale = invoice.total
    }

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

    const buildData = () => {
        const data = {
            id : null,
            client: null,
            products : invoiceProductList,
            status : null,
            total : total,
            price: priceTotal
        }

        return data
    }

    const newDraft = () => {
        const data = buildData()
        data.status = "D"
        data.id = id === "new" ? "D-"+crypto.randomUUID() : id
        data.client = id === "new" ? JSON.parse(client) : client

        const invoiceSaved = saveNewDraft(data)
        if (invoiceSaved) nav("/invoices/"+data.id)
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
                            {id === "new" && (
                            <Row>
                                <Form>
                                    
                                    <Form.Select onChange={(v) => setClient(v.target.value)} size = "lg">
                                        <option key = "client" value = {null}>Seleziona un cliente</option>
                                        {clientList && clientList.map((c) => {
                                            return <option selected = {(client && client.id === c.id ? true : false)} key = {c.id} value = {JSON.stringify(c)}>{c.name} {c.surname}</option>
                                        })}
                                        
                                    </Form.Select>
                                </Form>
                            </Row>
                            )}
                            {id !== "new" && client && (
                                <Row>
                                    <p>{client.name} {client.surname}</p>
                                </Row>
                            )}
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
                    <Row>
                        <Col>
                            <Button className="invoice-button" onClick={newDraft}>Salva ricevuta</Button>
                            <Button variant="outline-success" className="invoice-button">Registra ricevuta</Button>
                            <Button variant="outline-dark" className="invoice-button">Visualizza</Button>
                        </Col>
                    </Row>
                </Box>
            </div>
            
        </AuthManager>
    )

}
export default Invoice