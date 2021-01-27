import React, {useState} from 'react';
import InstructionsModal from './InstructionsModal';
import './Instructions.css';

const Instructions = () => {

    const [displayingInstructions, setDisplayingInstructions] = useState(true);

    let instructions = null;

    let hideInstructions = () => {
        setDisplayingInstructions(false);
    }

    let showInstructions = () => {
        setDisplayingInstructions(true);
    }

    let generateInstructionsDisplay = () => {
        return(
            <div>
                <div className="Backdrop" onClick={hideInstructions}></div>
                <InstructionsModal closeCallback={hideInstructions} />
            </div>
        );
    }

    if (displayingInstructions) {
        instructions = generateInstructionsDisplay();
    } else {
        instructions = null;
    }

    return (
        <div>
            {displayingInstructions? instructions : ''}
            <button className="InstructionsOpenerButton" title="Open instructions" onClick={showInstructions}>
                ?
            </button>
        </div>
    );
}

export default Instructions;