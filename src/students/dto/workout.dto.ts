export interface ExerciseDto {
  nome: string;
  series: number;
  repeticoes: number;
  peso?: number;
  observacoes?: string;
}

export interface WorkoutDto {
  _id?: string;
  id_aluno: string;
  nome: string;
  exercicios?: ExerciseDto[];
  data_criacao?: Date;
  data_atualizacao?: Date;
  ativo?: boolean;
}

export function makeWorkout(props: WorkoutDto): WorkoutDto {
  return {
    _id: props._id,
    id_aluno: props.id_aluno,
    nome: props.nome,
    exercicios: props.exercicios || [],
    data_criacao: props.data_criacao ? new Date(props.data_criacao) : new Date(),
    data_atualizacao: props.data_atualizacao ? new Date(props.data_atualizacao) : new Date(),
    ativo: props.ativo ?? true,
  };
}
