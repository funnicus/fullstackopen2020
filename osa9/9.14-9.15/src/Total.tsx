import React from "react";

import { CoursePartBase } from './types';

const Total: React.FC<{ courseParts: Array<CoursePartBase> }> = ({ courseParts }) => {
    return(
        <p>
            Number of exercises{" "}
            {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
         </p>
    );
};

export default Total;