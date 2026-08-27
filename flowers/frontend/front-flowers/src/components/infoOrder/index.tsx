import React from "react";
import "./style.scss";

import Inst from "../../assets/infoOrder/inst.svg";
import Viber from "../../assets/infoOrder/viber.svg";
import UsuallyCall from "../../assets/infoOrder/usually-call.svg";
import Call from "../../assets/infoOrder/call.svg";
import Cart from "../../assets/common/cart.svg";
import { useLocation } from "react-router-dom";
import { Context } from "../../App";
import { resultLength } from "../../hook/resultCart";
import { Scroll } from "../../hook/scrollToTop";

export const InfoOrder = () => {
  const { openCart, setOpenCart } = React.useContext(Context);
  const { lenght } = resultLength();
  const { scrollToTop } = Scroll();

  const location = useLocation();

  const onClickAddToCart = () => {
    scrollToTop();
    setOpenCart(!openCart);
  };

  return (
    <>
      {/* сделать некоторые плашки сслыками чтоб ссылались на сделать зовное или на отправить сообщение */}
      <div
        className={`${
          location.pathname === "/catalog" ? "catalog-position" : ""
        } info-order io-common `}
      >
        <div className="info-order_order">
          <p className="io-email common-color">zakaz@loverflower.by</p>
          <p className="io-text">
            Доставка 24/7 по договоренности с оператором
          </p>
        </div>
        <div className="info-order_street io-common">
          <p className="io-street common-color">ул. Тимирязева 67</p>
          <p className="io-text">10:00 до 21:00</p>
          <p className="io-text">без выходных</p>
        </div>
        <div className="info-order_networking">
          <img src={Inst} alt="" className="io-inst" />
          <img src={Viber} alt="" className="io-viber" />
          <img src={UsuallyCall} alt="" className="io-usually-call" />
        </div>
        <div className="info-order_tel">
          <p className="io-tel common-color">+375 (29) 113-69-69</p>
          <div className="io-ordering-tel">
            <img src={Call} alt="" className="io-tel-img" />
            <p className="io-call common-color">заказать звонок</p>
          </div>
        </div>
        <div className="info-order-card" onClick={() => onClickAddToCart()}>
          <span className="io-count-goods">{lenght}</span>
          <img src={Cart} alt="" className="io-card" />
        </div>
      </div>
    </>
  );
};
