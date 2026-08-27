import React from "react";

export const StyleButton = () => {
  const [clickBtn, setClickBtn] = React.useState<boolean>(false);

  const btnAnimation = () => {
    setClickBtn(true);
    setTimeout(() => setClickBtn(false), 1000);
    };
    
    return {clickBtn, btnAnimation}
};
