import React from 'react'
import Table from 'react-bootstrap/Table'
import { Link } from 'react-router-dom'

export default function Account() {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Tên người dùng / nhân viên</th>
          <th>Tài khoản</th>
          <th>Ngày cấp</th>
          <th colSpan={2}>Hành động</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>Mark</td>
          <td>Otto</td>
          <td>20-11-2011</td>
          <td><Link className='btn btn-primary me-2' to='/admin'>Sửa</Link>
            <Link className='btn btn-danger' to='/admin'>Xóa</Link></td>
        </tr>
      </tbody>
    </Table>
  )
}
