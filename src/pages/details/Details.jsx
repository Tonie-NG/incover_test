import { Spin } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./details.css";

const Details = () => {
  const { id } = useParams();
  const dummy = []; //used as the image array.
  const [error, setError] = useState(false);
  const [isPending, setIspending] = useState(false);
  const [data, setData] = useState([]);
  const [images, setImages] = useState([]);

  const itemdetails = async () => {
    setIspending(true);
    try {
      const response = await axios.get(
        `https://apistaging.boiibonline.ng/api/VehiclePremiumPolicyHolder/GetRegVehiclePolicyDetailsById?Id=${id}`
      );
      setData(response.data.RegisteredVehicleInfoModel);
      dummy.push(
        response.data.RegisteredVehicleInfoModel[0].BackViewUrl,
        response.data.RegisteredVehicleInfoModel[0].FrontViewUrl
      );
      setImages(dummy);

      setIspending(false);
    } catch (error) {
      setError(true);
      setIspending(false);
      console.error("Error - " + error);
    }
  };

  useEffect(() => {
    itemdetails(id);
  }, [id]);
  return (
    <main className="details__container">
      <div className="wrapper">
        {isPending ? (
          <div className="loader">
            <Spin />
          </div>
        ) : error ? (
          <p>Error</p>
        ) : (
          <>
            <div className="left">
              <h1>Vehicle Information</h1>
              <span>Certificate Number : {data[0]?.CertificateNumber}</span>
              <span>Chasis Number: {data[0]?.ChassisNo}</span>
              <span>Expiry Date: {data[0]?.DateExpired}</span>
              <span>Registration Date: {data[0]?.DateRegistered}</span>
              <span>Vehicle Color: {data[0]?.VehicleColour}</span>
              <span>Vehicle Type: {data[0]?.VehicleType}</span>
              <span>Vehicle Make: {data[0]?.VehicleMakeName}</span>
              <span>Vehicle Model: {data[0]?.VehicleModelName}</span>
            </div>
            <div className="right">
              <div className="image">
                <img src={`data:image/jpeg;base64,${images[0]}`} alt="" />
                <span>Back View</span>
              </div>
              <div className="image">
                <img src={`data:image/jpeg;base64,${images[1]}`} alt="" />
                <span>Front View</span>
              </div>
            </div>
          </>
        )}
      </div>
    </main>
  );
};

export default Details;
