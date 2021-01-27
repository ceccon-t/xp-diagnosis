import React from 'react';
import './InstructionsModal.css';

const InstructionsModal = (props) => {

    return(
        <div className="InstructionsModal">
            <h2>How to play</h2>
            <p>Here will be the instructions text.</p>
            <button className="BtnCloseInstructions" onClick={props.closeCallback}>Close</button>
        </div>
    );

}

export default InstructionsModal;