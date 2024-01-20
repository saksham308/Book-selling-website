import React, { useEffect, useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  InputRightElement,
  InputGroup,
  Button,
  Flex,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import { login, reset } from "../features/AuthSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const { user, isError, isLoading, message, isSuccess } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [loginUser, setLoginUser] = useState({ email: "", password: "" });
  useEffect(() => {
    if (isError) {
      toast({
        title: "Error occured",
        description: "Not LoggedIn Successfully",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
    console.log(user);
    if (user) {
      navigate("/");
    }

    dispatch(reset());
  }, [user, isLoading, isSuccess, isError, dispatch]);
  const { email, password } = loginUser;
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(login(loginUser));
  };
  console.log(user);
  return (
    <form onSubmit={handleSubmit}>
      <FormControl isRequired p={4}>
        <Flex
          gap={4}
          direction="column"
          justifyContent={"center"}
          alignItems={"flex-start"}
        >
          <FormLabel htmlFor="email">Email address</FormLabel>
          <Input
            id="email"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setLoginUser({ ...loginUser, email: e.target.value });
            }}
            type="Email"
          />
          <FormLabel htmlFor="pass">Password</FormLabel>
          <InputGroup size="md">
            <Input
              id="pass"
              value={password}
              onChange={(e) => {
                setLoginUser({ ...loginUser, password: e.target.value });
              }}
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

export default Login;
