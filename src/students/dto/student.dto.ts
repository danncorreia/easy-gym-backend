import { WorkoutDto, makeWorkout } from './workout.dto';

export interface StudentDto {
  _id: string;
  id_educador: number;
  cadastro: Date;
  nome: string;
  avatar: string;
  treinos: WorkoutDto[];
}

export function makeStudent(props: StudentDto): StudentDto {
  return {
    _id: props._id,
    id_educador: props.id_educador,
    cadastro: new Date(props.cadastro),
    nome: props.nome,
    avatar: props.avatar,
    treinos: props.treinos.map(makeWorkout),
  };
}
