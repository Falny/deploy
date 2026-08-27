import React from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import type { AppDispatch } from "../../redux/store";
import { debounce } from "lodash";
import { setValueInput } from "../../redux/slices/searchSlice";

export const SearchHook = () => {
  const [value, setValue] = React.useState<string>("");

    const navigate = useNavigate();
    const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();

  const updateInput = React.useMemo(
    () =>
      debounce((text: string) => {
        dispatch(setValueInput(text));
        setValue("");
      }, 1000),
    []
  );

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    updateInput(e.target.value);
    navigate("/search");
    };

    const isHeader =
    location.pathname !== "/" && location.pathname !== "/catalog";
  
    const isNotHeader = location.pathname === '/'
    
    return { onChangeInput, value, isHeader, isNotHeader };
};
