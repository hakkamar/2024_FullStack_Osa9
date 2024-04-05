import { PartProps } from "../types";

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const itaStyle = {
  fontStyle: "italic",
  fontSize: 16,
};

const Part = (course: PartProps) => {
  const kurssi = course.course;

  switch (kurssi.kind) {
    case "basic":
      return (
        <div>
          <strong>
            {kurssi.name} {kurssi.exerciseCount}
          </strong>
          <p style={itaStyle}>{kurssi.description}</p>
        </div>
      );
    case "group":
      return (
        <div>
          <strong>
            {kurssi.name} {kurssi.exerciseCount}
          </strong>
          <p>Project exercies {kurssi.groupProjectCount} </p>
        </div>
      );
    case "background":
      return (
        <div>
          <strong>
            {kurssi.name} {kurssi.exerciseCount}
          </strong>
          <p style={itaStyle}>{kurssi.description}</p>
          <p>submit to {kurssi.backgroundMaterial}</p>
        </div>
      );
    case "special":
      return (
        <div>
          <strong>
            {kurssi.name} {kurssi.exerciseCount}
          </strong>
          <p style={itaStyle}>{kurssi.description}</p>
          <p>required skills: {kurssi.requirements.join(", ")}</p>
        </div>
      );
    default:
      return assertNever(kurssi);
  }
};

export default Part;
