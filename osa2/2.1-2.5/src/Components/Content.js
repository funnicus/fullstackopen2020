import React from 'react';
import Part from './Part';

const Content = ({parts}) => {
    console.log(parts);
    const prts = parts.map((p) => <Part key={p.id} partn={p.name} exercises={p.exercises} />);
    return (
      <div>
        {prts}
      </div>
    )
  }

export default Content;