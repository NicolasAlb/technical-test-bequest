import { SavedAddress } from "../typings/types";
import styles from "../styles.module.css";

type Props = {
  savedAddress: SavedAddress;
  selected: boolean;
  onClick: () => void;
};

const SavedAddressView = (props: Props) => {
  return (
    <div className="flex flex-col mb-2">
      <button
        className={
          props.selected
            ? "border px-20 py-5 rounded-xl " + styles.selectedButton
            : "border px-20 py-5 rounded-xl"
        }
        onClick={props.onClick}
      >
        <div>{props.savedAddress.line1}</div>
        <div className="flex flex-row">
          <div>{props.savedAddress.town}</div>
          <div>
            {", "}
            {props.savedAddress.postcode}
          </div>
        </div>
        <div>{props.savedAddress.country}</div>
      </button>
    </div>
  );
};

export default SavedAddressView;
