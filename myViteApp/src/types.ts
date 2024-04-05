export interface HeaderProps {
  name: string;
}

export interface TotalProps {
  total: number;
}

export interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

export interface CoursePartBasePlus extends CoursePartBase {
  description: string;
}

export interface CoursePartBasic extends CoursePartBasePlus {
  kind: "basic";
}

export interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group";
}

export interface CoursePartBackground extends CoursePartBasePlus {
  backgroundMaterial: string;
  kind: "background";
}

export interface CoursePartSpecial extends CoursePartBasePlus {
  requirements: string[];
  kind: "special";
}

export type CoursePart =
  | CoursePartBasic
  | CoursePartGroup
  | CoursePartBackground
  | CoursePartSpecial;

export interface ContentProps {
  courses: CoursePart[];
}

export interface PartProps {
  course: CoursePart;
}
