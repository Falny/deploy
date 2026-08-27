import "./style.scss";
import { Breadcrumbs } from "../../bredcrams";

export const About = () => {
  return (
    <>
      <div className="about">
        <div className="container">
          <Breadcrumbs />
          <h3 className="title">о нас</h3>
          <div className="about-container">
            <div className="ac-title">
              Lover <br />
              flower —
            </div>
            <div className="ac-block">
              <p className="ac-block_title">
                молодая команда разных людей с одинаковыми ценностями.
              </p>
              <p className="ac-block_text">
                Мы считаем, что удовольствие от качества длится дольше, чем
                удовольствие от низкой цены. И поэтому в создание нашей
                букетерии мы вложили все, чем располагаем: душу, сердце, время и
                мечты! Мы готовы обещать вам только то, что можем сделать. А
                делаем мы только самое качественное, самое интересное и
                обязательно уникальное. Мы всегда честны со своими клиентами во
                всем – в нашем каталоге только те букеты, которые вы
                действительно сможете купить.
              </p>
            </div>
            <div className="ac-title">гарантии</div>
            <p className="ac-garantee-text">
              Каждый цветок уникален и чтобы вы были уверены в качестве, мы
              пришлем вам фотографию именно вашего букета до его отправки
              получателю. Вся предоставленная Вами информация конфиденциальна и
              будет известна только нам и курьеру для осуществления доставки.
            </p>
            <div className="ac-title">
              Заказ букетов на <br /> сайте компании <br /> Lower Flower – это:
            </div>
            <ul className="ac-list">
              <li className="ac-item">
                выбор оттенков и сортов цветков в любое время года;
              </li>
              <li className="ac-item">
                отправка фото готовой композиции перед отправкой;
              </li>
              <li className="ac-item">
                возможность заказать цветы с доставкой в течение часа;
              </li>
              <li className="ac-item">
                выгодные цены – на сайте только те варианты, что Вы сможете
                купить;
              </li>
              <li className="ac-item"> полная конфиденциальность по заказу;</li>
              <li className="ac-item">
                мы подбираем открытку, воздушные шар, подарок по Вашему желанию;
              </li>
              <li className="ac-item">
                в нашем уютном цветочном магазине цветы, которые приятно дарить.
              </li>
            </ul>
          </div>
          <p className="about-text-option">
            Природная гармония цвета, неповторимость бутонов и Ваши чувства в
            нежных лепестках не оставят никого равнодушным.
          </p>
          <p className="about-text-quote">
            Вы выбираете и заказываете цветочный сюрприз, а мы вкладываем в него
            душу!
          </p>
              </div>
              <div className="light-yellow about-light-yellow-top-left"></div>
              <div className="light-yellow about-light-yellow-top-right"></div>
              <div className="light-yellow about-light-yellow-top-center"></div>
              <div className="light-yellow about-light-yellow-bottom-left"></div>
              <div className="light-yellow about-light-yellow-bottom-right"></div>
      </div>
    </>
  );
};
