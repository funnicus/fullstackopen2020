// new types
export interface CoursePartBase {
    name: string;
    exerciseCount: number;
  }

export interface CoursePartDesc extends CoursePartBase {
    description: string;
}
  
export interface CoursePartOne extends CoursePartDesc {
    name: "Fundamentals";
  }
  
export interface CoursePartTwo extends CoursePartBase {
    name: "Using props to pass data";
    groupProjectCount: number;
  }
  
export interface CoursePartThree extends CoursePartDesc {
    name: "Deeper type usage";
    exerciseSubmissionLink: string;
  }

  export interface CoursePartFour extends CoursePartDesc {
    name: "My own type";
  }
  
export type CoursePart = CoursePartOne | CoursePartTwo | CoursePartThree | CoursePartFour;