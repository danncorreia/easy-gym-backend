export interface EducadorDto {
  _id?: number;
  nome: string;
  numero_registro: string;
  data_nascimento: Date;
  email: string;
  senha: string;
}

export function makeEducador(props: EducadorDto): EducadorDto {
  return {
    _id: props._id,
    nome: props.nome,
    numero_registro: props.numero_registro,
    data_nascimento: new Date(props.data_nascimento),
    email: props.email,
    senha: props.senha ?? '',
  };
}
