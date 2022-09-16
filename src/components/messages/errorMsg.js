import Modal from "../ui/css/modal";
import classes from "../ui/css/button.module.css";
const ErrorMsg = (props) => {
  return (
    <Modal>
      <p>{props.error}</p>
      <button className={classes.btn} onClick={props.closeErrMsg}>
        Ok
      </button>
    </Modal>
  );
};

export default ErrorMsg;
