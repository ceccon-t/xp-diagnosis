import React from 'react';
import './Card.css';
//import './FaceUpCard.css';

const FaceUpCard = (props) => {
    return(
        <div className={"Card face-up " + props.cardType} >
            <p className="card-type ">{props.cardType}</p>
        </div>
    );
}

export default FaceUpCard;