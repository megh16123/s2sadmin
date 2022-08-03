import React from "react";

function OverviewCard(props) {
    return(

        <button className={props.styleClass}>
        <div>
            <div className="well">
                <h2>
                    {props.count}
                </h2>
                <h4>{props.heading}</h4>
            </div>
        </div>
    </button>
        )
}

export default OverviewCard;