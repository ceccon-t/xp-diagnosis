import React from 'react';
import './InstructionsModal.css';

const InstructionsModal = (props) => {

    return(
        <div className="InstructionsModal">
            <h2>Welcome to XP Diagnosis!</h2>
            <p>The main goal of the game is to foster discussion about a team's environment, as well as its understanding and adoption of Agile values and Extreme Programming practices.</p>
            <p>For that reason, ideally it should be played with the entire team together looking at the same screen, either in person or through a remote meeting with open mics. The Scrum Master, Agile Coach, or another designated team member should facilitate by indicating to the team when they should keep the discussion and when to move on, as well as interacting with the app so the team can focus on the discussion.</p>
            <p>The game uses cards that have a type and a short description. The game starts with the cards being shuffled into four decks, and then proceeds with team members, one at a time, choosing from where the next card should be drawn and discussing about the topic described by it. To draw a card, simply click on the chosen deck.</p>
            <br />
            <p>There are four types of cards:</p>
            <p><b>Practice</b>: describe an Extreme Programming practice, the team should discuss if it adopts this practice and, in either case, how it could improve the environment.</p>
            <p><b>Problem</b>: describe a common problem faced by many Agile teams, the team should discuss if this problem is present in their environment and possible solutions for it.</p>
            <p><b>Solution</b>: a possible solution for one of the common problems that Agile teams face, the team should discuss if this is already being done in their environment and/or if it could solve one of their current problems.</p>
            <p><b>Values</b>: one of the core Agile values, the team should discuss if they feel this as a value that the team holds and also specific situations in which this value was (or wasn't) put in practice by the team.</p>
            <br />
            <p>When drawing a new card, the team member can choose either from one of the four randomized decks, or pick a specific type by clicking on it right below the decks - in which case the next card of that type will be selected and removed from its deck.</p>
            <p>Just click on 'New Game' at the bottom of the page now and let the discussion begin! :)</p>
            <button className="BtnCloseInstructions" onClick={props.closeCallback}>Close</button>
        </div>
    );

}

export default InstructionsModal;