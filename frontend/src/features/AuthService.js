import axios from "axios";
const API_URL = "http://localhost:3000/api/users/";

const login = async (user) => {
  const response = await axios.post(API_URL + "login", user);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  console.log(response);
  return response.data;
};

const register = async (user) => {
  const response = await axios.post(API_URL + "register", user);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  console.log(response);
  return response.data;
};
const AuthService = { login, register };
export default AuthService;
