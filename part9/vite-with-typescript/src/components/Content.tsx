import type { CoursePart } from "./Part";
import Part from "./Part";
interface ContentProps {
  courseParts: CoursePart[]
}
const Content = (props: ContentProps) => (
  <div>
    {props.courseParts.map((part) => (
      <Part key={part.name}{...part}/>
    ))}
  </div>
)
export default Content;