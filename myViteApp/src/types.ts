export interface HeaderProps {
  name: string;
}

export interface TotalProps {
  total: number;
}

export interface Cource {
  name: string;
  exerciseCount: number;
}

export interface ContentProps {
  courses: Cource[];
}
