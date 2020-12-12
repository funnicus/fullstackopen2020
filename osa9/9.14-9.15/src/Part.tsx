import React from "react";

import { CoursePart } from './types';

/**
 * Helper function for exhaustive type checking
 */
const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };
  
const Part: React.FC<{ courseParts: Array<CoursePart> }> = ({ courseParts }) => {

    const parts = courseParts.map(part => {
            switch (part.name) {
                case 'Fundamentals':
                    return (<p key={part.name}>
                        {part.name} {part.exerciseCount} {part.description}
                    </p>)
                case 'Using props to pass data':
                    return (<p key={part.name}>
                        {part.name} {part.exerciseCount} {part.groupProjectCount}
                    </p>)
                case 'Deeper type usage':
                    return (<p key={part.name}>
                        {part.name} {part.exerciseCount} {part.description} {part.exerciseSubmissionLink}
                    </p>)
                case 'My own type':
                    return (<p key={part.name}>
                        {part.name} {part.exerciseCount} {part.description}
                    </p>)
                default:
                    return assertNever(part);
          }
        }
    );

      return(
        <div>
           {parts}
       </div>
      );
};
  
export default Part;