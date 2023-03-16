import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import GoogleMapReact from "google-map-react";
import Navbar from "../../components/Navbar/Navbar";
import "./contact.css";
import Chat from "../../components/Chat/Chat";
import { AiOutlinePhone } from "react-icons/ai";
import { AiOutlineMail } from "react-icons/ai";
import { GiPositionMarker } from "react-icons/gi";
import Aos from "aos";
import "aos/dist/aos.css";

const socket = io.connect("http://localhost:3001");

const Contact = () => {
  useEffect(() => {
    // Effets d'affichage
    Aos.init({ duration: 2000 });
  }, []);

  const [username, setUsername] = useState(
    sessionStorage.getItem("role") === "admin" ? "TourGo" : ""
  );
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };

  return (
    <>
      <Navbar navbarTransparente={false} />
      <div className="contact-app">
        <div className="secContainer container">
          <h1 className="titre">Contactez-nous</h1>
          <div className="contactContainer grid">
            <div className="contactInfo">
              <h2 data-aos="fade-right">Informations de contact</h2>
              <div className="contactInfo2 flex">
                <div className="contactInfoText grid">
                  <div className="telephone flex">
                    <AiOutlinePhone className="icon" />
                    <p>01 23 45 67 89</p>
                  </div>
                  <div className="email flex">
                    <AiOutlineMail className="icon" />
                    <p>tourgo.contact@gmail.com</p>
                  </div>
                  <div className="adresse flex">
                    <GiPositionMarker className="icon" />
                    <p>6 Av. Victor le Gorgeu, 29200 Brest</p>
                  </div>
                </div>
                <div className="contactInfoMaps">
                  <GoogleMapReact
                    bootstrapURLKeys={{
                      key: "AIzaSyBGg-Up8IysYoMEZM9k_yEM1ipBwRM90s8",
                    }}
                    defaultCenter={{ lat: 48.398337, lng: -4.4995195 }}
                    defaultZoom={13}
                  ></GoogleMapReact>
                </div>
              </div>
            </div>
            <div className="contactForm">
              <h2 data-aos="fade-left">Envoyez-nous un message</h2>
              {!showChat ? (
                <div className="joinChatContainer grid">
                  <input
                    className="input"
                    type="email"
                    value={username}
                    placeholder="votre@email.com"
                    onChange={(event) => {
                      setUsername(event.target.value);
                    }}
                  />
                  <input
                    className="input"
                    type="text"
                    placeholder="ID de la discussion"
                    onChange={(event) => {
                      setRoom(event.target.value);
                    }}
                  />
                  <button
                    className="btn btnSeMettreEnRelation"
                    onClick={joinRoom}
                  >
                    Se mettre en relation
                  </button>
                </div>
              ) : (
                <Chat socket={socket} username={username} room={room} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
