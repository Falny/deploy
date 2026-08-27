import React from "react";
import "./categories.scss";

import { ActiveButton } from "../../hook/categoriesHook/activeButton";
import { DisplayCategory } from "../../hook/categoriesHook/displayCategory";

export const Categories = () => {
  const { activeBtn, onClickBtn } = ActiveButton();
  const { sendCategories, category } = DisplayCategory();

  const onClickButton = (index: number) => {
    onClickBtn(index);
  };

  React.useEffect(() => {
    sendCategories(activeBtn);
  }, [activeBtn]);

  return (
    <div className="c_category-list">
      {category.map((catalog, index) => (
        <button
          key={index}
          onClick={() => onClickButton(index)}
          className={`c_category-item ${
            activeBtn.includes(index) ? "active" : ""
          }`}
        >
          {catalog}
        </button>
      ))}
    </div>
  );
};
