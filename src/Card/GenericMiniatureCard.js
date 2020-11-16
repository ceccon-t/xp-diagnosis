import React from 'react';
import './Card.css'

const GenericMiniatureCard = (props) => {
    return(
        <div className={"Card miniature-card " + props.cardType} style={props.style}>

        </div>
    );
}

export default GenericMiniatureCard;