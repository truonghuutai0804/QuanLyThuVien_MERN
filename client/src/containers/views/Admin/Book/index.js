import React, { useContext, useEffect, useCallback, useState } from 'react'
import Table from 'react-bootstrap/Table'
import { useNavigate } from 'react-router-dom'

import Context from '../../../../books/Context'
import axios from 'axios'
import Moment from 'moment';
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'



export default function Book() {
  let navigate = useNavigate();
  const [state, dispatch] = useContext(Context)
  const { items } = state
  const [show, setShow] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [choiceId, setChoiceId] = useState('');
  const [choiceBook, setChoiceBook] = useState('');
  const handleClose = () => setShow(false);
  const handleCloseEdit = () => setShowEdit(false);
  const handleShow = (bookId) => {
    setChoiceId(bookId)
    setShow(true);
  }
  const handleShowEdit = (book) => {
    setChoiceBook(book)
    setShowEdit(true);
  }



  const fomattedDate = (date) => {
    if (date !== null) return Moment(date).format('MM-YYYY')
    else return null
  }
  const getAllBooks = useCallback(async () => {
    try {
      const options = {
        method: "get",
        url: "http://localhost:5000/admin/stored/books",
      }
      const response = await axios(options)
      const books = response.data.data.books
      dispatch({ type: "GET_ALL", payload: books })
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  const deleteBook = useCallback(async (bookId) => {
    try {
      const options = {
        method: "delete",
        url: `http://localhost:5000/admin/books/${bookId}`,
      }
      await axios(options)
      dispatch({ type: "DELETE_ONE", payload: { _id: bookId } })
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  useEffect(() => {
    getAllBooks()
  }, [getAllBooks])

  return (
    <>
      <h2>Quản lý sách</h2>
      <Button className='mb-4' variant="primary" >
        Thêm sách mới
      </Button>

      {/* ----- List ----- */}
      <Table bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Tên sách</th>
            <th>Loại sách</th>
            <th>Tác giả</th>
            <th>Nhà xuất bản</th>
            <th>Năm xuất bản</th>
            <th colSpan={2}>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {items.map((book, idx) => (
            <tr key={book._id}>
              <td>{idx + 1}</td>
              <td>{book.nameBook}</td>
              <td>{book.categoryBook.nameCategory}</td>
              <td>{book.authorBook.nameAuthor}</td>
              <td>{book.publisherBook.namePublisher}</td>
              <td>{fomattedDate(book.yearPublisherBook)}</td>
              <td>
                <span className='btn btn-primary me-2' onClick={() => { handleShowEdit(book) }}>Sửa</span>
                <span className='btn btn-danger' onClick={() => { handleShow(book._id) }}>Xóa</span>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* ----- Delete ----- */}
      <Modal show={show} onHide={handleClose} centered >
        <Modal.Header closeButton>
          <Modal.Title>Xác nhận xóa sách</Modal.Title>
        </Modal.Header>
        <Modal.Body>Bạn có chắc muốn xóa sách này ?</Modal.Body>
        <Modal.Footer>
          <span className='btn btn-secondary' onClick={handleClose}>
            Hủy
          </span>
          <span className='btn btn-danger' href="" onClick={() =>
            deleteBook(choiceId) && navigate(0)
          }>
            Xóa bỏ
          </span>
        </Modal.Footer>
      </Modal>

      {/* ----- Edit ----- */}
      <Modal show={showEdit} onHide={handleCloseEdit} centered>
        <Modal.Header closeButton>
          <Modal.Title>Sửa sách</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>ID</Form.Label>
              <Form.Control
                type="text"
                value={choiceBook._id}
                onChange={e => setChoiceBook({ ...choiceBook, _id: e.target.value })}
                disabled
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Tên sách</Form.Label>
              <Form.Control
                type="text"
                autoFocus
                value={choiceBook.nameBook}
                onChange={e => setChoiceBook({ ...choiceBook, nameBook: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Loại sách</Form.Label>
              <Form.Select aria-label="Default select example">
                <option value={choiceBook.authorBook}>{choiceBook.authorBook}</option>
              </Form.Select>
              {console.log(choiceBook.authorBook)}
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label>Mô tả </Form.Label>
              <Form.Control
                as="textarea" rows={3}
                value={choiceBook.descriptionBook}
                onChange={e => setChoiceBook({ ...choiceBook, descriptionBook: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Tác giả</Form.Label>
              <Form.Select aria-label="Default select example">
                <option>Mặc định</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Nhà xuất bản</Form.Label>
              <Form.Select aria-label="Default select example">
                <option>Mặc định</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Năm xuất bản</Form.Label>
              <Form.Control
                type="month"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Ảnh sách</Form.Label>
              <Form.Control
                type="file"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEdit}>
            Hủy
          </Button>
          <Button variant="primary" onClick={handleCloseEdit}>
            Lưu lại
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
