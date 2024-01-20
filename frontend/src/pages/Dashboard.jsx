import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Text } from "@chakra-ui/react";
const Dashboard = () => {
  const { user, isLoading } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, isLoading]);

  return <Text fontSize="2xl">{user.name}</Text>;
};

export default Dashboard;
