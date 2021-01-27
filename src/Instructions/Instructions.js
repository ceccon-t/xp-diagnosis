import React, {useState} from 'react';
import Backdrop from './Backdrop';
import InstructionsModal from './InstructionsModal';
import './Instructions.css';

const Instructions = () => {

    const [displayingInstructions, setDisplayingInstructions] = useState(true);

    const hideInstructions = () => {
        setDisplayingInstructions(false);
    }

    const showInstructions = () => {
        setDisplayingInstructions(true);
    }

    const generateInstructionsDisplay = () => {
        return(
            <div>
                <Backdrop closeCallback={hideInstructions} />
                <InstructionsModal closeCallback={hideInstructions} />
            </div>
        );
    }

    let instructions;

    if (displayingInstructions) {
        instructions = generateInstructionsDisplay();
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