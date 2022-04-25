import { FC, useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import axios from "axios";

const MainDiv = styled("div")(({ theme }) => ({
  width: "100%",
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  justifyContent: "center",
}));

const Showrooms = styled("div")(({ theme }) => ({
  width: "400px",
  height: "fit-content",
  border: "solid 2px black",
  backgroundColor: "#fff",
  borderRadius: "5px",
  color: "#000",
  alignItems: "left",
  justifyContent: "left",
  display: "flex",
  flexDirection: "column",
  margin: "15px",
}));

const ShowroomsImg = styled("img")(({ theme }) => ({
  height: "250px",
  width: "100%",
  borderTopRadius: "9px",
}));

const ShowroomsInfo = styled("div")(({ theme }) => ({
  color: "#000",
  fontSize: "15px",
  textAlign: "left",
  margin: "5px 10px",
}));

const ShowroomsVerify = styled("div")(({ theme }) => ({
  width: "90%",
  fontSize: "15px",
  backgroundColor: "#000",
  color: "#fff",
  padding: "10px",
  borderRadius: "7px",
  margin: "7px auto",
  cursor: "pointer",
}));

const Index: FC = () => {
  const [showrooms, setShowrooms] = useState<any>([]);
  useEffect(() => {
    getShowrooms();
  }, []);

  const getShowrooms = async () => {
    let showrooms = await axios.get(
      "https://carwaan.herokuapp.com/car/getallshowroomsnotverified"
    );
    console.log(showrooms);
    setShowrooms([...showrooms.data.success]);
  };

  const verifyShowroom = async (sEmail) => {
    let pass = await prompt("Enter Password");
    let res = await axios.post(
      "https://carwaan.herokuapp.com/auth/verifyshowroom",
      { email: sEmail, pass }
    );
    if (res?.data === "verification successful.") {
      alert("Showroom Verified");
      getShowrooms();
    } else {
      alert("Wrong password or some error occured.");
    }
  };

  return (
    <>
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
      <MainDiv>
        {showrooms.map((e, i) => {
          return (
            <Showrooms key={i}>
              <ShowroomsImg src={e.img} />
              <ShowroomsInfo>Name : {e.name}</ShowroomsInfo>
              <ShowroomsInfo>Email : {e.email}</ShowroomsInfo>
              <ShowroomsInfo>CNIC : {e.cnic}</ShowroomsInfo>
              <ShowroomsInfo>Phone : {e.phone}</ShowroomsInfo>
              <ShowroomsInfo>Address : {e.location}</ShowroomsInfo>
              <ShowroomsVerify
                onClick={() => {
                  verifyShowroom(e.email);
                }}
              >
                Verify
              </ShowroomsVerify>
            </Showrooms>
          );
        })}
      </MainDiv>
    </>
  );
};

export default Index;
