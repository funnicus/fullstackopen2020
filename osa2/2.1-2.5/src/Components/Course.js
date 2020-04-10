import React from 'react';
import Header from './Header';
import Content from './Content';
import Total from './Total';

const Course = ({courses}) => {
    const course = courses.map(c => {
        return (
            <div>
                <Header course={c.name} />
                <Content parts={c.parts} />
                <Total parts={c.parts} /> 
            </div>
        )
    });

    return (
        <div>
            {course}
        </div>
    )
}

export default Course;