import "./details.css";
import { useContext } from "react";
import authContext from "../context/auth-context";
import { useNavigate } from "react-router-dom";

const Details = (props) => {
  const ctx = useContext(authContext);
  const navigate = useNavigate();

  const onClickDelete = () => {
    fetch(
      `https://my-business-idea.herokuapp.com/rest/idea/delete/${props.idea.id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${ctx.token}`,
        },
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((resp) => {
        //
        console.log(resp);
        navigate("/myideas");
      });
  };
  const onClkActions = () => {
    if (!ctx.token) {
      navigate("/login");
    }
  };

  const onClickEdit = () => {
    navigate("/editidea");
  };

  const onClickPublish = () => {
    console.log(props.idea.id + " " + ctx.token);
    fetch(
      `https://my-business-idea.herokuapp.com/rest/public/post/${props.idea.id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${ctx.token}`,
        },
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((resp) => {
        //
        console.log(resp);
        navigate("/public");
      });
  };

  const onClickRemove = () => {
    fetch(
      `https://my-business-idea.herokuapp.com/rest/public/remove/${props.idea.id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${ctx.token}`,
        },
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((resp) => {
        //
        console.log(resp);
        navigate("/public");
      });
  };

  const onClickAddFav = () => {
    fetch(
      `https://my-business-idea.herokuapp.com/rest/addFav/${props.idea.id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${ctx.token}`,
        },
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((resp) => {
        //
        console.log(resp);
        navigate("/myfav");
      });
  };

  const onClickDelFav = () => {
    fetch(
      `https://my-business-idea.herokuapp.com/rest/delFav/${props.idea.id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${ctx.token}`,
        },
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((resp) => {
        //
        console.log(resp);
        navigate("/myfav");
      });
  };

  return (
    <div className="idea">
      <div className="idea-content">
        <h3>{props.idea.title}</h3>
        <hr />
        <p>{props.idea.description}</p>
      </div>
      <div className="idea-actions" onClick={onClkActions}>
        <p onClick={onClickEdit}>Edit</p>
        <p onClick={onClickPublish}>Publish </p>
        <p onClick={onClickRemove}>Remove from public access</p>
        <p onClick={onClickAddFav}>Add to favorites</p>
        <p onClick={onClickDelFav}>Remove From Favorites</p>
        <p onClick={onClickDelete}>Delete </p>
      </div>
    </div>
  );
};

export default Details;
