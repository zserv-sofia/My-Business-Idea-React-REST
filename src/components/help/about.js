import "./about.css";
import clases from "../ui/css/button.module.css";
import { useNavigate } from "react-router-dom";
import pic from "../../assets/idea__.jpg";

import { AnimatePresence, motion } from "framer-motion/dist/framer-motion";

const About = () => {
  const navigate = useNavigate();

  const btnClHandler = () => {
    navigate("/public");
  };

  return (
    <div>
      <div className="about">
        <motion.div
          initial={{ opacity: 0, y: "-100%" }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: "-100%" }}
        >
          <div className="content">
            <br />
            <h4>
            My Business Idea is a platform to store your unique business ideas.
            </h4>
            <h3>M.B.I.</h3>
            <h5>Main features for registered users:</h5>

            <p>Add new ideas to your private list. </p>
            <p>
            Post ideas to a public list, accessible to everyone on the main page.
            </p>
            <p>Mark ideas as favorites.</p>
            <img src={pic} />
          </div>
        </motion.div>
      </div>

      <div className="el-center">
        <div className={clases.btn} onClick={btnClHandler}>
          {" "}
          Ok{" "}
        </div>
      </div>
      <div className="ftr">
        <p>2022 S.Z.</p>
      </div>
    </div>
  );
};

export default About;
