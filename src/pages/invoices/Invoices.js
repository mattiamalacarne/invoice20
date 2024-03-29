import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import AuthManager from "../../components/AuthManager";
import InvoiceListRow from "./InvoiceListRow";

import { useNavigate } from "react-router-dom"

import "./_invoice.scss"
import { getAllInvoice } from "../../services/InvoiceService";

const Invoices = () => {

    const nav = useNavigate()

    const [invoicesList, setInvoicesList] = useState(null)

    const showInvoiceInfo = (i) => {
        nav("/invoices/"+i)
    }

    useEffect(() => {
        getAllInvoice()
        .then((i) => {
            setInvoicesList(i)
        })
    }, [])

    return(
        <AuthManager>

            <div id = "invoicePage">
            <h3 className="title">Ricevute</h3>
            <Button onClick = {() => showInvoiceInfo("new")} className = "title-button">Nuova ricevuta</Button>
        <Table style={{background: "#fff"}}>
            <thead>
            <tr>
                <th>N</th>
                <th>Cliente</th>
                <th>Importo</th>
                <th>Bollo</th>
                <th>Stato</th>
            </tr>
            </thead>
            <tbody>
            {invoicesList && invoicesList.map((invoice) => {
                console.log(invoice)
                return(
                    <InvoiceListRow key={invoice.id} onClick = {showInvoiceInfo} invoice = {invoice}/>
                )
            })}
            </tbody>
        </Table>
        </div>
            
        </AuthManager>
    )

}
export default Invoices