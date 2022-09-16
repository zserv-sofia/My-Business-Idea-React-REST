import "./ideaItem.css";
//import { useNavigate } from 'react-router-dom'
const IdeaItem = (props) => {
  //const navigate=useNavigate();

  const detailsOpenClick = () => {
    props.detailsOpenClickHandler(props.idea);
  };
  return (
    <div>
      <div className="idea-item" onClick={detailsOpenClick}>
        <h3>{props.idea.title}</h3>
        <p>{props.idea.description}</p>
      </div>
    </div>
  );
};

export default IdeaItem;
