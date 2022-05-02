import React from 'react'
import Container from 'react-bootstrap/esm/Container'
import { Outlet } from 'react-router-dom'
import Footer from '../../../compoments/Common/Main/Footer'
import Header from '../../../compoments/Common/Main/Header'


export default function Main() {
    return (
        <div>
            <Header />
            <Container className='mt-4'>
                <Outlet />
            </Container>
            <Footer />
        </div>
    )
}

