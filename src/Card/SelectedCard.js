import React from 'react';
import FaceUpCard from './FaceUpCard';

const SelectedCard = (props) => {
    let styles = {
        display: 'inline-block'
    }
    let pStyle = {
        display: 'inline-block',
        width: '25rem'
    }
    return (
        <div style={props.style}>
            <FaceUpCard cardType={props.cardType} style={styles}/>
            <p style={pStyle}>{props.cardDescription}</p>
        </div>
    );
}

export default SelectedCard;