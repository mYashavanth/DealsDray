import { Heading } from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../ContextApi/AuthContextProvider";
import { Navigate } from "react-router-dom";
import axios from "axios";

export default function Employee() {
  const [queryData, setQueryData] = useState({
    search: "",
    sort: "",
    order: "",
  });
  const { authDetails, setEmployeesData, EmployeesData } =
    useContext(AuthContext);

  useEffect(() => {
    fetchData();
  }, [queryData]);

  async function fetchData() {
    let querys = "";

    if (
      queryData.search !== "" &&
      queryData.sort !== "" &&
      queryData.order !== ""
    ) {
      // Search, Sort, and Order
      querys = `search=${queryData.search}&sort=${queryData.sort}&order=${queryData.order}`;
    } else if (
      queryData.search !== "" &&
      queryData.sort === "" &&
      queryData.order === ""
    ) {
      // Search Only
      querys = `search=${queryData.search}`;
    } else if (queryData.sort !== "" && queryData.order !== "") {
      // Sort and Order
      querys = `sort=${queryData.sort}&order=${queryData.order}`;
    } else if (queryData.sort !== "") {
      // Sort Only
      querys = `sort=${queryData.sort}`;
    } else if (queryData.order !== "") {
      // Order Only
      querys = `order=${queryData.order}`;
    }

    try {
      const response = await axios.post(
        `http://localhost:8080/employees?${querys}`,{},
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log(response.data.employees);
      // if (response.status === 200) {
      //   setEmployeesData(response.data.employees);
      // }
    } catch (error) {
      console.log({ error });
    }
  }

  if (!authDetails.auth.isAuthenticated) {
    return <Navigate to="/login" />;
  }
  return (
    <>
      <Heading>Employee</Heading>
    </>
  );
}
