import React from 'react'
import { Link } from 'react-router-dom'
import Nav from 'react-bootstrap/Nav'

export default function SiderAdmin () {
    return (
        <Nav variant="pills" defaultActiveKey={1} className="flex-column mt-4" >
            <Nav.Item>
                <Nav.Link as={Link} to="/admin" eventKey={1} className='fw-bolder text-white '  >
                    Quản lý mượn sách
                </Nav.Link>
            </Nav.Item>
            <Nav.Item className='mt-3'>
                <Nav.Link as={Link} to="/admin/books" eventKey={2} className='fw-bolder text-white '>
                    Quản lý sách
                </Nav.Link>
            </Nav.Item>
            <Nav.Item className='mt-3'>
                <Nav.Link as={Link} to="/admin/users" eventKey={3} className='fw-bolder text-white ' >
                    Quản lý người dùng
                </Nav.Link>
            </Nav.Item>
            <Nav.Item className='mt-3'>
                <Nav.Link as={Link} to="/admin/authors" eventKey={4} className='fw-bolder text-white ' >
                    Quản lý tác giả
                </Nav.Link>
            </Nav.Item>
            <Nav.Item className='mt-3'>
                <Nav.Link as={Link} to="/admin/categories" eventKey={5} className='fw-bolder text-white ' >
                    Quản lý loại sách
                </Nav.Link>
            </Nav.Item>
            <Nav.Item className='mt-3'>
                <Nav.Link as={Link} to="/admin/publishers" eventKey={6} className='fw-bolder text-white'>
                    Quản lý nhà xuất bản
                </Nav.Link>
            </Nav.Item>
            <Nav.Item className='mt-3'>
                <Nav.Link as={Link} to="/admin/staffs" eventKey={7} className='fw-bolder text-white '>
                    Quản lý nhân viên
                </Nav.Link>
            </Nav.Item>
            <Nav.Item className='mt-3'>
                <Nav.Link as={Link} to="/admin/accounts" eventKey={8} className='fw-bolder text-white '>
                    Quản lý tài khoản
                </Nav.Link>
            </Nav.Item>
            <Nav.Item className='mt-3 mb-5' eventKey={9}>
                <Nav.Link as={Link} to="/admin/violates" eventKey="violate" className='fw-bolder text-white'>
                    Quản lý vi phạm
                </Nav.Link>
            </Nav.Item>
        </Nav>
    )
}
