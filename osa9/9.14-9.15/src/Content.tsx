import React from "react";

import Part from './Part';

import { CoursePart } from './types';

const Content: React.FC<{ courseParts: Array<CoursePart> }> = ({ courseParts }) => {
    return <Part courseParts={courseParts} />
};

export default Content;