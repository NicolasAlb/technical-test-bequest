import React from "react";
import styles from "../styles.module.css";

type Props = {
  placeholder: string;
  onChange: (value: string) => void;
  resize?: boolean;
};

const InputComponent = (props: Props) => {
  return (
    <input
      className={
        !props.resize
          ? styles.input + " mb-2"
          : styles.input + " " + styles.inputResize + " mb-2"
      }
      placeholder={props.placeholder}
      onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
        props.onChange(event.target.value)
      }
    />
  );
};

export default InputComponent;
