import { Center, Heading } from "@chakra-ui/react";
import React, { useContext } from "react";
import { AuthContext } from "../../ContextApi/AuthContextProvider";
import { Navigate } from "react-router-dom";

export default function Home() {
  const { authDetails } = useContext(AuthContext);
  if (!authDetails.auth.isAuthenticated) {
    return <Navigate to="/login" />;
  }
  return (
    <>
      <Center h={"50vh"}>
        <Heading>Welcome Admin Panel</Heading>
      </Center>
    </>
  );
}
