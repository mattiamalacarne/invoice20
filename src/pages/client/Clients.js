import React, { useEffect, useState } from "react";
import { getClientLIst, newClient } from "../../services/ClientService";
import AuthManager from "../../components/AuthManager";

import "./_client.scss"
import { Button, Modal, Table } from "react-bootstrap";
import ClientModal from "./ClientModal";
import ClientListRow from "./ClientListRow";

const Clients = () => {

    const [clientsList, setClientsList] = useState(null)

    const [showModal, setShowModal] = useState(false)

    const [selClient, setSelClient] = useState(null)

    const openModal = () => {
        setShowModal(true)
    }

    const closeModal = async () => {
        await setSelClient(null)
        getClientLIst()
        .then((data) => {
            setClientsList(data)
        })
        setShowModal(false)
    }

    const showClientInfo =  async (client) => {
        await setSelClient(client)
        openModal()
    }

    useEffect(() => {
        getClientLIst()
        .then((data) => {
            setClientsList(data)
        })
    }, [])

    

    return(
        <AuthManager>
        
        <div>    
            <ClientModal client = {selClient} show={showModal} onClose = {closeModal} />
        </div>

        <div id = "clientsPage">
            <h3 className="title">Clienti</h3>
            <Button className = "title-button" onClick = {openModal}>Nuovo cliente</Button>
        <Table style={{background: "#fff"}}>
            <thead>
            <tr>
                <th>Nome</th>
                <th>Ragione sociale</th>
                <th>Mail</th>
                <th>P. IVA</th>
            </tr>
            </thead>
            <tbody>
            {clientsList && clientsList.map((client) => {
                return(
                    <ClientListRow key={client.id} client={client} onClick = {showClientInfo} />
                )
            })}
            </tbody>
        </Table>
        </div>

        </AuthManager>
    )
}

export default Clients