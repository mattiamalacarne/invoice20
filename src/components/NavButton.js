import React from "react";
import { Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./_navButton.scss"

const NavButton = ({icon, text, link}) => {

    const nav = useNavigate()

    const navigate = () => {
        nav(link)
    }

    return (
        <Row onClick={navigate} className = "navButtonContainer">
            <Col className = "navButtonIcon">
                icona
            </Col>
            <Col>
                {text}
            </Col>
        </Row>
    )
}

export default NavButton