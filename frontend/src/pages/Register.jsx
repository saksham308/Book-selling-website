import React, { useState, useEffect } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  InputRightElement,
  InputGroup,
  Button,
  Flex,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import { register, reset } from "../features/AuthSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const Register = () => {
  const toast = useToast();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );
  const [show, setShow] = useState(false);
  const [signupUser, setSignupUser] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });
  const { name, email, password, password2 } = signupUser;
  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== password2) {
      toast({
        title: "Passwords should be same",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    dispatch(register({ name, email, password }));
  };
  useEffect(() => {
    if (isError) {
      toast({
        title: "Error occured",
        description: message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
    if (user) {
      navigate("/");
    }

    dispatch(reset());
  }, [user, isLoading, isSuccess, isError, dispatch]);
  return (
    <form onSubmit={handleSubmit}>
      <FormControl isRequired p={4}>
        <Flex
          direction="column"
          gap={4}
          justifyContent={"center"}
          alignItems={"flex-start"}
          alignSelf={"center"}
        >
          <FormLabel htmlFor="username">Username</FormLabel>
          <Input
            id="username"
            value={name}
            onChange={(e) =>
              setSignupUser({ ...signupUser, name: e.target.value })
            }
            placeholder="Username"
            type="text"
          />
          <FormLabel htmlFor="email">Email address</FormLabel>
          <Input
            id="email"
            value={email}
            placeholder="Email"
            onChange={(e) =>
              setSignupUser({ ...signupUser, email: e.target.value })
            }
            type="email"
          />
          <FormLabel>Password</FormLabel>
          <InputGroup size="md">
            <Input
              onChange={(e) =>
                setSignupUser({ ...signupUser, password: e.target.value })
              }
              pr="4.5rem"
              type={show ? "text" : "password"}
              placeholder="Enter password"
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={() => setShow(!show)}>
                {show ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
          <FormLabel>Confirm Password</FormLabel>
          <InputGroup size="md">
            <Input
              onChange={(e) =>
                setSignupUser({ ...signupUser, password2: e.target.value })
              }
              pr="4.5rem"
              type={show ? "text" : "password"}
              placeholder="Enter password"
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={() => setShow(!show)}>
                {show ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
          <Button type="submit" colorScheme="teal">
            Submit
          </Button>
        </Flex>
      </FormControl>
    </form>
  );
};

export default Register;
