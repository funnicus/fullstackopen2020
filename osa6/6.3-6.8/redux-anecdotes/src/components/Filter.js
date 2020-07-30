import React from 'react'

const Filter = ({ filterVal, handleFilterChange}) => {
  return (
    <form>
        <input 
            type='text'
            id='filter'
            value={filterVal}
            name='Filter'
            placeholder='...'
            onChange={e => handleFilterChange(e)}
          />
    </form>
  )
}

export default Filter