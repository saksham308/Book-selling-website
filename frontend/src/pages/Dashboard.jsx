import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "@chakra-ui/react";
import { FaExternalLinkAlt } from "react-icons/fa";
import {
  Text,
  Card,
  Image,
  Stack,
  CardBody,
  Heading,
  CardFooter,
  Button,
  useToast,
} from "@chakra-ui/react";
import { getAllBooks, reset } from "../features/BooksSlice";

const Dashboard = () => {
  const { user, isLoading } = useSelector((state) => state.auth);
  const toast = useToast();
  const { books, isError, message, isSuccess } = useSelector(
    (state) => state.books
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    dispatch(getAllBooks());
    if (isError) {
      toast({
        title: "Error occured",
        description: message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
    () => {
      dispatch(reset());
    };
  }, [user, isLoading]);

  return (
    <>
      {books.map((book) => (
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
                ? book?.coverPage?.publicURL
                : "https://imgs.search.brave.com/oB6fgT45DC10B0RQfk3kTBtZ0W-2p7udZUxPnfvKT3M/rs:fit:860:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzA0LzYyLzkzLzY2/LzM2MF9GXzQ2Mjkz/NjY4OV9CcEVFY3hm/Z011WVBmVGFJQU9D/MXRDRHVybXNubzdT/cC5qcGc"
            }
            alt="Book Image"
          />

          <Stack>
            <CardBody>
              <Heading size="md">{book.bookName}</Heading>

              <Text py="2">{book.description}</Text>
              <Text color="blue.600" fontSize="2xl">
                {book.price} Points
              </Text>
            </CardBody>

            <CardFooter gap={2}>
              <Button variant="solid" colorScheme="blue">
                Buy Book
              </Button>
            </CardFooter>
          </Stack>
        </Card>
      ))}
    </>
  );
};

export default Dashboard;
