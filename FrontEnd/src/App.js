import { AiFillCloseCircle } from "react-icons/ai";

import { CgProfile } from "react-icons/cg";
import { FaMapMarked } from "react-icons/fa";
import "./App.css";
import * as React from "react";
import Map, { Marker, Popup } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect, useState } from "react";
import {
  ControlCameraOutlined,
  Room,
  Star,
  StarBorder,
  SystemUpdate,
} from "@material-ui/icons";
import axios from "axios";
import { format } from "timeago.js";
import Register from "./components/Register";
import Login from "./components/Login";
import styled from "styled-components";
import Modal from "react-modal";

const Navbar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  position: sticky;
  background-color: #2b65ec;
`;

const LeftNav = styled.div`
  display: flex;
  justify-content: space-around;
`;

const HowToUse = styled.button`
  padding: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin-left: 5px;

  border-radius: 10px;
  /* background-color: red; */
`;

const MiddleNav = styled.div`
  display: flex;
`;

const H4 = styled.h4`
  margin-top: 7px;
  margin-bottom: 7px;
`;
const H3 = styled.h4`
  margin-top: 7px;
  margin-bottom: 7px;
`;
const H2 = styled.h4`
  margin-top: 7px;
  margin-bottom: 7px;
`;

const RightNav = styled.div`
  display: flex;
  justify-content: space-around;
`;

const Profile = styled.button`
  padding: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin-left: 5px;

  border-radius: 10px;
  /* background-color: red; */
  /* this section is created to display the user profile like what is his name and other things
 and also for the places created by that user


*/
`;

const Label = styled.label`
  color: black;
`;

const Logout = styled.div`
  padding: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin-left: 5px;

  border-radius: 10px;
  background-color: red;
`;

const PinDetails = styled.button`
  /* this pinDetails show the info about the pins that are created by different users */
  padding: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin-left: 5px;

  border-radius: 10px;
  /* background-color: ; */
`;

const CloseButtonFlex = styled.div`
  display: flex;
  flex-direction: row-reverse;
`;

const CloseButton = styled.div`
  padding: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border: 2px solid black;

  border-radius: 10px;
  /* background-color: red; */
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  width: 250px;
  border: 2px solid black;
  padding: 5px;
  /* background-color: #63bab7; */
`;

const PinCardTop = styled.div`
  display: flex;
  flex: 7;
  flex-direction: column;
`;

const PinsInfoHeading = styled.h1`
  margin-left: 20px;
`;

const PinsInfoContainer = styled.div`
  display: grid;

  grid-gap: 25px;
  margin-left: 20px;
  margin-right: 20px;
  z-index: 1;
  margin-top: 10px;

  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-auto-rows: 330px;
`;

const PinCard = styled.div`
  display: flex;
  background-color: white;
  border: black solid 2px;
  flex-direction: column;

  padding: 10px;
  border-radius: 10px;
`;

const PinCardHeader = styled.div`
  display: flex;
  background-color: black;
  height: 70px;
  color: white;
  flex-direction: center;
  justify-content: center;
  border-radius: 10px;
`;
const PinCardFooter = styled.div`
  display: flex;
  flex: 1;
  margin-top: 0px;
`;

const PinDiv = styled.div`
  display: flex;
  margin-top: 10px;
`;

const ProfileModalFlex = styled.div`
  display: flex;
  flex-direction: row;
  /* background-color: green; */

  @media only screen and (max-width: 600px) {
    flex-direction: column;
    background-color: red;
  }
`;

const ProfileModalProfile = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 10px;
  /* background-color: yellow; */
`;

const TextField = styled.input`
  height: 30px;
  border: 2px solid black;
  margin-bottom: 5px;
  border-radius: 5px;
`;
const ProfileFormSubmitButton = styled.button`
  width: 100px;
  height: 40px;
  background-color: black;
  color: white;
  border: 2px solid black;
  border-radius: 5px;
  cursor: pointer;
`;

