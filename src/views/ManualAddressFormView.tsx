import { SavedAddress } from "../typings/types";
import { countries } from "country-data";
import Combobox from "react-widgets/Combobox";
import "react-widgets/styles.css";
import InputComponent from "../components/InputComponent";

type Props = {
  onAddressChange: (newAddress: SavedAddress) => void;
  address: SavedAddress;
};

const ManualAddressFormView = (props: Props) => {
  const countryList = countries.all.map((country) => {
    return country.name;
  });

  return (
    <div className="flex flex-col mb-2">
      <InputComponent
        placeholder="Line 1 *"
        onChange={(value: string) => {
          const newAddress = props.address;
          newAddress.line1 = value;
          props.onAddressChange(newAddress);
        }}
        resize
      />
      <InputComponent
        placeholder="Line 2"
        onChange={(value: string) => {
          const newAddress = props.address;
          newAddress.line2 = value;
          props.onAddressChange(newAddress);
        }}
        resize
      />
      <InputComponent
        placeholder="Line 3"
        onChange={(value: string) => {
          const newAddress = props.address;
          newAddress.line3 = value;
          props.onAddressChange(newAddress);
        }}
        resize
      />
      <InputComponent
        placeholder="Town *"
        onChange={(value: string) => {
          const newAddress = props.address;
          newAddress.town = value;
          props.onAddressChange(newAddress);
        }}
        resize
      />
      <InputComponent
        placeholder="Postcode *"
        onChange={(value: string) => {
          const newAddress = props.address;
          newAddress.postcode = value;
          props.onAddressChange(newAddress);
        }}
        resize
      />
      <Combobox
        hideCaret
        hideEmptyPopup
        data={countryList}
        placeholder="Search for a country *"
        onChange={(country: string) => {
          const newAddress = props.address;
          newAddress.country = country;
          props.onAddressChange(newAddress);
        }}
      />
      <div className="flex flex-col items-center mt-5">Or</div>
    </div>
  );
};

export default ManualAddressFormView;
