import { LOGO_URL } from "../utils/constants";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const [loginState, setLoginState] = useState("login");

  const cartItems = useSelector((store) => store.cart.items);

  return (
    <div className="flex justify-between items-center bg-gray-800 p-4">
      <div className="logo-container">
        <img className="w-40" src={LOGO_URL} alt="Logo" />
      </div>
      <div className="flex items-center">
        <ul className="flex p-4 m-4">
          <li className="px-4">
            <Link to="/" className="text-white hover:text-gray-300">
              Home
            </Link>
          </li>
          <li className="px-4">
            <Link to="/about" className="text-white hover:text-gray-300">
              About
            </Link>
          </li>
          <li className="px-4">
            <Link to="/contact" className="text-white hover:text-gray-300">
              Contact Us
            </Link>
          </li>
          <li className="px-4 text-white hover:text-gray-300">
            <Link to="/cart" className="text-white hover:text-gray-300">
              Cart - ({cartItems?.length} items){" "}
            </Link>
          </li>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded"
            onClick={() =>
              loginState === "login"
                ? setLoginState("logout")
                : setLoginState("login")
            }
          >
            {loginState}
          </button>
        </ul>
      </div>
    </div>
  );
};

export default Header;
