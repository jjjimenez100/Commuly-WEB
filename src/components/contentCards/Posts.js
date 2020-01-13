import React from "react";
import "./Posts.scss";
import SmileReact from "../../assets/Reacts/smileReact.jpg";
import HahaReact from "../../assets/Reacts/hahaReact.jpg";
import MehReact from "../../assets/Reacts/mehReact.jpg";
import SadReact from "../../assets/Reacts/sadReact.jpg";
function Posts() {
  return (
    <div className="Posts">
      <div className="Posts-body">
        <div className="Text-body">
          <p className="Header"> New Supervisor Post </p>
          <p className="Body">
            {" "}
            [New Supervisor Post] for user to type in a post
          </p>
        </div>
        <div className="React-body">
          <div className="Reacts">
            <img src={SmileReact} />
            <img src={HahaReact} />
            <img src={MehReact} />
            <img src={SadReact} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Posts;
