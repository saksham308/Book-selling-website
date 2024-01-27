import React, { useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";

import { deleteBook, reset, userBooks } from "../features/BooksSlice";
import {
  Text,
  Card,
  Image,
  CardBody,
  Heading,
  Button,
  Flex,
  useToast,
} from "@chakra-ui/react";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
const Uploads = () => {
  const toast = useToast();
  const { uploadedBooks, loading, isError, isSuccess } = useSelector(
    (state) => state.books
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const handleDelete = async (bookId) => {
    await dispatch(deleteBook(bookId));
    if (isSuccess) {
      await toast({
        title: "Delete Successfull",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
  };
  const handleEdit = (bookId) => {};
  useEffect(() => {
    const fetchData = async () => {
      if (!user) {
        navigate("/login");
      }
      await dispatch(userBooks());
    };
    fetchData();
    return () => dispatch(reset());
  }, []);

  return (
    <>
      {uploadedBooks && uploadedBooks.length > 0 ? (
        uploadedBooks.map((book) => (
          <Card
            key={book._id}
            direction={{ base: "column", sm: "row" }}
            overflow="hidden"
            variant="outline"
          >
            <Image
              objectFit="cover"
              maxW={{ base: "100%", sm: "200px" }}
              src={
                book?.coverPage?.publicURL
                  ? book.coverPage.publicURL
                  : "https://imgs.search.brave.com/oB6fgT45DC10B0RQfk3kTBtZ0W-2p7udZUxPnfvKT3M/rs:fit:860:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzA0LzYyLzkzLzY2/LzM2MF9GXzQ2Mjkz/NjY4OV9CcEVFY3hm/Z011WVBmVGFJQU9D/MXRDRHVybXNubzdT/cC5qcGc"
              }
              alt="Book Image"
            />

            <CardBody>
              <Flex direction={"column"} gap={2} justifyContent={"flex-start"}>
                <Heading size="md">{book.bookName}</Heading>
                <Text py="2">{book.description}</Text>
                <Text color="blue.600" fontSize="2xl">
                  {book.price} Points
                </Text>

                <Flex gap={6}>
                  <Button
                    colorScheme="green"
                    leftIcon={<MdDelete />}
                    onClick={() => handleDelete(book._id)}
                    type="submit"
                    variant="solid"
                  >
                    Delete
                  </Button>

                  <Button
                    colorScheme="green"
                    onClick={() => handleEdit(book._id)}
                    leftIcon={<FaEdit />}
                    variant="solid"
                  >
                    <Link to={"/"}> Edit</Link>
                  </Button>
                </Flex>
              </Flex>
            </CardBody>
          </Card>
        ))
      ) : (
        <Text fontSize="xl">You haven't uploaded anything yet!</Text>
      )}
    </>
  );
};

export default Uploads;
