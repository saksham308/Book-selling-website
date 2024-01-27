import React from "react";
import { useSelector } from "react-redux";
import {
  Card,
  CardHeader,
  CardBody,
  Heading,
  CardFooter,
  Stack,
  StackDivider,
  Box,
  Text,
  Flex,
  Divider,
} from "@chakra-ui/react";
const Account = () => {
  const { user } = useSelector((state) => state.auth);
  console.log(user);
  return (
    <>
      <Flex
        alignItems={"center"}
        direction={"column"}
        flexWrap={"wrap"}
        gap={4}
      >
        <Card width={"50%"}>
          <CardHeader>
            <Heading size="md">Account Information</Heading>
          </CardHeader>

          <CardBody>
            <Stack divider={<StackDivider />} spacing="4">
              <Box>
                <Heading size="xs" textTransform="uppercase">
                  Username
                </Heading>
                <Text pt="2" fontSize="sm">
                  {user?.name}
                </Text>
              </Box>
              <Box>
                <Heading size="xs" textTransform="uppercase">
                  Email
                </Heading>
                <Text pt="2" fontSize="sm">
                  {user?.email}
                </Text>
              </Box>
              <Box>
                <Heading size="xs" textTransform="uppercase">
                  Account Balance
                </Heading>
                <Text pt="2" fontSize="sm">
                  {user?.balance}
                </Text>
              </Box>
            </Stack>
          </CardBody>
        </Card>
        <Card width={"50%"} height={""}>
          <CardHeader>
            <Heading size="md">Previous Payments</Heading>
          </CardHeader>
          <CardBody>
            {user.deposits.length >= 1 ? (
              user.deposits.map((transaction) => (
                <Box>
                  <Heading size="xs" textTransform="uppercase">
                    TRANSACTION DATE:{transaction.timestamp}
                  </Heading>
                  <Text pt="2" fontSize="sm">
                    AMOUNT: {transaction.amount}
                  </Text>
                </Box>
              ))
            ) : (
              <Text pt="2" fontSize="sm">
                You haven't made any payments yet!!
              </Text>
            )}
          </CardBody>
        </Card>
      </Flex>
    </>
  );
};

export default Account;
