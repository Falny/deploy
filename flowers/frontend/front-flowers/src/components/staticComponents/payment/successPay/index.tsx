
import "./style.scss";

import PinkSigna from "../../../../assets/common/rose_signature.png";

export const SuccessPay = () => {
  return (
    <>
      <div className="success-pay">
        <div className="success-pay_back">
          <div className="container">
            <h3 className="title">Оплата прошла</h3>
            <div className="success-pay_container">
              <div className="sp_title">
                <span className="sp_pink-stick"></span>
                <h3 className="title">успешно!</h3>
              </div>
              <div className="sp_block">
                <div className="sp_info">
                  <p className="sp_number-order">
                    Ваш номер заказа – 395808599
                  </p>
                  <p className="sp-thanks">
                    Спасибо за заказ!
                    <br />
                    Вы получите уведомление о статусе вашего заказа
                  </p>
                </div>
                <a href="/" className="sp_to-main">
                  на главную
                </a>
                <img
                  src={PinkSigna}
                  alt="signature"
                  className="sp_rose-signa"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="light-pink sp_pink-top"></div>
        <div className="mini-light-green sp_green-top"></div>
        <div className="light-pink sp_pink-bottom"></div>
        <div className="light-green sp_green-bottom"></div>
      </div>
    </>
  );
};
