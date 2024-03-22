import { Button, Center, Flex, Spacer, Text } from "@chakra-ui/react";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../ContextApi/AuthContextProvider";
import axios from "axios";

export default function Navbar() {
  const { authDetails } = useContext(AuthContext);
  const handleLogout = async () => {
    try {
      authDetails.logout();
      const res = await axios.get("http://localhost:8080/user/logout", {
        withCredentials: true,
      });
      console.log(res);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Flex
        // border={"1px solid black"}
        p={5}
        background={"teal.100"}
        position={"sticky"}
        top={0}
        boxShadow={
          "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px"
        }
        zIndex={999}
      >
        <Center width={"30%"} display={"flex"} justifyContent={"space-evenly"}>
          <Link to="/">
            <Button colorScheme="teal">Home</Button>
          </Link>
          <Link to="/employee">
            <Button colorScheme="teal">Employee List</Button>
          </Link>
        </Center>
        <Spacer />
        <Center width={"30%"} display={"flex"} justifyContent={"space-evenly"}>
          {authDetails.auth.isAuthenticated ? (
            <>
              <Text>{authDetails.auth.user.name}</Text>
              <Button colorScheme="teal" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link to="/signup">
                <Button colorScheme="teal">Signup</Button>
              </Link>
              <Link to="/login">
                <Button colorScheme="teal">Login</Button>
              </Link>
            </>
          )}
        </Center>
      </Flex>
    </>
  );
}
