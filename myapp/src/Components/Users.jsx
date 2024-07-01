import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBRow,
  MDBCol,
  MDBContainer,
  MDBBtn,
} from "mdb-react-ui-kit";

const Users = () => {
  const [data, setData] = useState([]);
  const [value, setValue] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    console.log("Search Value:", value); // Debugging line
    try {
      let res = await axios.get(`http://localhost:8080/users?q=${value}`);
      let axiosData = res.data;
      setData(axiosData);
      setValue("");
      console.log("Search Result:", axiosData); // Debugging line
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleReset = () => {
    getDataFromApi();
  };

  const getDataFromApi = async () => {
    try {
      let res = await axios.get("http://localhost:8080/users");
      let axiosData = res.data;
      setData(axiosData);
      console.log("Initial Data:", axiosData); // Debugging line
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getDataFromApi();
  }, []);

  return (
    <MDBContainer>
      <form
        action=""
        style={{
          margin: "auto",
          padding: "15px",
          maxWidth: "400px",
          alignContent: "center",
        }}
        className="d-flex input-group w-auto"
        onSubmit={handleSearch}
      >
        <input
          type="text"
          className="form-control"
          placeholder="Search Name ..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <MDBBtn type="submit" color="dark">
          Search
        </MDBBtn>
        <MDBBtn className="mx-2" color="info" onClick={handleReset}>
          Reset
        </MDBBtn>
      </form>
      <div style={{ marginTop: "100px" }}>
        <h2 className="text-center">
          Search, Filter, Sort and Pagination using JSON Fake API
        </h2>
        <MDBRow>
          <MDBCol size="12">
            <MDBTable>
              <MDBTableHead dark>
                <tr>
                  <th scope="col">No.</th>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Phone</th>
                  <th scope="col">Address</th>
                  <th scope="col">Status</th>
                </tr>
              </MDBTableHead>
              {data.length === 0 ? (
                <MDBTableBody className="align-center mb-0">
                  <tr>
                    <td colSpan={8} className="text-center mb-0">
                      No Data Found
                    </td>
                  </tr>
                </MDBTableBody>
              ) : (
                data.map((user, index) => (
                  <MDBTableBody key={index}>
                    <tr>
                      <th scope="row">{index + 1}</th>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.phone}</td>
                      <td>{user.address}</td>
                      <td>{user.status}</td>
                    </tr>
                  </MDBTableBody>
                ))
              )}
            </MDBTable>
          </MDBCol>
        </MDBRow>
      </div>
    </MDBContainer>
  );
};

export default Users;
