import React from 'react';
import GenericMiniatureCard from './GenericMiniatureCard';
import './CardTypeSummary.css'

const CardTypeSummary = (props) => {
    let styles = {
        display: 'inline-block',
        marginBottom: '0rem'
    };

    let textStyle = {
        marginTop: '0.25rem',
        marginBottom: '0.25rem',
    }

    return(
        <div onClick={props.pick} className="CardTypeSummary">
            <GenericMiniatureCard cardType={props.cardType} style={styles} /> <br />
            <p style={textStyle}>{props.cardType}</p>
            {/* <p style={textStyle}>{props.remaining}</p> */}
        </div>
    );
}

export default CardTypeSummary;