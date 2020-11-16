import React from 'react';

const NewGameButton = (props) => {
    return (
        <div>
            <button onClick={props.onClick}>New Game</button>
        </div>
    );
}

export default NewGameButton;