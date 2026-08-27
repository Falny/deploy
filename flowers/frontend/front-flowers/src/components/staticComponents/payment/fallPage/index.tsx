import "./style.scss";

import SignaBlue from '../../../../assets/payment/signa-blue.svg'

export const FallPage = () => {
  return (
    <>
      <div className="fallpage">
        <div className="fallpage-container">
          <div className="fallpage-numbers">
            <div className="fp-common-num fp_one">4</div>
            <div className="fp-common-num fp_two">4</div>
            <div className="fp-common-num fp_zero">0</div>
            <img src={SignaBlue} alt="" className="fallpage-signa" />
          </div>
          <div className="fallpage-text">
            <p className="fp_text">Ошибка 404</p>
            <p className="fp_not-page">Упс...Такой страницы нет</p>
            <a href="" className="fp_to-main">
              на главную
            </a>
          </div>
              </div>
              <div className="mini-light-blue common fp-light-blue-top"></div>
              <div className="light-blue common fp-light-blue-bottom-left"></div>
              <div className="light-blue common fp-light-blue-bottom-right"></div>
      </div>
    </>
  );
};
