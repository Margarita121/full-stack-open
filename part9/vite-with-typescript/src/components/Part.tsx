interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartDescription extends CoursePartBase {
  description: string;
}

interface CoursePartBasic extends CoursePartDescription {
  kind: "basic"
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group"
}

interface CoursePartBackground extends CoursePartDescription {
  backgroundMaterial: string;
  kind: "background"
}

interface CoursePartRequirements extends CoursePartDescription {
  requirements: string[];
  kind: "special"
}

export type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | CoursePartRequirements;

const Part = (props: CoursePart) => {
  switch (props.kind) {
    case "basic":
      return (
        <div>
          <h3>{props.name}</h3>
          <p><i>{props.description}</i></p>
          <p>Exercises: {props.exerciseCount}</p>
        </div>
      );
    case "group":
      return (
        <div>
          <h3>{props.name}</h3>
          <p>Group project count: {props.groupProjectCount}</p>
          <p>Exercises: {props.exerciseCount}</p>
        </div>
      );
    case "background":
      return (
        <div>
          <h3>{props.name}</h3>
          <p><i>{props.description}</i></p>
          <p>{props.backgroundMaterial}</p>
          <p>Exercises: {props.exerciseCount}</p>
        </div>
      );
    case "special":
      return (
        <div>
          <h3>{props.name}</h3>
          <p>Requirements:</p>
          <ul>
            {props.requirements.map((req) => (
            <li key={req}>{req}</li>
          ))}
          </ul>
          <p>Exercises: {props.exerciseCount}</p>
        </div>
      );
    default:
      break;
  }
};
export default Part;