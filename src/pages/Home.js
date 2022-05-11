import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import { Logo } from "../images/Netflix";
import {
  ConnectButton,
  Icon,
  TabList,
  Tab,
  Button,
  Modal,
  useNotification,
} from "web3uikit";
import { movies } from "../helpers/library";
import { useState } from "react";
import { useMoralis } from "react-moralis";

const Home = () => {
  const [visible, setVisible] = useState(false);
  const [selectedFilm, setSelectedFilm] = useState();
  const { isAuthenticated } = useMoralis();

  const dispatch = useNotification();
  const handleNewNotification = () => {
    dispatch({
      type: "error",
      message: "Please Connect Your Crypto Wallet",
      title: "Not Authenticated",
      position: "topL",
    });
  };

  return (
    <>
      <div className="logo">
        <Logo />
      </div>
      <div className="connect">
        <Icon fill="#ffffff" size={24} svg="bell"></Icon>
        <ConnectButton />
      </div>
      <div className="topBanner">
        <TabList defaultActiveKey={1} tabStyle="bar">
          <Tab tabKey={1} tabName={"Movies"}>
            <div className="scene">
              <img
                src={movies[0].Scene}
                className="sceneImg"
                alt="sceneImg"
              ></img>
              <img
                className="sceneLogo"
                src={movies[0].Logo}
                alt="sceneLogo"
              ></img>
              <p className="sceneDesc">{movies[0].Description}</p>
              <div className="playButton">
                <Button
                  icon="chevronRightX2"
                  text="Play"
                  theme="secondary"
                  type="button"
                />
                <Button
                  icon="plus"
                  text="Add to myList"
                  theme="translucent"
                  type="button"
                  onClick={() => console.log(isAuthenticated)}
                />
              </div>
            </div>
            <div className="title">Movies</div>
            <div className="thumbs">
              {movies &&
                movies.map((e) => {
                  return (
                    <img
                      src={e.Thumbnail}
                      className="thumbnail"
                      onClick={() => {
                        setSelectedFilm(e);
                        setVisible(true);
                      }}
                      alt="thumbnail"
                    ></img>
                  );
                })}
            </div>
          </Tab>
          <Tab tabKey={2} tabName={"Series"} isDisabled={true}></Tab>
          <Tab tabKey={3} tabName={"MyList"}></Tab>
        </TabList>
        {selectedFilm && (
          <div className="modal">
            <Modal
              onCloseButtonPressed={() => setVisible(false)}
              isVisible={visible}
              hasFooter={false}
              width="1000px"
            >
              <div className="modalContent">
                <img
                  src={selectedFilm.Scene}
                  className="modalImg"
                  alt="modalImg"
                ></img>
                <img
                  className="modalLogo"
                  src={selectedFilm.Logo}
                  alt="modalLogo"
                ></img>
                <div className="modalPlayButton">
                  {isAuthenticated ? (
                    <>
                      <Link to="/player" state={selectedFilm.Movie}>
                        <Button
                          icon="chevronRightX2"
                          text="Play"
                          theme="secondary"
                          type="button"
                        />
                      </Link>
                      <Button
                        icon="plus"
                        text="Add to myList"
                        theme="translucent"
                        type="button"
                      />
                    </>
                  ) : (
                    <>
                      <Button
                        icon="chevronRightX2"
                        text="Play"
                        theme="secondary"
                        type="button"
                        onClick={handleNewNotification}
                      />
                      <Button
                        icon="plus"
                        text="Add to myList"
                        theme="translucent"
                        type="button"
                        onClick={handleNewNotification}
                      ></Button>
                    </>
                  )}
                </div>
                <div className="movieInfo">
                  <div className="description">
                    <div className="details">
                      <span>{selectedFilm.Year}</span>
                      <span>{selectedFilm.Duration}</span>
                    </div>
                    {selectedFilm.Description}
                  </div>
                  <div className="detailedInfo">
                    Genre: <span className="deets">{selectedFilm.Genre}</span>
                    <br />
                    Actors: <span className="deets">{selectedFilm.Actors}</span>
                  </div>
                </div>
              </div>
            </Modal>
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
