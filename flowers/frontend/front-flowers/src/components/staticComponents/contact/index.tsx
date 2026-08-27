import "./style.scss";

import RedSigna from "../../../assets/contact/red-signa.svg";
import MapImg from '../../../assets/contact/map.png'
import { Breadcrumbs } from "../../bredcrams";

export const Contact = () => {
  return (
    <>
      <div className="contact">
        <div className="container">
          <Breadcrumbs/>
          <h3 className="title">контакты</h3>
          <ul className="contact-list">
            <li className="contact-item">
              <p className="item-title">время работы</p>
              <p className="item-text">
                с 10:00 до 21:00 <br />
                без выходных
              </p>
            </li>
            <li className="contact-item">
              <p className="item-title">Адрес</p>
              <p className="item-text">
                г. Минск, ул. Тимирязева 67, комн. 112
              </p>
            </li>
            <li className="contact-item">
              <p className="item-title">Телефон</p>
              <p className="item-text">+375 (29) 113-69-69</p>
            </li>
            <li className="contact-item">
              <p className="item-title">E-mail</p>
              <p className="item-text">zakaz@loverflower.by</p>
            </li>
          </ul>
          <div className="contact-block-write">
            <div className="contact-block-title">
              <div className="cb-title">
                <h3 className="title">напишите</h3>
                <h3 className="title cb-title-two">нам</h3>
              </div>
              <div className="c_text">
                <span className="cb_stick-green"></span>
                <p className="cb_text-text">
                  Отправьте ваш вопрос, заказ, предложение или жалобу через
                  форму обратной связи, и наш специалист свяжется с вами в
                  течение 15 минут.
                </p>
              </div>
            </div>
            <div className="c_block-form">
              <form action="" className="c-form">
                <input
                  type="name"
                  className="c-input c-name"
                  placeholder="Ваше имя"
                />
                <input
                  type="email"
                  className="c-input c-email"
                  placeholder="+7 (977) 777-77-77"
                />
                <textarea
                  className="c-input c-comment"
                  placeholder="Ваш комментарий"
                />
                <button className="c-btn">отправить</button>
                <p className="c-policy">
                  Нажимая на кнопку «Отправить», я даю свое согласие на
                  обработку персональных данных, в соответствии с{" "}
                  <a href="#" className="c-policy-link">
                    Политикой конфиденциальности
                  </a>
                </p>
              </form>
              <img src={RedSigna} alt="" className="contact-red-signa" />
            </div>

            <div className="c_ma">
              <div className="c_map-title">Мы на карте</div>
              <img src={MapImg} alt="" className="c_map-img" />
            </div>
          </div>
        </div>
        <div className="mini-light-red c-light-red-left"></div>
        <div className="mini-light-red c-light-red-right"></div>
        <div className="light-red c-light-red-center"></div>
        <div className="mini-light-red c-light-red-bottom-left"></div>
        <div className="mini-light-red c-light-red-bottom-right"></div>
      </div>
    </>
  );
};
