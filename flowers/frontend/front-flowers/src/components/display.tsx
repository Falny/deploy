import { Flower } from "../components/main/flower";
import { InfoOrder } from "../components/infoOrder/index";
import { CatalogText } from "../components/main/catalogText";
import { PopularBucket } from "../components/main/populatBucket";
import { ToDoOrder } from "../components/main/todoOrder";
import { SpecialReason } from "../components/main/specialReson";
import { QuestionInst } from "../components/main/questionInst";

export const DisplayMain = () => {
  return (
    <>
      <div className="container">
        <Flower />
        <InfoOrder />
        <CatalogText />
      </div>
      <PopularBucket />
      <ToDoOrder />
      <SpecialReason />
      <QuestionInst />
    </>
  );
};
