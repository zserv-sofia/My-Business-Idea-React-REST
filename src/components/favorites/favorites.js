import React from "react";
import IdeaItem from "../ideas/ideaItem";
import "../ideas/myIdeas.css";
import { useState } from "react";
import { useEffect } from "react";
import authContext from "../context/auth-context";
import { useContext } from "react";

const Favorites = (props) => {
  const ctx = useContext(authContext);

  const [ideas, setIdeas] = useState([]);

  fetch("https://my-business-idea.herokuapp.com/rest/favorites", {
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
      </div>
    </div>
  );
};

export default Favorites;
