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
const updateBook = async (book, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  console.log(book);
  const { bookName, id, author, description, price, pdf, coverPage } = book;
  const data = new FormData();
  bookName ? data.append("bookName", bookName) : "";
  author ? data.append("author", author) : "";
  description ? data.append("description", description) : "";
  price ? data.append("price", price) : "";
  pdf ? data.append("pdf", pdf) : "";
  coverPage ? data.append("coverImage", coverPage) : "";
  // console.log(data);
  const response = await axios.put(API_URL + id, data, config);
  console.log(response.data);
  return response.data;
};
const BookService = {
  getAllBooks,
  updateBook,
  getUserBooks,
  uploadBook,
  deleteBook,
};
export default BookService;
