export interface ExerciseDto {
  _id?: number;
  id_treino: number;
  nome: string;
  img?: string;
  series: number;
  repeticoes: number;
  carga: number;
  data_criacao?: Date;
  data_atualizacao?: Date;
  ativo?: boolean;
}

export function makeExercise(props: ExerciseDto): ExerciseDto {
  return {
    _id: props._id,
    id_treino: props.id_treino,
    nome: props.nome,
    img: props.img,
    series: props.series,
    repeticoes: props.repeticoes,
    carga: props.carga,
    data_criacao: props.data_criacao || new Date(),
    data_atualizacao: props.data_atualizacao || new Date(),
    ativo: props.ativo ?? true,
  };
}
