import React from "react";

export const ActiveButton = () => {
  const [activeBtn, setActiveBtn] = React.useState<number[]>([]);

  const onClickBtn = (index: number) => {
    setActiveBtn((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
    };
    
    return {activeBtn, onClickBtn}
};
