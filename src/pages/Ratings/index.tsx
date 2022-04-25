import { FC, useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";
import axios from "axios";

const MainDiv = styled(Box)(({ theme }) => ({
  width: "100%",
}));

const Index: FC = () => {
  const [bookingId, setBookingId] = useState("");
  const [rating, setRating] = useState("");
  const [status, setStatus] = useState(false);

  useEffect(() => {
    setBookingId(window.location.href.split("/")[4]);
  }, []);

  const rate = async () => {
    if (
      rating !== "" &&
      !isNaN(parseInt(rating)) &&
      parseInt(rating) <= 5 &&
      parseInt(rating) >= 0 &&
      bookingId !== ""
    ) {
      let res = await axios.post(
        "https://carwaan.herokuapp.com/car/ratebooking",
        {
          bookingId,
          rating,
        }
      );
      if (res?.data === "Ratings submitted.") {
        setStatus(true);
      } else {
        alert("Some Error Occured try Again.");
      }
    } else {
      alert("Enter valid rating.");
    }
  };

  return (
    <MainDiv>
      <div
        style={{
          color: "#000",
          fontSize: "40px",
          fontWeight: "bold",
          margin: "30px",
        }}
      >
        CARWAAN
      </div>
      {!status ? (
        <div
          style={{
            width: "fit-content",
            border: "solid 1px #000",
            borderRadius: "5px",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <div
            style={{
              color: "#000",
              fontSize: "25px",
              fontWeight: "bold",
              margin: "10px",
            }}
          >
            Rate Booking.
          </div>
          <input
            type={"number"}
            max="5"
            min="0"
            placeholder={"Rate the booking out of 5"}
            style={{
              width: "350px",
              border: "solid 1px #000",
              borderRadius: "5px",
              margin: "10px",
              padding: "9px",
            }}
            onChange={(e) => {
              setRating(e.target.value);
            }}
          ></input>
          <div
            style={{
              width: "350px",
              borderRadius: "5px",
              margin: "10px",
              padding: "9px",
              backgroundColor: "#000",
              color: "#fff",
              cursor: "pointer",
            }}
            onClick={() => {
              rate();
            }}
          >
            Submit
          </div>
        </div>
      ) : (
        <div
          style={{
            color: "#000",
            fontSize: "25px",
            fontWeight: "bold",
            margin: "10px",
          }}
        >
          Rating Submitted, Thank you.
        </div>
      )}
    </MainDiv>
  );
};

export default Index;
