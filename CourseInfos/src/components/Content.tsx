import { CoursePart } from "../types";
import Part from "./Part";

const Content = ({ courseParts }: { courseParts: CoursePart[] }): JSX.Element => {
    return (
      <div>
          {courseParts.map(cp => (
            <Part coursePart={cp} key={cp.name}/>
          ))}
      </div>
    );
}

export default Content; 