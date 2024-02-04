import {
  Flex,
  Heading,
  Box,
  ButtonGroup,
  Button,
  Avatar,
} from "@chakra-ui/react";
import { FaUpload } from "react-icons/fa";

import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
} from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import React from "react";
import { useNavigate } from "react-router-dom";
import { logout, reset } from "../features/AuthSlice";
import { useToast } from "@chakra-ui/react";
const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast();
  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
    dispatch(reset());
    toast({
      title: "Logged Out ",
      description: "Logout Successfully",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };
  const { user } = useSelector((state) => state.auth);
  const { books } = useSelector((state) => state.books);

  return user ? (
    <Flex as="nav" justifyContent="space-between" flexWrap="wrap">
      <Box p="2">
        <Heading size="md">BOOKS N BOOKS</Heading>
      </Box>
      <ButtonGroup p={"2"} gap="4">
        <Button
          leftIcon={<FaUpload />}
          onClick={() => navigate("/upload")}
          variant="solid"
        >
          UPLOAD
        </Button>
        <Menu>
          <MenuButton colorScheme="pink">
            <Avatar bg="red.500" name={user?.name} />
          </MenuButton>
          <MenuList>
            <MenuItem onClick={() => navigate("/")}>All Books</MenuItem>
            <MenuItem onClick={() => navigate("/account")}>
              Account Information
            </MenuItem>
            <MenuItem onClick={() => navigate("/user-uploads")}>
              Your Uploads
            </MenuItem>
            <MenuItem onClick={() => navigate("/boughtBooks")}>
              Previously Bought
            </MenuItem>
            <MenuItem onClick={handleLogout}>LogOut </MenuItem>
            <MenuDivider />
          </MenuList>
        </Menu>
      </ButtonGroup>
    </Flex>
  ) : (
    <Flex as="nav" justifyContent="space-between" flexWrap="wrap">
      <Box p="2">
        <Heading size="md">BOOKS N BOOKS</Heading>
      </Box>
      <ButtonGroup p={"2"} gap="4">
        <Button colorScheme="teal" onClick={() => navigate("/register")}>
          Sign Up
        </Button>
        <Button colorScheme="teal" onClick={() => navigate("/login")}>
          Log in
        </Button>
      </ButtonGroup>
    </Flex>
  );
};

export default Header;
