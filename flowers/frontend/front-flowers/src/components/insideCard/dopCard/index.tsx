import React from "react";
import "./style.scss";

type CardProps = {
  title: string;
};

const dopOrder = [
  {
    title: "Удобрения для срезанных цветов",
    text: "При указании об этом в пожеланиях к букету, мы приложим пакетик удобрения для вас",
  },
  {
    title: "подпишем открытку",
    text: "В пожеланиях к букету укажите текст, какой хотите разместить и выберите на сайте саму открытку",
  },
  {
    title: "Фото букета перед отправкой",
    text: "В примечании к заказу укажите об этом и мы отправим фото готового букета перед доставкой. В праздничные дни в связи с большой загруженностью такой возможности нет",
  },
  {
    title: "Букет-сюрприз",
    text: "Если хотите, чтобы получатель не знал, что ему вручат а также от кого, то укажите об этом в примечании к заказу",
  },
];

const deliveryInfo = [
  {
    title: "Способы оплаты:",
    text: [
      "БАНКОВСКОЙ КАРТОЙ ПРИ ОФОРМЛЕНИИ ЗАКАЗА ЧЕРЕЗ САЙТ",
      "НАЛИЧНЫМИ ИЛИ БАНКОВСКОЙ КАРТОЙ ПРИ САМОВЫВОЗЕ",
      "НАЛИЧНЫМИ ПРИ ДОСТАВКЕ КУРЬЕРОМ",
      "КРИПТОВАЛЮТОЙ ОНЛАЙН",
    ],
  },
  {
    title: "стоимость доставки:",
    text: [
      "Бесплатно – при заказе на сумму от 90 рублей",
      "10 рублей – при заказе на сумму менее 90 рублей",
      "Возможность, сроки и стоимость доставки за пределы МКАД, доставки в ночное время, праздники оговариваются с менеджером",
      "Так же вы можете забрать ваш заказ самостоятельно по адресу: г. Минск, ул. Тимирязева д. 67, комн. 112 ежедневно с 10.00 до 21.00",
    ],
  },
];

export const DopCard = ({ title }: CardProps) => {
    const [toggle, setToggle] = React.useState(true)

  return (
    <>
      <div className="dop-cart">
        <div className="dop-order-info">
          <div className="block-delivery-title">Дополнительно к заказу:</div>
          <div className="do-info_block">
            {dopOrder.map((el, index) => (
              <div key={index} className="do-info_item">
                <span className="do-info_item-circle"></span>
                <p className="do-info_item-title">{el.title}</p>
                <p className="do-info_item-text">{el.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="form-toogle">
        <div className="block-toggle">
          <div className={`block-toggle_item ${!toggle && "bt-inactive"}`} onClick={()=> setToggle(!toggle)}>
            доставка и оплата
          </div>
          <div className={`block-toggle_item ${toggle && "bt-inactive"}`} onClick={()=> setToggle(!toggle)}>
            отзывы
          </div>
        </div>

        {toggle && (
          <div className="block-toggle-delivery">
            <div className="block-delivery-list">
              {deliveryInfo.map((obj, index) => (
                <ul className="block-delivery-info" key={index}>
                  <p className="block-delivery-title block-delivery-title-position">
                    {obj.title}
                  </p>
                  {obj.text.map((el, index) => (
                    <li key={index} className="block-delivery-item">
                      {el}
                    </li>
                  ))}
                </ul>
              ))}
            </div>
            <div className="block-delivery-info">
              <p className="block-delivery-title block-delivery-title-position">
                Условия доставки:
              </p>
              <p className="block-delivery-text">
                Доставка осуществляется по городу Минску в пределах МКАД{" "}
                <span className="green-text">
                  в любой день с 09.00 до 22.00.
                </span>{" "}
                <br />
                Доставка в ночное время осуществляется по договоренности с
                оператором
              </p>
            </div>
          </div>
        )}
        {!toggle && (
          <div className="block-toggle-freeback">
            <p className="freeback">Отзывов пока нет</p>
            <div className="freeback-info">
              <p className="fi-title">
                Будьте первым, кто оставил отзыв на “{title}”
              </p>
              <p className="fi-desc">
                Ваш адрес email не будет опубликован. Обязательные поля помечены
                *
              </p>
            </div>
            <div className="freeback-score">
              <p className="fs-title">Ваша оценка:</p>
              <img src="" alt="" className="fs-score-img" />
            </div>
            <form action="" className="freeback-form">
              <label htmlFor="freeback" className="label-form">
                Ваш отзыв*
                <textarea
                  id="freeback"
                  placeholder="Введите комментарий"
                  className="form-big"
                ></textarea>
              </label>
              <label htmlFor="name" className="label-form">
                Имя*
                <input
                  id="name"
                  type="text"
                  className="form-mini"
                  placeholder="Введите ваше имя"
                />
              </label>
              <label htmlFor="email" className="label-form">
                E-mail*
                <input
                  id="email"
                  type="email"
                  className="form-mini"
                  placeholder="Введите вашу почту"
                />
              </label>
              <div className="form-button">
                <button className="form-btn">отправить</button>
                <p className="form-copyright-text">
                  Нажимая на кнопку «Отправить», я даю свое согласие на
                  обработку персональных данных, в соответствии{" "}
                  <a href="#" className="form-copyright">
                    с Политикой конфиденциальности
                  </a>
                </p>
              </div>
            </form>
          </div>
        )}
      </div>
    </>
  );
};
