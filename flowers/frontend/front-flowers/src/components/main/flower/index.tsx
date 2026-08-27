import './style.scss'

import { Link } from 'react-router-dom'
import { Scroll } from '../../../hook/scrollToTop'

export const Flower = () => {

  const { scrollToTop } = Scroll()
  
  return (
    <>
      <div className="main-flowers">
        {/* <img src={Flowers} alt="flowers" className="main-flowers_img" /> */}
        <div className="light-pink main-flowers_light-pink"></div>
        <div className="light-green main-flowers_light-green"></div>
        <div className="main-flowers_title">
          {/* не могу сделать h1 заголовок потому что не работает font-weight а мне нужен тонкие заголовок */}
          <p className="m-f_title-one">Lower</p>
          <p className="m-f_title-two">flower</p>
        </div>
        <p className="main-flowers_text">
          Создаём для тех, кто ценит свежесть и изящество цветка
        </p>
        <Link
          to="/catalog"
          onClick={() => scrollToTop()}
          className="main-flowers_btn"
        >
          смотреть каталог
        </Link>
      </div>
    </>
  );
}
