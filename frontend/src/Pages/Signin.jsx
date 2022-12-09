import {
  Box,
  Button,
  Flex,
  FormControl,
  Heading,
  Input,
  useToast,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { userLogin } from "../Redux/action";
import { useNavigate } from "react-router-dom";

const Signin = () => {
  const toast = useToast();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    user_name: "",
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      formData.user_name == "" &&
      formData.email === "" &&
      formData.password === ""
    ) {
      toast({
        title: "Please fill all fields",
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
    } else {
      console.log(formData);
      newUserLogin(formData);
    }
  };

  const newUserLogin = async (user_data) => {
    try {
      let response = await axios.get(
        "https://mock-8-coding-vite.onrender.com/user"
      );
      let data = response.data;
      let authUser = data.findIndex(
        (elem) =>
          elem.email === user_data.email &&
          elem.user_name === user_data.user_name &&
          elem.password === user_data.password
      );
      if (authUser !== -1) {
        let userData = data[authUser];
        dispatch(userLogin(userData));
        toast({
          title: "login success",
          status: "success",
          duration: 2000,
          isClosable: true,
          position: "top",
        });
        navigate("/user")
      } else {
        toast({
          title: "Wrong user credentials",
          status: "error",
          duration: 2000,
          isClosable: true,
          position: "top",
        });
      }
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "see console for more details",
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
      console.log({ error });
    }
  };
  return (
    <Box mt={"7rem"}>
      <Heading textAlign={"center"} m={"1rem auto"}>
        Sign In
      </Heading>
      <FormControl w={{base:"80%",md:"50%",lg:"30%"}} m={"auto"}>
        <VStack>
          <Input
            onChange={handleChange}
            name="user_name"
            value={formData.user_name}
            type="text"
            placeholder="Enter Username"
            required
          />
          <Input
            onChange={handleChange}
            name="email"
            value={formData.email}
            type="email"
            placeholder="Enter email"
            required
          />
          <Input
            onChange={handleChange}
            name="password"
            value={formData.password}
            type="password"
            placeholder="Enter password"
            required
          />
        </VStack>
        <Flex mt={"10px"} justify={"flex-end"}>
          <Button onClick={handleSubmit} colorScheme={"teal"} type="submit">
            Submit
          </Button>
        </Flex>
      </FormControl>
    </Box>
  );
};

export default Signin;