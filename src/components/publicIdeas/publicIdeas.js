import React from "react";
import IdeaItem from "../ideas/ideaItem";
import "../ideas/myIdeas.css";
import { useState } from "react";
import { useEffect } from "react";
//const ctx=useContext(authContext)
import { AnimatePresence, motion } from "framer-motion/dist/framer-motion";

const PublicIdeas = (props) => {
  const [ideas, setIdeas] = useState([]);

  const btnclickhandler = () => {
    fetch("https://my-business-idea.herokuapp.com/rest/public/list", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // 'Authorization':`Bearer ${ctx.token}`
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
            <motion.li
              initial={{ opacity: 0, x: "-100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "-100%" }}
              key={idea_.id}
            >
              <IdeaItem
                idea={idea_}
                detailsOpenClickHandler={props.detailsOpenClickHandler}
              ></IdeaItem>
            </motion.li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PublicIdeas;
