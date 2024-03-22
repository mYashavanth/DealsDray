import {
  Box,
  Heading,
  Input,
  Button,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import React, { useState } from "react";
import axios from "axios";
import { FaEyeSlash, FaEye } from "react-icons/fa";

export default function Signup() {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const [formData, setFormData] = useState({
    name: "",
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
        "http://localhost:8080/user/signup",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log(response);
      if (response.status === 200) {
        alert("User created successfully");
      } else if (response.status === 201) {
        alert("User already exists");
      } else {
        alert("Something went wrong");
      }
    } catch (error) {
      console.log({ error });
    }
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
        <Heading textAlign={"center"}>Signup</Heading>
        <form onSubmit={handleSubmit}>
          <Box
            display={"flex"}
            flexDirection={"column"}
            gap={5}
            width={"60%"}
            m={"auto"}
          >
            <Input
              type="text"
              name="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="Please Enter Name"
              border={"none"}
              borderBottom={"2px solid black"}
              _hover={{ borderBottom: "2px solid teal" }}
              outline={"none"}
              focusBorderColor="teal.500"
            />
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
            <span
              style={{
                color: "gray",
                fontFamily: "cursive",
                fontSize: "14px",
                marginTop: "-10px",
              }}
            >
              password must contain at least 8 characters, 1 uppercase 1 number
              and 1 special character
            </span>
            <Button type="submit" colorScheme="teal">
              Submit
            </Button>
          </Box>
        </form>
      </Box>
    </>
  );
}
