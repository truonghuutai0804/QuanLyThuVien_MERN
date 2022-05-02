import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const Login = () => {
    return (
        <div className="mx-auto col-4 mt-4">
            <h1 className='text-center'>ĐĂNG NHẬP</h1>
            <Form method="POST" action="/" >
                <Form.Group className="mb-3" controlId="Username" >
                    <Form.Label>Tài Khoản</Form.Label>
                    <Form.Control name="username" type="text" placeholder="Nhập username" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="Password">
                    <Form.Label>Mật Khẩu</Form.Label>
                    <Form.Control name="password" type="password" placeholder="Nhập password" />
                </Form.Group>
                <Form.Group className="mb-4" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Ghi nhớ" />
                </Form.Group>
                <Button className="position-relative start-50 translate-middle" variant="primary" type="submit">
                    Đăng nhập
                </Button>
            </Form>
        </div>
    )
}

export default Login