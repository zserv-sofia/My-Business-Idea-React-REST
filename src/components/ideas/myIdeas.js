import React from "react";
import IdeaItem from "./ideaItem";
import "./myIdeas.css";
import classes from "../ui/css/button.module.css";
import { useState } from "react";
import { useEffect } from "react";

import { useContext } from "react";
import authContext from "../context/auth-context";
//const ctx=useContext(authContext)
import { Link } from "react-router-dom";

const MyIdeas = (props) => {
  const ctx = useContext(authContext);

  const [ideas, setIdeas] = useState([]);

  const btnclickhandler = () => {
    fetch("https://my-business-idea.onrender.com/rest/ideas", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${ctx.token}`,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((resp) => {
        console.log(resp.ideas_);
        setIdeas(resp.ideas_);
      });
  };

  useEffect(() => {
    btnclickhandler();
  }, []);

  return (
    <div>
      <div className="ideas-list">
        <ul>
          {ideas.map((idea_) => (
            <li key={idea_.id}>
              <IdeaItem
                idea={idea_}
                detailsOpenClickHandler={props.detailsOpenClickHandler}
              ></IdeaItem>
            </li>
          ))}
        </ul>
        <div className="el-center">
          <Link className={classes.btn} to="/addidea">
            Add new idea!
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MyIdeas;
