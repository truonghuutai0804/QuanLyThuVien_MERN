import React from 'react'
import Table from 'react-bootstrap/esm/Table'
import { Link } from 'react-router-dom'

export default function User() {
  return (
    <Table bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Tên người</th>
          <th>Ngành</th>
          <th>Số điện thoại</th>
          <th>Địa chỉ</th>
          <th>Email</th>
          <th colSpan={2}>Hành động</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>Mark</td>
          <td>Mark</td>
          <td>0869954514</td>
          <td>Mark</td>
          <td>Mark@Mark</td>
          <td><Link className='btn btn-primary me-2' to='/admin'>Sửa</Link>
            <Link className='btn btn-warning me-2' to='/admin'>Vi phạm</Link>
            <Link className='btn btn-danger' to='/admin'>Xóa</Link></td>
        </tr>
      </tbody>
    </Table>
  )
}
