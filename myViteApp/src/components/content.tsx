import { ContentProps } from "../types";

const Content = (props: ContentProps) => {
  return props.courses.map((c) => (
    <div key={c.name}>
      <p>
        {c.name} {c.exerciseCount}
      </p>
    </div>
  ));
};

export default Content;
