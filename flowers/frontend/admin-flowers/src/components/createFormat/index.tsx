import React from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../redux/store";
import {
  FetchFormatDelete,
  FetchFormatGet,
  FetchFormatPatch,
  FetchFormatPost,
} from "../../redux/slice/formatSlice";
import { CreateCommon } from "../createCommon";

export const CreateFormat = () => {
  const [value, setValue] = React.useState<string>("");
  const [success, setSuccess] = React.useState(false);

  const [getId, setGetId] = React.useState("");
  const [changeInput, setChangeInput] = React.useState<string>("");

  const format = useSelector((state: RootState) => state.format.format);
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (success) {
      dispatch(FetchFormatPost(value));
      setValue("");
    }
  };

  const handleCheck = () => {
    const checkFormat = format.some((el) =>
      el.format.toString().toLowerCase().includes(value.toLowerCase())
    );

    if (!checkFormat) {
      setSuccess(true);
    } else {
      setSuccess(false);
      alert("такая категория уже существует");
    }
  };

  const handleDeleteItem = (id: string) => {
    dispatch(FetchFormatDelete(id));
  };

  const handleChageField = (id: string) => {
    setGetId((prev) => (prev.includes(id) ? "" : id));

    if (changeInput) {
      dispatch(FetchFormatPatch({ id, format: changeInput }));
      setChangeInput("");
    }
  };

  React.useEffect(() => {
    dispatch(FetchFormatGet());
    setSuccess(false);
  }, [success, dispatch]);

  return (
    <>
      <CreateCommon
        title={"Создание формата"}
        field={"Формат"}
        value={value}
        list={format}
        name={"format"}
        newName={changeInput}
        setValue={setValue}
        handleCheck={handleCheck}
        getId={getId}
        setChangeInput={setChangeInput}
        handleChageField={handleChageField}
        handleDeleteItem={handleDeleteItem}
        handleSubmitForm={handleSubmitForm}
      />
    </>
  );
};
