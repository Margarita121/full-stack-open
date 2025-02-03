const Header = ({ name }) => <h1>{name}</h1>;
const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
);
const Content = ({ course }) => {
  return course.parts.map((part) => (
    <div key={part.id}>
      <Part part={part} />
    </div>
  ));
};
const Total = ({ course }) => {
  var totalExercises = course.parts.reduce(
    (sum, part) => sum + part.exercises,
    0
  );
  return (
    <p>
      <b> Total of {totalExercises} exercises</b>
    </p>
  );
};

const Course = ({ course }) => {
  console.log("single course", course);
  return (
    <div>
      <Header name={course.name} />
      <Content course={course} />
      <Total course={course} />
    </div>
  );
};

export default Course;
