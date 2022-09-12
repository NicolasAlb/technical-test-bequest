import { useState } from "react";
import SavedAddressView from "../views/SavedAddressView";
import { SavedAddress } from "../typings/types";
import ButtonComponent from "../components/ButtonComponent";
import AddAddressScreen from "./AddAddressScreen";
import styles from "../styles.module.css";

type Props = {};

const AddressScreen = (props: Props) => {
  const [addAddress, setAddAddress] = useState<boolean>(false);
  const [savedAddresses, setSavedAddresses] = useState<SavedAddress[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<number>(0);

  return (
    <div className={styles.background}>
      <div className="flex items-center justify-center h-screen flex-col">
        <div className="bg-white p-40 rounded-xl">
          {addAddress ? (
            <AddAddressScreen
              onClose={() => setAddAddress(false)}
              onSave={(address: SavedAddress) => {
                setSavedAddresses([...savedAddresses, address]);
                setAddAddress(false);
              }}
            />
          ) : (
            <div className="flex items-center flex-col">
              {savedAddresses.length > 0 ? (
                <div data-testid="saved-addresses-list">
                  {savedAddresses.map(
                    (savedAddress: SavedAddress, index: number) => (
                      <SavedAddressView
                        savedAddress={savedAddress}
                        key={index}
                        selected={selectedAddress === index ? true : false}
                        onClick={() => setSelectedAddress(index)}
                      />
                    )
                  )}
                </div>
              ) : (
                <div>
                  No addresses found in your address book. Please add one.
                </div>
              )}
              <div className="mt-10">
                <ButtonComponent
                  text="+ Add"
                  onClick={() => setAddAddress(true)}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddressScreen;
