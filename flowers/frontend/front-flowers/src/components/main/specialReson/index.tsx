import "./style.scss";

import Img1 from "../../../assets/main/specialReason/img1.png";
import Img2 from "../../../assets/main/specialReason/img2.png";
import Img3 from "../../../assets/main/specialReason/img3.png";
import Img4 from "../../../assets/main/specialReason/img4.png";
import ArrowGreen from "../../../assets/main/specialReason/arrow-green.svg";

const images = [Img1, Img2, Img3, Img4];

export const SpecialReason = () => {
  return (
    <>
      <div className="container">
        <h3 className="title">особенный</h3>
        <div className="special-reason">
          <div className="light-pink so-pink"></div>
          <div className="light-green so-green"></div>
          <div className="special-reason-title">
            <span className="sr_line-pink"></span>
            <h3 className="title">повод?</h3>
          </div>
          <div className="special-reason_block">
            <div className="so">
              <p className="so_text">
                Мы готовы прийти на помощь и собрать уникальный букет, на любой
                вкус, бюджет и для любого события по вашему индивидуальному
                заказу.
              </p>
              <ul className="so_list">
                <li className="so_item">
                  учтем даже самые изысканные пожелания;
                </li>
                <li className="so_item">
                  подберем свежайшие цветы и сделаем уникальный букет или
                  композицию;
                </li>
                <li className="so_item">
                  оплатить можно при получении или онлайн на сайте
                </li>
              </ul>
            </div>
            <div className="so-block">
              {images.map((src, index) => (
                <img key={index} src={src} alt="img" className="so-img" />
              ))}
            </div>
          </div>
          <div className="btn">
            <img src={ArrowGreen} alt="" className="so_img-arrow" />
            <button className="so_btn">собрать индивидуальный букет</button>
          </div>
        </div>
      </div>
    </>
  );
};
