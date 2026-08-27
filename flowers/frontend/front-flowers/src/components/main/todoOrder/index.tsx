import "./style.scss";
import Signatura from "../../../assets/common/signatura.png";

const steps = [
  {
    step: "1 шаг",
    text: "Выберите какие цветы или подарки вы хотите купить",
  },
  {
    step: "2 шаг",
    text: "Оформите заказ, и мы отправим вам подтверждение на электронную почту, а так же менеджер свяжется с вами по телефону или в WhatsApp",
  },
  {
    step: "3 шаг",
    text: "Наши флористы бережно подойдут к созданию букета цветов в самом начале дня или накануне",
  },
  {
    step: "4 шаг",
    text: "Один из наших курьеров или партнёров доставит ваш заказ по указанному адресу. Мы отправим вам сообщение в Whats App как только заказ будет доставлен",
  },
  {
    step: "5 шаг",
    text: "Наслаждайтесь цветами , если вы заказали их для дома или любовью, которой поделились, если вы заказали для друга",
  },
];

export const ToDoOrder = () => {
  return (
    <>
      <div className="todo-order">
        <div className="todo-order_flower-back">
          <div className="container">
            <h3 className="title">Как сделать</h3>
            <h3 className="title to-title">заказ</h3>
            <div className="todo-order-block">
              <ul className="todo-order_list">
                <span className="todo-order_pink"></span>
                {steps.map((obj, index) => (
                  <li className="tr_item" key={index}>
                    <p className="tr_item-title">{obj.step}</p>
                    <p className="tr_item-text">{obj.text}</p>
                  </li>
                ))}
              </ul>
            </div>
            <img src={Signatura} alt="" className="tr-img" />
          </div>
        </div>
      </div>
    </>
  );
};
