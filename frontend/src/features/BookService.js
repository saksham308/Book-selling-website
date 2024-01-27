import axios from "axios";
const API_URL = "http://localhost:3000/api/products/";
const getAllBooks = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL, config);
  return response.data;
};
const uploadBook = async (book, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const { bookName, author, description, price, pdf, coverImage } = book;
  const data = new FormData();

  data.append("bookName", bookName);
  data.append("author", author);
  data.append("description", description);
  data.append("price", price);
  data.append("pdf", pdf);
  data.append("coverImage", coverImage);
  const response = await axios.post(API_URL, data, config);
  return response.data;
};
const getUserBooks = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(
    "http://localhost:3000/api/users/getBooks",
    config
  );
  return response.data;
};
const deleteBook = async (bookId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(API_URL + bookId, config);
  return response.data;
};

const BookService = { getAllBooks, getUserBooks, uploadBook, deleteBook };
export default BookService;
