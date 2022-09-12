import styles from "../styles.module.css";

type Props = {
  text: string;
  onClick: () => void;
  black?: boolean;
};

const ButtonComponent = (props: Props) => {
  return (
    <button
      onClick={props.onClick}
      className={
        props.black ? styles.button + " " + styles.buttonBlack : styles.button
      }
    >
      {props.text}
    </button>
  );
};

export default ButtonComponent;
