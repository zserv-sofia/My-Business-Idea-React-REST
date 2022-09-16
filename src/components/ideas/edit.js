import "./edit.css";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import authContext from "../context/auth-context";
import classes from "../ui/css/button.module.css";
// add css to button

const IdeaEdit = (props) => {
  const ctx = useContext(authContext);
  const titleInputRef = useRef();
  const descriptionInputRef = useRef();
  const navigate = useNavigate();

  const onSubmitForm = (event) => {
    event.preventDefault();
    const enteredTitle = titleInputRef.current.value;
    const enteredDescription = descriptionInputRef.current.value;

    console.log(enteredTitle + enteredDescription);

    fetch("https://my-business-idea.herokuapp.com/rest/idea/edited-save", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${ctx.token}`,
      },
      body: JSON.stringify({
        id: props.idea.id,
        title: enteredTitle,
        description: enteredDescription,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((resp) => {
        //success login actions
        console.log(resp);
        // shuld be idea details screen
        navigate("/myideas");
      });
  };

  return (
    <div>
      <form className="edit-form" onSubmit={onSubmitForm}>
        <div className="form-cont">
          <label htmlFor="tit">Title</label>
          <input
            type="text"
            ref={titleInputRef}
            id="tit"
            defaultValue={props.idea.title}
          />
        </div>
        <div className="form-cont">
          <label htmlFor="des">Description</label>
          <textarea
            rows="5"
            ref={descriptionInputRef}
            id="des"
            defaultValue={props.idea.description}
          ></textarea>
        </div>
        <button className={classes.btn}>Save</button>
      </form>
    </div>
  );
};

export default IdeaEdit;
