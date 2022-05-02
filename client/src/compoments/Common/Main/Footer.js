import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const Footer = () => {
    return (
        <div className="bg-dark text-white">
            <Container>
                    <Row >
                        <Col>Copyright © 2022 Trương Hữu Tài</Col>
                    </Row>
            </Container>
        </div>
    )
}

export default Footer