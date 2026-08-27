import "./style.scss";
import { Link } from "react-router-dom";
import { Scroll } from "../../../hook/scrollToTop";

const catalogFlowers = [
  {
    title: "Цветы",
    info: [
      "Сборные букеты",
      "Монобукеты",
      "Композиции из цветов",
      "розы",
      "свадебные",
    ],
  },
  {
    title: "готовые букеты из сухоцветов",
    info: ["букеты", "для интерьера", "Композиции"],
  },
  {
    title: "дополнительно",
    info: ["шары", "игрушки", "открытки", "упаковка"],
  },
];

export const CatalogText = () => {

  const {scrollToTop} = Scroll()

  return (
    <>
      <div className="catalog-text">
        <h3 className="title">каталог</h3>
        <div className="catalog-text_text">
          <p className="ct-main-text">
            У нас самый большой выбор цветов, букетов, открыток и подарков. Мы
            всегда поможем вам подобрать букет для вашего события, наш менеджер
            вас проконсультирует и поможет определиться с выбором
          </p>
          <p className="ct-text">Ознакомьтесь с нашими разделами каталога</p>
        </div>
        <div className="light-pink ct_light-pink"></div>
        <div className="light-green ct_light-green"></div>
        <div className="catolog-text_flowers">
          <div className="ct_big-text ct-text-flower">Цветы</div>
          <div className="ct_big-text ct-text-bucket">букеты</div>
          <div className="ct_big-text ct-text-dop">дополнител</div>

          <div className="catalog-text_block">
            {catalogFlowers.map((obj, index) => (
              <ul className="ct-list" key={index}>
                <p className="ct-item-title">{obj.title}</p>
                {obj.info.map((text) => (
                  <li className="ct-item-info">{text}</li>
                ))}
                <Link
                  to="/catalog"
                  className="ct-watch-catalog"
                  onClick={() => scrollToTop()}
                >
                  смотреть каталог
                </Link>
              </ul>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
