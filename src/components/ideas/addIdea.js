import { useRef } from "react";
import classes from "../ui/css/button.module.css";
import "./addIdea.css";
import { useNavigate } from "react-router-dom";

import { useContext } from "react";
import authContext from "../context/auth-context";
//const ctx=useContext(authContext)

const AddIdea = (props) => {
  const ctx = useContext(authContext);
  const titleInputRef = useRef();
  const descriptionInputRef = useRef();
  const navigate = useNavigate();

  const onSubmitForm = (event) => {
    event.preventDefault();
    const enteredTitle = titleInputRef.current.value;
    const enteredDescription = descriptionInputRef.current.value;

    console.log(enteredTitle + enteredDescription);

    fetch("https://my-business-idea.herokuapp.com/rest/add-idea", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${ctx.token}`,
      },
      body: JSON.stringify({
        title: enteredTitle,
        descr: enteredDescription,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((resp) => {
        //success login actions
        console.log(resp);
        navigate("/myideas");
      });
  };

  return (
    <div>
      <form className="addIdea-form" onSubmit={onSubmitForm}>
        <div className="form-cont">
          <label htmlFor="tit">Title</label>
          <input type="text" ref={titleInputRef} id="tit" />
        </div>
        <div className="form-cont">
          <label htmlFor="des">Description</label>
          <textarea rows="5" ref={descriptionInputRef} id="des"></textarea>
        </div>
        <button className={classes.btn}>Add an idea!</button>
      </form>
    </div>
  );
};

export default AddIdea;
