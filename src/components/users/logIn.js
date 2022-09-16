import "./logIn.css";
import classes from "../ui/css/button.module.css";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import ErrorMsg from "../messages/errorMsg";

import { AnimatePresence, motion } from "framer-motion/dist/framer-motion";

const LogIn = (props) => {
  const emailInputRef = useRef();
  const passInputRef = useRef();
  const navigate = useNavigate();

  const [isErrMsg, setisErrMsg] = useState(false);
  const closeErrMsg = () => {
    setisErrMsg(false);
  };

  //login handler
  const onSubmitForm = (event) => {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPass = passInputRef.current.value;

    console.log(enteredEmail + enteredPass);

    fetch("https://my-business-idea.herokuapp.com/rest/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: enteredEmail,
        pass: enteredPass,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((resp) => {
        if (resp.errorMessage) {
          setisErrMsg(resp.errorMessage);
        } else {
          setisErrMsg(false);
          props.cbIsLoggedIn(resp.token);
          navigate("/myideas");
        }
      });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: "-100%" }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: "-100%" }}
    >
      {isErrMsg ? (
        <ErrorMsg error={isErrMsg} closeErrMsg={closeErrMsg} />
      ) : (
        <div></div>
      )}
      <form className="logIn-form" noValidate onSubmit={onSubmitForm}>
        <div className="form-cont">
          <label htmlFor="em">E-Mail</label>
          <input ref={emailInputRef} type="email" id="em" />
        </div>
        <div className="form-cont">
          <label htmlFor="pas">Password</label>
          <input ref={passInputRef} type="text" id="pas" />
        </div>

        <button className={classes.btn}>LogIn</button>
      </form>
    </motion.div>
  );
};

export default LogIn;
