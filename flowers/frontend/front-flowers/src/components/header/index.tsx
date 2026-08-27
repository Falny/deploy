import React from "react";
import "./style.scss";

import Logo from "../../assets/header/logo.svg";
import Search from "../../assets/header/search-icon.svg";
import Call from "../../assets/header/call.svg";
import Cart from "../../assets/common/cart.svg";

import { NavLink } from "react-router-dom";
import { Context } from "../../App";
import { resultLength } from "../../hook/resultCart";

import { SearchHook } from "../../hook/headerHook/searchHook";

import { MenuToggle } from "./menuToggle";

const nav = [
  {
    name: "каталог",
    path: "/catalog",
  },
  {
    name: "доставка и оплата",
    path: "/delivery-and-pay",
  },
  {
    name: "о нас",
    path: "/about",
  },
  {
    name: "контакты",
    path: "/contact",
  },
  {
    name: "FAQ",
    path: "/faq",
  },
];
const classNav = ({ isActive }: { isActive: boolean }) =>
  isActive ? "isActive" : "notActive";

export const Header: React.FC = () => {
  const { openCart, setOpenCart } = React.useContext(Context);
  const { lenght } = resultLength();
  const { onChangeInput, value, isHeader, isNotHeader } = SearchHook();

  return (
    <>
      <div
        className={`${isHeader ? "header" : ""} ${
          !isNotHeader ? "header_black-back" : ""
        }`}
      >
        <MenuToggle logo={Logo} nav={nav} search={Search} classNav={classNav} />
        <div className="container">
          <div className="header-block">
            <div className="header-left">
              <NavLink to="/">
                <img src={Logo} className="header-logo"></img>
              </NavLink>
              <ul className="header-list">
                {nav.map((elem, index) => (
                  <li key={index} className="h-list_item">
                    <NavLink to={`${elem.path}`} className={classNav}>
                      {elem.name}
                    </NavLink>
                  </li>
                ))}
              </ul>
              <div className="header-search">
                <img src={Search} alt="" className="h-search-img" />
                <input
                  type="text"
                  value={value}
                  onChange={(e) => onChangeInput(e)}
                  className="h-search"
                  placeholder="ПОИСК"
                />
              </div>
            </div>
            <div
              className={isHeader ? "header-right" : "header-right-inactive"}
            >
              <div className="header-contact">
                <img src={Call} alt="" className="header-img" />
                <p className="header-phone">+375 (29) 113-69-69</p>
              </div>
              <div
                className="header-cart"
                onClick={() => setOpenCart(!openCart)}
              >
                <span className="header-count">{lenght}</span>
                <img src={Cart} alt="" className="header_img-cart" />
              </div>
            </div>
          </div>
          <div
            className={
              isNotHeader
                ? "header-title-show-adaptive"
                : "header-title-show-adaptive-not-in-home"
            }
          >
            <p className="header-title-one">Lower</p>
            <p className="header-title-two">flower</p>
          </div>
          <div
            className="header-adaptive-show-cart header-cart"
            onClick={() => setOpenCart(!openCart)}
          >
            <span className="header-count">{lenght}</span>
            <img src={Cart} alt="" className="header_img-cart" />
          </div>
        </div>
      </div>
    </>
  );
};
