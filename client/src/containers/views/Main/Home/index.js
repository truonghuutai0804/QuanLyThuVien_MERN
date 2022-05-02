import React, { useContext, useEffect ,useCallback} from 'react'
import axios from 'axios'
import Context from '../../../../books/Context'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Moment from 'moment';

const Home = () => {
  const [state, dispatch] = useContext(Context)
  const { items } = state
  const getAllBooks = useCallback(async () => {
    try {
      const options = {
        method: "get",
        url: "http://localhost:5000/",
      }
      const response = await axios(options)
      const books = response.data.data.books
      dispatch({ type: "GET_ALL", payload: books })
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  useEffect(() => {
    getAllBooks()
  }, [getAllBooks])

  return (
      <div className="row">
      {items.map((book) =>(
        <div className="col-sm-6 col-lg-3 mb-4 " key={book._id} >
              <Card style={{ width: '17rem' }} >
                <Card.Img variant="top" src="" />
                <Card.Body>
                  <Card.Title >{book.nameBook}</Card.Title>
                  <Card.Text>Tên tác giả: {book.authorBook.nameAuthor}</Card.Text>
                  <Card.Text>Năm xuất bản: {Moment(book.yearPublisherBook).format('MM-YYYY')}</Card.Text>
                  <Button variant="primary">Thông tin mượn sách</Button>
                </Card.Body>
              </Card>
        </div>
      ))}
      </div>
  )
}

export default Home