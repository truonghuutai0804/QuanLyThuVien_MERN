import React from 'react'
import Table from 'react-bootstrap/esm/Table'
import { Link } from 'react-router-dom'

export default function Publisher() {
  return (
    <Table bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Tên nhà xuất bản</th>
          <th colSpan={2}>Hành động</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>Mark</td>
          <td><Link className='btn btn-primary me-2' to='/admin'>Sửa</Link>
            <Link className='btn btn-danger' to='/admin'>Xóa</Link></td>
        </tr>
      </tbody>
    </Table>
  )
}
