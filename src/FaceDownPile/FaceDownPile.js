import React from 'react';
import './FaceDownPile.css';

const FaceDownPile = (props) => {
    return(
        <div className="FaceDownPile">
            <div className="card-back" onClick={props.pick} title="Pick card from this deck">
                <img src={props.displayImage} />
            </div>
            <p>{props.remaining}</p>
        </div>
    );
};

export default FaceDownPile;