import React, { useState } from "react";
import ButtonComponent from "../components/ButtonComponent";
import InputComponent from "../components/InputComponent";
import { SavedAddress } from "../typings/types";
import styles from "../styles.module.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type Props = {
  onAddressChange: (newAddress: SavedAddress) => void;
  address: SavedAddress;
};

const SearchAddressFormView = (props: Props) => {
  const [postCode, setPostCode] = useState<string>("");
  const [searchAddresses, setSearchAddressses] = useState<any>();

  const searchAddress = async () => {
    await fetch(
      `https://api.getAddress.io/find/${postCode}?api-key=${process.env.REACT_APP_GET_ADDRESS_API_KEY}&expand=true`
    )
      .then((response) => {
        if (!response.ok) {
          throw Error();
        }
        return response.json();
      })
      .then((data) => {
        setSearchAddressses(data);
        const newAddress = {
          line1: data.addresses[0].line_1,
          line2: data.addresses[0].line_2,
          line3: data.addresses[0].line_3,
          town: data.addresses[0].town_or_city,
          postcode: data.postcode,
          country: data.addresses[0].country,
        };
        props.onAddressChange(newAddress);
      })
      .catch(() => {
        toast.error("Wrong postcode", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };

  return (
    <div className="flex flex-col">
      <div className="flex items-center flex-row">
        <InputComponent
          placeholder="Postcode"
          onChange={(value: string) => {
            setPostCode(value);
          }}
        />
        <div className="ml-20 mb-2">
          <ButtonComponent text="Search" onClick={searchAddress} />
        </div>
      </div>
      {searchAddresses && (
        <div className="mt-5">
          <select
            data-testid="selectAddesses"
            className={styles.select}
            onChange={(event: React.FormEvent<HTMLSelectElement>) => {
              const newAddress = {
                line1:
                  searchAddresses.addresses[event.currentTarget.value].line_1,
                line2:
                  searchAddresses.addresses[event.currentTarget.value].line_2,
                line3:
                  searchAddresses.addresses[event.currentTarget.value].line_3,
                town: searchAddresses.addresses[event.currentTarget.value]
                  .town_or_city,
                postcode: searchAddresses.postcode,
                country:
                  searchAddresses.addresses[event.currentTarget.value].country,
              };
              props.onAddressChange(newAddress);
            }}
          >
            {searchAddresses.addresses.map((address: any, index: number) => {
              return (
                <option value={index}>{address.formatted_address[0]}</option>
              );
            })}
          </select>
          <div className="flex flex-col items-center mt-2 border px-20 py-5">
            <div data-testid="search-line1">{props.address.line1}</div>
            <div className="flex flex-row">
              <div>{props.address.town}</div>
              <div>
                {", "}
                {props.address.postcode}
              </div>
            </div>
            <div>{props.address.country}</div>
          </div>
        </div>
      )}
      <div className="flex flex-col items-center mt-5">Or</div>
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

export default SearchAddressFormView;
