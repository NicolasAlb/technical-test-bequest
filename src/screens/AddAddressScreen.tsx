import { useState } from "react";
import { SavedAddress } from "../typings/types";
import ButtonComponent from "../components/ButtonComponent";
import SearchAddressFormView from "../views/SearchAddressFormView";
import ManualAddressFormView from "../views/ManualAddressFormView";
import { toast, ToastContainer } from "react-toastify";

type Props = {
  onClose: () => void;
  onSave: (address: SavedAddress) => void;
};

const AddAddressScreen = (props: Props) => {
  const [manualAddress, setManualAddress] = useState<boolean>(false);
  const [address, setAddress] = useState<SavedAddress>({
    line1: "",
    line2: "",
    line3: "",
    postcode: "",
    town: "",
    country: "",
  });

  return (
    <div className="flex flex-col items-center">
      {manualAddress ? (
        <ManualAddressFormView
          onAddressChange={(newAddress: SavedAddress) => {
            setAddress(newAddress);
          }}
          address={address}
        />
      ) : (
        <SearchAddressFormView
          onAddressChange={(newAddress: SavedAddress) => {
            setAddress(newAddress);
          }}
          address={address}
        />
      )}
      <div className="mt-10">
        <ButtonComponent
          text={manualAddress ? "Search Address" : "Enter manually"}
          onClick={() => setManualAddress(!manualAddress)}
          black
        />
      </div>
      <div className="mt-20 flex justify-between flex-row">
        <ButtonComponent text="Close" onClick={props.onClose} black />
        <div className="ml-10">
          <ButtonComponent
            text="Save"
            onClick={() => {
              if (
                address.line1 !== "" &&
                address.postcode !== "" &&
                address.town !== "" &&
                address.country !== ""
              ) {
                props.onSave(address);
              } else {
                toast.error(
                  "Line 1, town, postcode and country are mandatory fields.",
                  {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                  }
                );
              }
            }}
          />
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default AddAddressScreen;
