import React from 'react';

const Persons = ({ phonebook }) => {
    return(
        <ul>
          {phonebook}
        </ul>
    );
}

export default Persons;