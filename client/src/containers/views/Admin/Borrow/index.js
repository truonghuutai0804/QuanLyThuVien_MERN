import React from 'react'
import Table from 'react-bootstrap/esm/Table'
import { Link } from 'react-router-dom'

export default function Borrow() {
  return (
    <Table bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Tên người dùng</th>
          <th>Tên nhân viên</th>
          <th>Tên sách</th>
          <th>Ngày mượn</th>
          <th>Ngày hẹn</th>
          <th>Ngày trả</th>
          <th colSpan={2}>Hành động</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>Mark</td>
          <td>Otto</td>
          <td>Giao trinh phan tich thiet ke he thong 5365+564644</td>
          <td>10-11-2022</td>
          <td>20-11-2022</td>
          <td>20-11-2022</td>
          <td><Link className='btn btn-primary me-2' to='/admin'>Sửa</Link>
            <Link className='btn btn-danger' to='/admin'>Xóa</Link></td>
        </tr>
      </tbody>
    </Table>
  )
}
