import "./signUp.css";
import classes from "../ui/css/button.module.css";

import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import ErrorMsg from "../messages/errorMsg";

import { AnimatePresence, motion } from "framer-motion/dist/framer-motion";

const SignUp = (props) => {
  const [isErrMsg, setisErrMsg] = useState(false);
  const closeErrMsg = () => {
    setisErrMsg(false);
  };

  const emailInputRef = useRef();
  const passInputRef = useRef();
  const repassInputRef = useRef();
  const navigate = useNavigate();

  const onSubmitForm = (event) => {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPass = passInputRef.current.value;
    const enteredRePass = repassInputRef.current.value;

    console.log(enteredEmail + enteredPass + enteredRePass);

    fetch("https://my-business-idea.herokuapp.com/rest/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: enteredEmail,
        pass: enteredPass,
        repass: enteredRePass,
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
          navigate("/login");
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
      <form className="signUp-form" noValidate onSubmit={onSubmitForm}>
        <div className="form-cont">
          <label htmlFor="em">E-Mail</label>
          <input ref={emailInputRef} type="email" id="em" />
        </div>
        <div className="form-cont">
          <label htmlFor="pas">Password</label>
          <input ref={passInputRef} type="text" id="pas" />
        </div>
        <div className="form-cont">
          <label htmlFor="repas">Re enter password</label>
          <input ref={repassInputRef} type="text" id="repas" />
        </div>
        <button className={classes.btn}>SignUp</button>
      </form>
    </motion.div>
  );
};

export default SignUp;
