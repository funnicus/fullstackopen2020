import React from 'react';

const Filter = ({ value, handleFilterChange }) => {
    return(
        <form>
            <div>
            filter shown with: <input value={value} onChange={e => handleFilterChange(e)} />
            </div>
        </form>
    );
}

export default Filter;