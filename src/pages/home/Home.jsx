import { Spin } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./home.css";

const Home = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(false);
  const pageSize = 10;

  useEffect(() => {
    fetchPageData(page);
  }, [page]);

  const fetchPageData = async (page) => {
    setIsPending(true);
    try {
      const response = await axios.get(
        `https://apistaging.boiibonline.ng/api/VehiclePremiumPolicyHolder/GetByFirmId?FirmId=a9a4c543-f958-4bd0-8e24-41e1d0a111e0&PageNumber=${page}&PageSize=${pageSize}`
      );
      setData(response.data.Items);
      setTotalPages(response.data.TotalPageCount);

      setIsPending(false);
    } catch (error) {
      setError(true);
      setIsPending(false);
      console.error("Error - " + error);
    }
  };
  return (
    <main>
      {isPending ? (
        <div className="loader">
          <Spin />
        </div>
      ) : error ? (
        <p>An error occured, reload the page to continue</p>
      ) : (
        <div className="wrapper">
          <table>
            <caption>Table to Display Car Data </caption>
            <thead>
              <tr>
                <th>Policy Number</th>
                <th>Name</th>
                <th>Phone No.</th>
                <th>Registration Date</th>
                <th>Details</th>
              </tr>
            </thead>

            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  <td data-cell="policy number">{item.PolicyNumber}</td>
                  <td data-cell="name">{item.Name}</td>
                  <td data-cell="phone no">{item.PhoneNumber}</td>
                  <td data-cell="registration date">{item.DateRegistered}</td>
                  <td data-cell="details">
                    <button onClick={() => navigate(`/${item.Id}`)}>
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="pagination">
            <button
              onClick={() => setPage((prevPage) => prevPage - 1)}
              disabled={page === 1}
            >
              Previous
            </button>
            <button
              onClick={() => setPage((prevPage) => prevPage + 1)}
              disabled={page === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </main>
  );
};

export default Home;
