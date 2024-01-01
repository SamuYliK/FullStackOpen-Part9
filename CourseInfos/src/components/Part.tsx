import { CoursePart } from "../types";

const assertNever = (value: never): never => {
    throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
};

const Part = ({ coursePart }: { coursePart: CoursePart }) => {
    switch (coursePart.kind){
        case "basic":
            return (
                <>
                    <p>
                        <b>{coursePart.name} {coursePart.exerciseCount}
                        </b>
                        <br></br>
                        <em>{coursePart.description}</em>
                    </p>
                </>
            );
        case "group":
            return (
                <>
                    <p>
                        <b>{coursePart.name} {coursePart.exerciseCount}</b>
                        <br></br>
                        Project exercises: {coursePart.groupProjectCount}
                    </p>
                </>
            );
        case "background":
            return (
                <>
                    <p>
                        <b>{coursePart.name} {coursePart.exerciseCount}</b>
                        <br></br>
                        <em>{coursePart.description}</em>
                        <br></br>
                        Background material: {coursePart.backgroundMaterial}
                    </p>
                </>
            );
        case "special": {
            let skills = 'Required skills: ';
            coursePart.requirements.forEach(r => {
                skills += r + ', ';
            });
            skills = skills.slice(0, skills.length - 2);
            return (
                <>
                    <p>
                        <b>{coursePart.name} {coursePart.exerciseCount}</b>
                        <br></br>
                        <em>{coursePart.description}</em>
                        <br></br>
                        {skills}
                    </p>
                </>
            );
        }            
        default:
            return assertNever(coursePart);
    }
};

export default Part;