import React from 'react';

const PersonForm = ({ name, number, handleNameChange, handleNumberChange, handleSubmit }) => {
    return(
        <form onSubmit={e => handleSubmit(e)}>
            <div>
            name: <input value={name} onChange={e => handleNameChange(e)} />
            </div>
            <div>
            number: <input value={number} onChange={e => handleNumberChange(e)} />
            </div>
            <div>
            <button type="submit">add</button>
            </div>
        </form>
    );
}

export default PersonForm;