import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  FormControl,
  FormLabel,
  NumberInput,
  Input,
  Textarea,
  NumberInputField,
  Button,
  useToast,
} from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import { updateBook } from "../features/BooksSlice";

const EditPage = () => {
  const { bookId } = useParams();
  const dispatch = useDispatch();
  const toast = useToast();
  const { uploadedBooks, loading } = useSelector((state) => state.books);
  let filterBook = uploadedBooks.filter((book) => book._id === bookId);
  filterBook = filterBook[0];
  const [book, setBook] = useState({
    id: filterBook._id,
    author: filterBook.author,
    bookName: filterBook.bookName,
    price: filterBook.price,
    description: filterBook.description,
    pdf: "",
    coverPage: "",
  });
  console.log(book);
  const handleSubmit = (e) => {
    e.preventDefault();

    if (book.price > 50 || book.price < 0) {
      toast({
        title: " Error",
        description: "Make sure that price is in the given range",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    if (!book.bookName || !book.price || !book.description || !book.author) {
      toast({
        title: " Error",
        description: "Make sure that all the fields are filled",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    if (book.pdf && !book.pdf.name.toLowerCase().endsWith("pdf")) {
      toast({
        title: "Upload Failed",
        description: "Make sure that book is in PDF format",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    if (book.coverPage) {
      console.log(1);
      const imageExtensions = ["jpg", "jpeg", "png", "gif"];
      let bool = false;
      imageExtensions.map((img) => {
        if (book.coverPage.name.toLowerCase().endsWith(img)) {
          bool = true;
        }
      });

      if (!bool) {
        toast({
          title: "Upload Failed",
          description: "Cover Image is not in proper format",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        return;
      }
    }
    dispatch(updateBook(book));
  };
  const handleInputChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.files[0] });
  };
  return (
    <form onSubmit={handleSubmit}>
      <FormControl isRequired>
        <FormLabel>Name of The Book</FormLabel>
        <Input
          name="bookName"
          value={book.bookName}
          onChange={handleInputChange}
          type="text"
        />
      </FormControl>
      <FormControl isRequired>
        {" "}
        <FormLabel>Name of The Author</FormLabel>
        <Input
          name="author"
          value={book.author}
          onChange={handleInputChange}
          type="text"
        />
      </FormControl>
      <FormControl isRequired>
        <FormLabel> Description</FormLabel>
        <Textarea
          name="description"
          height={"200px"}
          value={book.description}
          onChange={handleInputChange}
          placeholder="Description..."
          size="lg"
        />
      </FormControl>
      <FormControl isRequired>
        <FormLabel> Price of the Books</FormLabel>
        <NumberInput defaultValue={book.price}>
          <NumberInputField
            placeholder="The price should be less than 50"
            name="price"
            value={book.price}
            onChange={(e) =>
              setBook({
                ...book,
                price: e.target.value,
              })
            }
          />
        </NumberInput>
      </FormControl>
      <FormControl>
        <FormLabel> Updated PDF of the book</FormLabel>
        <Input name="pdf" onChange={handleFileChange} type="file" />
      </FormControl>
      <FormControl>
        <FormLabel>Updated Cover Image of The Book</FormLabel>
        <Input name="coverPage" onChange={handleFileChange} type="file" />
      </FormControl>

      {loading ? (
        <Button isLoading loadingText="Submitting"></Button>
      ) : (
        <Button
          colorScheme="teal"
          margin={2}
          alignSelf={"flex-start"}
          type="submit"
        >
          Submit
        </Button>
      )}
    </form>
  );
};

export default EditPage;