const ProfileModalCreatedPins = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 10px;
`;

function App() {
  const myStorage = window.localStorage;
  const [currentUser, setCurrentUser] = useState(myStorage.getItem("user"));
  //   myStorage.getItem("user")
  // );

  // const [loginDialog, setLoginDialog] = useState(false);

  const [pins, setPins] = useState([]);
  const [currentPlaceId, setCurrentPlaceId] = useState(null);
  const [newPlace, setNewPlace] = useState(null);
  const [title, setTitle] = useState(null);
  const [desc, setDesc] = useState(null);
  const [rating, setRating] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = React.useState(false);

  const [showUsage, setShowUsage] = useState(true);
  const [check, setCheck] = useState(false);
  const [subForm, setSubForm] = useState("");

  const [viewport, setViewport] = useState({
    latitude: 47.040182,
    longitude: 17.071727,
    zoom: 4,
  });

  // console.log(star);

  const [modalIsOpen, setIsOpen] = React.useState(false);

  const [modalHow, setModalHow] = useState(false);

  const [modalPins, setModalPins] = useState(false);

  const [modalProf, setModalProf] = useState(false);

  const [modalProfile, setModalProfile] = useState({
    firstname: "",
    lastname: "",
    mobile: 0,
    country: "",
    address: "",
  });
  // console.log("Hello",modalPins);

  const [profileModalPins, setProfileModalPins] = useState([]);

  function openModal() {
    setModalHow(true);
  }

  function closeModal() {
    setModalHow(false);
    setModalPins(false);
    setModalProf(false);
  }

  const profileFn = async () => {

    setModalProfile({
      firstname: "",
      lastname: "",
      mobile: 0,
      country: "",
      address: "",
    });



    try {
      const res = await axios.get(
        `http://localhost:8800/api/profile/${currentUser}`
      );

      console.log(res.data[0]);
      console.log(currentUser);
      if (res.data[0]) {
        console.log("check if the user has profile or not");
        setModalProfile(res.data[0]);
        setCheck(true);
        
      }
      else {
        setCheck(false);
        
      }
     
    } catch (e) {
      console.log(e);
    }
  };

  const ProfilePins = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8800/api/pins/${currentUser}`
      );
      // console.log(res.data);
      setProfileModalPins(res.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const getPins = async () => {
      try {
        const res = await axios.get("http://localhost:8800/api/pins");
        setPins(res.data);
        // console.log(res.data, "res");
      } catch (err) {
        console.log(err);
      }
    };
    getPins();
  }, []);

  const handleMarkerClick = (id, lat, long) => {
    setCurrentPlaceId(id);
    // setViewport({...viewport, latitude:lat,longitude:long})
  };

  const handleAddClick = (e) => {
    // console.log(e.lngLat.lng, "lat lng");
    // const longitude = e.lngLat.lng;

    setNewPlace({
      lat: e.lngLat.lat,
      long: e.lngLat.lng,
    });
  };

  const handleLogout = () => {
    myStorage.removeItem("user");
    setCurrentUser(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("clicked the submit button");
    const newPin = {
      username: currentUser,
      title,
      desc,
      rating,
      lat: newPlace.lat,
      long: newPlace.long,
    };
    try {
      const res = await axios.post("http://localhost:8800/api/pins", newPin);
      setPins([...pins, res.data]);
      setNewPlace(null);
    } catch (err) {
      console.log(err);
    }
  };

  function onTextFieldChange(e) {
    setModalProfile({ ...modalProfile, [e.target.name]: e.target.value });
  }

  function onFormSubmit(e) {

    e.preventDefault();
    console.log(modalProfile)
    console.log(check);
    modalProfile['username'] = currentUser;
    console.log(modalProfile);
    // console.log(modalProf);

    if (check) {
      console.log("check true")
      axios.put("http://localhost:8800/api/profile", modalProfile);
      setSubForm("You profile had been modified!");
      
      
    }
    else {
      console.log("check false");
      axios.post("http://localhost:8800/api/profile", modalProfile);
      setSubForm("You profile had been created!");
      
    }
    



  }

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <Navbar>
        <LeftNav>
          <HowToUse
            onClick={() => {
              setModalHow(true);
            }}
          >
            How to use?
          </HowToUse>

          <PinDetails
            onClick={() => {
              setModalPins(true);
            }}
          >
            Pins Info
            <FaMapMarked />
          </PinDetails>
        </LeftNav>

        <MiddleNav>
          <H4>TRAVEL MATE</H4>
        </MiddleNav>

        <RightNav>
          {currentUser ? (
            <RightNav>
              <Profile
                onClick={() => {
                  setModalProf(true);
                  
                  profileFn();
                  ProfilePins();
                }}
              >
                Profile <CgProfile />
              </Profile>
              <Logout onClick={handleLogout}>Logout</Logout>
            </RightNav>
          ) : (
            <RightNav>
              <button
                className="button login"
                onClick={() => {
                  setShowLogin(true);
                  setShowRegister(false);
                }}
              >
                Login
              </button>
              <button
                className="button register"
                onClick={() => {
                  setShowRegister(true);
                  setShowLogin(false);
                }}
              >
                Register
              </button>
            </RightNav>
          )}
        </RightNav>
      </Navbar>

      <Map
        mapboxAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
        initialViewState={{
          longitude: 17.071727,
          latitude: 47.040182,
          zoom: 4,
        }}
        style={{ width: "100vw", height: "100vh" }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        onDblClick={handleAddClick}
      >
        {/* console.log(pins); */}
        {pins.map((p) => (
          <>
            <Marker longitude={p.long} latitude={p.lat} anchor="bottom">
              <Room
                style={{
                  fontSize: 7 * viewport.zoom,
                  color: p.username === currentUser ? "tomato" : "slateblue",
                  cursor: "pointer",
                }}
                onClick={() => handleMarkerClick(p._id, p.lat, p.long)}
              />
            </Marker>
            {p._id === currentPlaceId && (
              <Popup
                latitude={p.lat}
                longitude={p.long}
                closeButton={true}
                closeOnClick={false}
                onClose={() => setCurrentPlaceId(null)}
                anchor="left"
              >
                <Card>
                  <label>Place</label>
                  <h4 className="place">{p.title}</h4>
                  <label>Review</label>
                  <p className="desc">{p.desc}</p>
                  <label>Rating</label>
                  <div className="stars">
                    {Array(p.rating).fill(<Star className="star" />)}
                  </div>
                  <label>Information</label>
                  <span className="username">
                    Created by <b>{p.username}</b>
                  </span>
                  <span className="date">Updated {format(p.updatedAt)}</span>
                </Card>
              </Popup>
            )}
          </>
        ))}
        {newPlace && (
          <Popup
            latitude={newPlace.lat}
            longitude={newPlace.long}
            closeButton={true}
            closeOnClick={false}
            onClose={() => setCurrentPlaceId(null)}
            anchor="left"
          >
            <div>
              <form onSubmit={handleSubmit}>
                <label>Title</label>
                <input
                  placeholder="Enter a title"
                  onChange={(e) => setTitle(e.target.value)}
                />
                <label>Review</label>
                <textarea
                  placeholder="Say us something about this place."
                  onChange={(e) => setDesc(e.target.value)}
                />
                <label>Rating</label>
                <select onChange={(e) => setRating(e.target.value)}>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
                <button className="submitButton" type="submit">
                  Add Pin
                </button>
                <H3>{subForm}</H3>
              </form>
            </div>
          </Popup>
        )}
        {/* <button className="info" onClick={handleInfo}>TRAVEL MAP</button> */}
        {/* {(showRegister && loginDialog) ? <Register setShowRegister={setShowRegister} /> : null} */}
        <Modal
          isOpen={modalHow}
          onRequestClose={closeModal}
          contentLabel="Example Modal"
        >
          <CloseButtonFlex>
            <CloseButton onClick={closeModal}>
              Close
              <AiFillCloseCircle size={20} color="red" />
            </CloseButton>
          </CloseButtonFlex>
          <h1>Details about the project</h1>
        </Modal>
        <Modal
          isOpen={modalPins}
          onRequestClose={closeModal}
          contentLabel="Example Modal"
        >
          <CloseButtonFlex>
            <CloseButton onClick={closeModal}>
              Close
              <AiFillCloseCircle size={20} color="red" />
            </CloseButton>
          </CloseButtonFlex>
          <PinsInfoHeading>Pinned Details</PinsInfoHeading>

          <PinsInfoContainer>
            {pins.map((pin) => (
              <PinCard>
                <PinCardTop>
                  <PinCardHeader>
                    <h2> {pin.title}</h2>
                  </PinCardHeader>
                  <PinDiv></PinDiv>
                  <PinDiv>{pin.desc}</PinDiv>

                  <PinDiv> Latitude -> {pin.lat}</PinDiv>
                  <PinDiv>Longitude -> {pin.long}</PinDiv>

                  <PinDiv>
                    {Array(pin.rating).fill(<Star className="star" />)}(
                    {pin.rating})
                  </PinDiv>
                </PinCardTop>

                <PinCardFooter>Review by {pin.username}</PinCardFooter>
              </PinCard>
            ))}
          </PinsInfoContainer>
        </Modal>
        <Modal
          isOpen={modalProf}
          onRequestClose={closeModal}
          contentLabel="Example Modal"
        >
          <CloseButtonFlex>
            <CloseButton onClick={closeModal}>
              Close
              <AiFillCloseCircle size={20} color="red" />
            </CloseButton>
          </CloseButtonFlex>
          <ProfileModalFlex>
            <ProfileModalProfile>
              <H3>Profile details</H3>
              <Label>First Name</Label>

              <TextField
                placeholder="first name"
                name="firstname"
                value={modalProfile.firstname}
                onChange={(e)=>onTextFieldChange(e)}
              />
              <Label>Last Name</Label>
              <TextField
                placeholder="last name"
                name="lastname"
                value={modalProfile.lastname}
                onChange={(e) => onTextFieldChange(e)}
              />
              <Label>Mobile</Label>
              <TextField
                placeholder="mobile"
                name="mobile"
                value={modalProfile.mobile}
                onChange={(e) => onTextFieldChange(e)}
              />
              <Label>Country</Label>
              <TextField
                placeholder="country"
                name="country"
                value={modalProfile.country}
                onChange={(e) => onTextFieldChange(e)}
              />
              <Label>Address</Label>
              <TextField
                placeholder="address"
                name="address"
                value={modalProfile.address}
                onChange={(e) => onTextFieldChange(e)}
              />
              <ProfileFormSubmitButton
                onClick={(e) => {
                  onFormSubmit(e);
                }}
              >
                Update
              </ProfileFormSubmitButton>
            </ProfileModalProfile>
            <ProfileModalCreatedPins>
              <H3>Pins Created By You</H3>

              {profileModalPins.map((pin) => (
                <PinCard>
                  <PinCardTop>
                    <PinCardHeader>
                      <h2> {pin.title}</h2>
                    </PinCardHeader>
                    <PinDiv></PinDiv>
                    <PinDiv>{pin.desc}</PinDiv>

                    <PinDiv> Latitude -> {pin.lat}</PinDiv>
                    <PinDiv>Longitude -> {pin.long}</PinDiv>

                    <PinDiv>
                      {Array(pin.rating).fill(<Star className="star" />)}(
                      {pin.rating})
                    </PinDiv>
                  </PinCardTop>

                  <PinCardFooter>Review by {pin.username}</PinCardFooter>
                </PinCard>
              ))}
            </ProfileModalCreatedPins>
          </ProfileModalFlex>
        </Modal>
        {showRegister && <Register setShowRegister={setShowRegister} />}
        {showLogin && (
          <Login
            setShowLogin={setShowLogin}
            myStorage={myStorage}
            setCurrentUser={setCurrentUser}
          />
        )}
      </Map>
    </div>
  );
}

export default App;
