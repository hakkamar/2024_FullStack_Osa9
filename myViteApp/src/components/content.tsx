import { ContentProps } from "../types";
import Part from "./part";

const Content = (props: ContentProps) => {
  return props.courses.map((c) => (
    <div key={c.name}>
      <Part course={c} />
      <hr></hr>
    </div>
  ));
};

export default Content;
