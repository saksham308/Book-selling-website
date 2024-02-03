import React, { useEffect } from "react";
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
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { reset, uploadBooks } from "../features/BooksSlice";
const UploadPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();
  const { books, loading, isSuccess, isError, message } = useSelector(
    (state) => state.books
  );
  console.log(books, loading, isSuccess, isError);
  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    if (!user) navigate("/login");
    return () => dispatch(reset());
  }, []);

  const handleInputChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };
  const [book, setBook] = useState({
    bookName: "",
    author: "",
    description: "",
    price: 0,
    pdf: "",
    coverImage: "",
  });
  const { bookName, author, description, price, pdf, coverImage } = book;
  const handleFileChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.files[0] });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!pdf.name.toLowerCase().endsWith("pdf")) {
      toast({
        title: "Upload Failed",
        description: "Make sure that book is in PDF format",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    if (coverImage) {
      const imageExtensions = ["jpg", "jpeg", "png", "gif"];
      let bool = false;
      imageExtensions.map((img) => {
        if (coverImage.name.toLowerCase().endsWith(img)) {
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
    await dispatch(uploadBooks(book));
    if (isError) {
      toast({
        title: "Upload Failed",
        status: "error",
        duration: 3000,
        description: message,
        isClosable: true,
      });
    }
    if (isSuccess) {
      toast({
        title: "Upload Successfull",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <FormControl isRequired>
          <FormLabel>Name of The Book</FormLabel>
          <Input
            name="bookName"
            value={bookName}
            onChange={handleInputChange}
            type="text"
          />
        </FormControl>
        <FormControl isRequired>
          {" "}
          <FormLabel>Name of The Author</FormLabel>
          <Input
            name="author"
            value={author}
            onChange={handleInputChange}
            type="text"
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel> Description</FormLabel>
          <Textarea
            name="description"
            height={"200px"}
            value={description}
            onChange={handleInputChange}
            placeholder="Description..."
            size="lg"
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel> Price of the Books</FormLabel>
          <NumberInput max={50} min={0}>
            <NumberInputField
              value={price}
              placeholder="The price should be less than 50"
              name="price"
              onChange={(e) =>
                setBook({
                  ...book,
                  price:
                    e.target.value < 0
                      ? 0
                      : e.target.value || e.target.value > 50
                      ? 50
                      : e.target.value,
                })
              }
            />
          </NumberInput>
        </FormControl>

        <FormControl isRequired>
          <FormLabel>PDF of the book</FormLabel>
          <Input name="pdf" onChange={handleFileChange} type="file" />
        </FormControl>

        <FormControl>
          <FormLabel>Cover Image of The Book</FormLabel>
          <Input name="coverImage" onChange={handleFileChange} type="file" />
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
    </>
  );
};

export default UploadPage;
