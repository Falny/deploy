import './style.scss'

export const FallPay = () => {
  return (
    <>
      <div className="fallpay">
        <div className="fallpay_back-img">
          <div className="container">
            <h3 className="title">Ошибка</h3>
            <div className="fallpay-container">
              <h3 className="title">платежа</h3>
              <div className="fp-text">
                <div className="fp_error">Произошла ошибка....</div>
                <div className="fp_again-pay">Попробуйте оплатить еще раз!</div>
              </div>
              <div className="fp_link">
                <button className="fp-btn">Оплатить еще раз</button>
                <a href="#" className="fp_to-main">
                  Вернуться на главную
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="mini-light-pink light-pink-top"></div>
        <div className="light-pink light-pink-bottom_left"></div>
        <div className="light-pink light-pink-bottom_right"></div>
      </div>
    </>
  );
}
