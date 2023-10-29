import { homepageData } from "../../../data/homepageData";
import { BoxItem } from "./BoxItem";

export default function Homepage() {
  return (
    <>
      {homepageData.map((item, index) => (
        <BoxItem key={item.id} item={item} isReversed={index % 2 === 0} />
      ))}
    </>
  );
}
