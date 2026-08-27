import React from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../redux/store";
import {
  FetchLightDelete,
  FetchLightGet,
  FetchLightPatch,
  FetchLightPost,
} from "../../redux/slice/lightSlice";
import { CreateCommon } from "../createCommon";

export const CreateLight = () => {
  const [value, setValue] = React.useState<string>("");
  const [success, setSuccess] = React.useState(false);

  const [getId, setGetId] = React.useState("");
  const [changeInput, setChangeInput] = React.useState<string>("");

  const light = useSelector((state: RootState) => state.light.light);
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (success) {
      dispatch(FetchLightPost(value));
      setValue("");
    }
  };

  const handleCheck = () => {
    const checkLight = light.some((el) =>
      el.light.toString().toLowerCase().includes(value.toLowerCase())
    );

    if (!checkLight) {
      setSuccess(true);
    } else {
      setSuccess(false);
      alert("такая категория уже существует");
    }
  };

  const handleDeleteItem = (id: string) => {
    dispatch(FetchLightDelete(id));
  };

  const handleChageField = (id: string) => {
    setGetId((prev) => (prev.includes(id) ? "" : id));

    if (changeInput) {
      dispatch(FetchLightPatch({ id, light: changeInput }));
      setChangeInput("");
    }
  };

  React.useEffect(() => {
    dispatch(FetchLightGet());
    setSuccess(false);
  }, [success, dispatch]);

  return (
    <>
      <CreateCommon
        title={"Свет"}
        field={"Свет"}
        value={value}
        list={light}
        name={"light"}
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
