import React from "react";

const OverviewOptionCards = (props) => {
  return (
      <div className="well">
        <h2>
          <i className="fas fa-graduation-cap"></i> {props.count}
        </h2>
        <h4>{props.heading}</h4>
      </div>
  );
};

export default OverviewOptionCards;
