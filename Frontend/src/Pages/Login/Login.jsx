import {
  Box,
  Heading,
  Input,
  Button,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import axios from "axios";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { AuthContext } from "../../ContextApi/AuthContextProvider";
import { Navigate } from "react-router-dom";

export default function Login() {
    const {authDetails} = useContext(AuthContext)
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    fetchData();
  };
  async function fetchData() {
    try {
      const response = await axios.post(
        "http://localhost:8080/user/login",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log(response.data.user);
      if (response.status === 200) {
        authDetails.login(response.data.user)
        alert("Login successful");
      }
      
    } catch (error) {
      console.log({ error });
    }
  }
  if(authDetails.auth.isAuthenticated){
    return <Navigate to="/"/>
  }
  return (
    <>
      <Box
        // border={"1px solid black"}
        p={5}
        width={"50%"}
        m={"auto"}
        backgroundColor={"gray.100"}
        height={"80vh"}
      >
        <Heading textAlign={"center"}>Login</Heading>
        <form onSubmit={handleSubmit}>
          <Box
            display={"flex"}
            flexDirection={"column"}
            gap={5}
            width={"60%"}
            m={"auto"}
          >
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              placeholder="Please Enter Email"
              border={"none"}
              borderBottom={"2px solid black"}
              _hover={{ borderBottom: "2px solid teal" }}
              outline={"none"}
              focusBorderColor="teal.500"
            />
            <InputGroup size="md">
              <Input
                pr="4.5rem"
                type={show ? "text" : "password"}
                placeholder="Please Enter password"
                name="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                border={"none"}
                borderBottom={"2px solid black"}
                _hover={{ borderBottom: "2px solid teal" }}
                outline={"none"}
                focusBorderColor="teal.500"
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={handleClick}>
                  {show ? <>{<FaEyeSlash />}</> : <>{<FaEye />}</>}
                </Button>
              </InputRightElement>
            </InputGroup>
            <Button type="submit" colorScheme="teal">
              Login
            </Button>
          </Box>
        </form>
      </Box>
    </>
  );
}
