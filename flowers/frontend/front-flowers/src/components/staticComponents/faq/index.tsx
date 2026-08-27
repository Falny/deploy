import React from "react";
import "./style.scss";
import { Breadcrumbs } from "../../bredcrams";

const faq = [
  {
    title:
      "БУДЕТ ЛИ ЗАКАЗАННЫЙ БУКЕТ В ТОЧНОСТИ СООТВЕТСТВОВАТЬ ЕГО ИЗОБРАЖЕНИЮ НА САЙТЕ?",
    text: "Букет собирается по индивидуальной матрице букета. Однако возможны случаи, когда нет необходимых цветов либо имеющиеся цветы отличаются от представленных на фото, и с согласования заказчика они могут быть заменены на аналогичные. Либо если флорист считает, что данные изменения не повлекут сильного изменения в образе букета, то самостоятельно может заменить некоторые цветы. И перед отправкой направляется фото заказчику, который утверждает получившийся букет. Каждый цветок отличается от другого, как и каждый букет будет индивидуальным, но в этом и есть его прелесть… в индивидуальности.",
  },
  {
    title: "КАК ДОЛГО СТОЯТ БУКЕТЫ ИЗ СУХОЦВЕТОВ?",
    text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repudiandae perspiciatis magnam eum? Culpa corporis modi neque commodi, veritatis aperiam. Harum.",
  },
  {
    title: "ДЕЛАЕТЕ ЛИ ВЫ ФОТО ГОТОВОГО БУКЕТА ПЕРЕД ОТПРАВКОЙ?",
    text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repudiandae perspiciatis magnam eum? Culpa corporis modi neque commodi, veritatis aperiam. Harum.",
  },
  {
    title: "А СКОЛЬКО ДОЛЖНЫ ПРОСТОЯТЬ ЦВЕТЫ В БУКЕТЕ?",
    text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repudiandae perspiciatis magnam eum? Culpa corporis modi neque commodi, veritatis aperiam. Harum.",
  },
  {
    title: "ЕСТЬ ЛИ ДОСТАВКА ЗА ПРЕДЕЛЫ МКАД?",
    text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repudiandae perspiciatis magnam eum? Culpa corporis modi neque commodi, veritatis aperiam. Harum.",
  },
  {
    title: "КАК ОПРЕДЕЛИТЬ СВЕЖИЕ ЛИ ЦВЕТЫ?",
    text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repudiandae perspiciatis magnam eum? Culpa corporis modi neque commodi, veritatis aperiam. Harum.",
  },
  {
    title: "ЧЕМ ОТЛИЧАЕТСЯ БЕЛОРУССКАЯ РОЗА ОТ ИМПОРТНОЙ?",
    text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repudiandae perspiciatis magnam eum? Culpa corporis modi neque commodi, veritatis aperiam. Harum.",
  },
];

export const Faq = () => {
  const [toggle, setToggle] = React.useState<number[]>([]);

  const onClickToggle = (num: number) => {
    setToggle((prev) =>
      prev.includes(num) ? prev.filter((i) => i !== num) : [...prev, num]
    );
  };

  return (
    <>
      <div className="faq">
        <div className="container">
          <Breadcrumbs />
          <div className="faq-title">
            <span className="faq-stick"></span>
            <h3 className="title">faq</h3>
          </div>
          <div className="faq-accardion">
            {faq.map((obj, index) => (
              <div
                className="faq-block"
                key={index}
                onClick={() => onClickToggle(index)}
              >
                <span
                  className={toggle.includes(index) ? "faq-open" : "faq-close"}
                ></span>
                <p className="faq-block-title">{obj.title}</p>
                <p
                  className={
                    toggle.includes(index)
                      ? "faq-block-text"
                      : "faq-block-text-unvis"
                  }
                >
                  {obj.text}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="light-blue faq-light-top-left"></div>
        <div className="light-blue faq-light-top-right"></div>
        <div className="light-blue faq-light-bottom-left"></div>
        <div className="light-blue faq-light-bottom-right"></div>
      </div>
    </>
  );
};
