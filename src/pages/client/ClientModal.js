import React, { useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { delClient, editClient, newClient } from "../../services/ClientService";

const ClientModal = ({client, onClose, show}) => {

    let data = {
        name: "",
        surname: "",
        piva: "",
        cf: "",
        ragSociale: "",
        address: "",
        mail: "",
        tel: ""
    }

    if (client != null) data = client

    useEffect(() => {
        updateModal()
    }, [show])

    const [name, setName] = useState("")
    const [surname, setSurname] = useState("")
    const [piva, setPiva] = useState("")
    const [cf, setCf] = useState("")
    const [ragSociale, setRagSociale] = useState("")
    const [address, setAddress] = useState("")
    const [mail, setMail] = useState("")
    const [tel, setTel] = useState("")

    const updateModal = () => {
        setName(client === null ? "" : client.name)
        setSurname(client === null ? "" : client.surname)
        setPiva(client === null ? "" : client.piva)
        setCf(client === null ? "" : client.cf)
        setRagSociale(client === null ? "" : client.ragSociale)
        setAddress(client === null ? "" : client.address)
        setMail(client === null ? "" : client.mail)
        setTel(client === null ? "" : client.tel)
    }

    const createClient = (event) => {
        event.preventDefault()

        if (validate) {

            const client = {
                id: crypto.randomUUID(),
                name: name,
                surname: surname,
                piva: piva,
                cf: cf,
                ragSociale: ragSociale,
                address: address,
                mail: mail,
                tel: tel
            }

            const clientCreated = newClient(client)
            if (clientCreated) {
                onClose()
            }

        }
        return false
    }

    const deleteClient = () => {
        console.debug("Elimino")
        delClient(client.id)
        onClose()
    }

    const changeClient = () => {
        const editC = {
            id: client.id,
            name: name,
            surname: surname,
            piva: piva,
            cf: cf,
            ragSociale: ragSociale,
            address: address,
            mail: mail,
            tel: tel
        }
        editClient(client.id, editC)
        onClose()
    }

    const validate = () => {
        return true
    }

    return(
        <Modal
                show = {show}
                onHide = {onClose}
        >
            <Modal.Header closeButton>{client == null ? "Nuovo cliente" : client.name + " " + client.surname}</Modal.Header>
                <Modal.Body>
        <Form>
            
            <Row>
                <Col>
                    <Form.Label>Nome</Form.Label><br></br>
                    <Form.Control value={name} onChange = {(v) => setName(v.target.value)} type = "text" /><br></br>
                </Col>
                <Col>
                    <Form.Label>Cognome</Form.Label><br></br>
                    <Form.Control value={surname} onChange = {(v) => setSurname(v.target.value)} type = "text" /><br></br>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form.Label>Ragione sociale</Form.Label><br></br>
                    <Form.Control value={ragSociale} onChange = {(v) => setRagSociale(v.target.value)} type = "text" /><br></br>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form.Label>Mail</Form.Label><br></br>
                    <Form.Control value={mail} onChange = {(v) => setMail(v.target.value)} type = "text" /><br></br>
                </Col>
                <Col>
                    <Form.Label>Codice Fiscale</Form.Label><br></br>
                    <Form.Control value={cf} onChange = {(v) => setCf(v.target.value)} type = "text" /><br></br>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form.Label>P.IVA</Form.Label><br></br>
                    <Form.Control value={piva} onChange = {(v) => setPiva(v.target.value)} type = "text" /><br></br>
                </Col>
                <Col>
                    <Form.Label>Telefono</Form.Label><br></br>
                    <Form.Control value={tel} onChange = {(v) => setTel(v.target.value)} type = "text" /><br></br>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form.Label>Indirizzo</Form.Label><br></br>
                    <Form.Control value={address} onChange = {(v) => setAddress(v.target.value)} type = "text" /><br></br>
                </Col>
            </Row>

        </Form>
        </Modal.Body>
        <Modal.Footer>
            {!client && (<Button onClick = {createClient} >Salva</Button>)}
            {client && (<Button onClick = {changeClient}>Modifica</Button>)}
            {client && (<Button variant = "danger" onClick = {deleteClient}>Elimina</Button>)}
        </Modal.Footer>
        </Modal>
    )
}

export default ClientModal