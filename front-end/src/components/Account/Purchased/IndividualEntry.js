import React from 'react';

const IndividualEntry = ({ prompt, entry }) => {
    return (
        <div className="sectionContainer individualEntry">
            <p className="dashes">----</p>
            <h3 className="individualEntryTitle sectionContainer"><i>{prompt}</i></h3>
            <p className="individualEntryText">{entry}</p>
            <p className="dashes">----</p>
        </div>
    )
}

export default IndividualEntry;