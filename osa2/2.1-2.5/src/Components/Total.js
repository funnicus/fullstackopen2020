import React from 'react';

const Total = ({parts}) => {
    console.log(parts)
    const total = parts.reduce((s, p) => (isNaN(s.exercises) === true ? s : s.exercises) + p.exercises);
    console.log(total);
    return (
        <p><b>total {total} of exercises</b></p>
    )
  }

export default Total;