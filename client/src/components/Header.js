import React from "react";
import { useState, useContext } from "react";
import Headerbuttons from "./Headerbuttons";
import OutsideClickHandler from "react-outside-click-handler";
import AuthModalContext from "../context/AuthModalContext";
import ModalContext from "../context/ModalContext";
import { CiUser } from "react-icons/ci";
import { BsBell } from "react-icons/bs";
import { BsChatDots } from "react-icons/bs";
import { HiOutlinePlus } from "react-icons/hi";
import logo from "../images/logo.png";
import { CiSearch } from "react-icons/ci";
import { BsChevronDown } from "react-icons/bs";
import { SlLogin } from "react-icons/sl";
import { SlLogout } from "react-icons/sl";
import UserContext from "../context/UserContext";
import avatar from "../images/IMG_9146.jpg";
import { Link } from "react-router-dom";
import axios from "axios"


const Header = () => {
  const [userDropDownVisibilityClass, setUserDropDownVisibilityClass] =
    useState("hidden");
  const { modalVisibility, setModalVisibility } = useContext(AuthModalContext);
  const { modalType, setModalType } = useContext(ModalContext);
  const { user, setUser } = useContext(UserContext);




  const handleLogin = () => {
    setModalVisibility(true);
    setModalType("login");
  };

  const handleSignUp = () => {
    setModalVisibility(true);
    setModalType("register");
  };

  const toggleDropDown = () => {
    if (userDropDownVisibilityClass === "hidden") {
      setUserDropDownVisibilityClass("show");
    } else {
      setUserDropDownVisibilityClass("hidden");
    }
  };



      const logout = async () => {
        const response = await axios.get(
          // "https://redditt-api.onrender.com/logout",
          "http://localhost:4000/logout",
          {
            withCredentials: true,
          }
        );

        setUser({});
      };
    
      
    

  return (
    <header className="header">
      <div className="sub-header">
        <Link to="/">
        <img className="logo" src={logo} alt="" />
        </Link>
        <form className="form" action="">
          <CiSearch className="search-icon" />

          <input
            className="search-box"
            type="text"
            placeholder="Search Reddit"
          />
        </form>
        {user.username && (
          <>
            <button className="icon-btn">
              <BsBell className="icon" />
            </button>
            <button className="icon-btn">
              <BsChatDots className="icon" />
            </button>
            <button className="icon-btn">
              <HiOutlinePlus className="icon" />
            </button>
          </>
        )}
        {!user.username && (
          <div className="login-div">
            <Headerbuttons onClick={handleLogin}>Log In </Headerbuttons>
            <Headerbuttons onClick={handleSignUp}>Sign Up </Headerbuttons>
          </div>
        )}

        <OutsideClickHandler
          onOutsideClick={() => setUserDropDownVisibilityClass("hidden")}
        >
          {!user.username && (
            <button className="avatar-btn" onClick={toggleDropDown}>
              <>
                <CiUser className="icon default-icon" />
                <BsChevronDown className="default-chevron" />
              </>
            </button>
          )}

          {user.username && (
            <button className="avatar-btn" onClick={toggleDropDown}>
              <img src={avatar} alt="" className="avatar" />
              <BsChevronDown className="chevron" />
            </button>
          )}
          {!user.username && (
            <div
              onClick={() => setModalVisibility(true)}
              className={
                userDropDownVisibilityClass === "hidden"
                  ? "hide-box"
                  : " show-box"
              }
            >
              <button href="" className="btn link-box">
                <SlLogin className=" login-icon" />
                Log In / Sign UP
              </button>
            </div>
          )}
          {user.username && (
            <div
              className={
                userDropDownVisibilityClass === "hidden"
                  ? "hide-box"
                  : " show-box"
              }
            >
              <p>Welcome, {user.username}</p>
              <button onClick={logout} href="" className="btn link-box">
                <SlLogout className=" login-icon" />
                Logout
              </button>
            </div>
          )}
        </OutsideClickHandler>
      </div>
    </header>
  );
};

export default Header;
