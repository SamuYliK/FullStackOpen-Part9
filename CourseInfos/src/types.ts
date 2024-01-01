export interface HeaderProps {
    name: string;
}

export interface TotalProps {
    totalExercises: number;
}

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

interface CoursepartGroup extends CoursePartBase {
    groupProjectCount: number;
    kind: "group"
}

interface CoursePartBackground extends CoursePartDescription {
    backgroundMaterial: string;
    kind: "background"
}

interface CoursePartSpecial extends CoursePartDescription {
    requirements: string[];
    kind: "special"
}

export type CoursePart = CoursePartBasic | CoursepartGroup | CoursePartBackground | CoursePartSpecial;