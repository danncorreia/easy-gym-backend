import { MongoClient, ObjectId } from 'mongodb';

async function populateDatabase() {
  const uri = 'mongodb://localhost:27017/easy-gym';
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db();

    // Clear existing data
    await db.collection('exercises').deleteMany({});
    await db.collection('workouts').deleteMany({});
    await db.collection('students').deleteMany({});

    // Insert exercises (removing duplicates)
    const uniqueExercises = [
      {
        _id: new ObjectId(),
        codigo: 1,
        nome: "Agachamento no hack",
        img: "lib/recursos/imagens/agachamento.png",
        series: 2,
        repeticoes: 15,
        carga: 10,
        data_criacao: new Date(),
        data_atualizacao: new Date(),
        ativo: true
      },
      {
        _id: new ObjectId(),
        codigo: 2,
        nome: "Supino reto com barra",
        img: "lib/recursos/imagens/supino.png",
        series: 2,
        repeticoes: 15,
        carga: 10,
        data_criacao: new Date(),
        data_atualizacao: new Date(),
        ativo: true
      }
    ];

    const exerciseResult = await db.collection('exercises').insertMany(uniqueExercises);
    const exerciseIds = Object.values(exerciseResult.insertedIds);

    // Insert workouts
    const workouts = [
      {
        _id: new ObjectId(),
        codigo: 1,
        id_aluno: 1,
        nome: "Treino de força",
        exercicios: [exerciseIds[0], exerciseIds[1], exerciseIds[0], exerciseIds[1], exerciseIds[0], exerciseIds[1]],
        data_criacao: new Date("2019-11-01T12:00-0500"),
        data_atualizacao: new Date("2019-11-01T12:00-0500"),
        ativo: true
      },
      {
        _id: new ObjectId(),
        codigo: 2,
        id_aluno: 2,
        nome: "Treino de resistência",
        exercicios: [exerciseIds[0], exerciseIds[1], exerciseIds[0], exerciseIds[1], exerciseIds[0], exerciseIds[1]],
        data_criacao: new Date("2020-01-15T12:00-0500"),
        data_atualizacao: new Date("2020-01-15T12:00-0500"),
        ativo: true
      },
      {
        _id: new ObjectId(),
        codigo: 3,
        id_aluno: 3,
        nome: "Treino de flexibilidade",
        exercicios: [exerciseIds[0], exerciseIds[1], exerciseIds[0], exerciseIds[1], exerciseIds[0], exerciseIds[1]],
        data_criacao: new Date("2020-03-10T12:00-0500"),
        data_atualizacao: new Date("2020-03-10T12:00-0500"),
        ativo: true
      },
      {
        _id: new ObjectId(),
        codigo: 4,
        id_aluno: 4,
        nome: "Treino de agilidade",
        exercicios: [exerciseIds[0], exerciseIds[1], exerciseIds[0], exerciseIds[1], exerciseIds[0], exerciseIds[1]],
        data_criacao: new Date("2020-05-20T12:00-0500"),
        data_atualizacao: new Date("2020-05-20T12:00-0500"),
        ativo: true
      },
      {
        _id: new ObjectId(),
        codigo: 5,
        id_aluno: 5,
        nome: "Treino de velocidade",
        exercicios: [exerciseIds[0], exerciseIds[1], exerciseIds[0], exerciseIds[1], exerciseIds[0], exerciseIds[1]],
        data_criacao: new Date("2020-07-01T12:00-0500"),
        data_atualizacao: new Date("2020-07-01T12:00-0500"),
        ativo: true
      },
      {
        _id: new ObjectId(),
        codigo: 6,
        id_aluno: 6,
        nome: "Treino de resistência",
        exercicios: [exerciseIds[0], exerciseIds[1], exerciseIds[0], exerciseIds[1], exerciseIds[0], exerciseIds[1]],
        data_criacao: new Date("2020-09-01T12:00-0500"),
        data_atualizacao: new Date("2020-09-01T12:00-0500"),
        ativo: true
      },
      {
        _id: new ObjectId(),
        codigo: 7,
        id_aluno: 7,
        nome: "Treino de força",
        exercicios: [exerciseIds[0], exerciseIds[1], exerciseIds[0], exerciseIds[1], exerciseIds[0], exerciseIds[1]],
        data_criacao: new Date("2020-11-01T12:00-0500"),
        data_atualizacao: new Date("2020-11-01T12:00-0500"),
        ativo: true
      },
      {
        _id: new ObjectId(),
        codigo: 8,
        id_aluno: 8,
        nome: "Treino de flexibilidade",
        exercicios: [exerciseIds[0], exerciseIds[1], exerciseIds[0], exerciseIds[1], exerciseIds[0], exerciseIds[1]],
        data_criacao: new Date("2021-01-01T12:00-0500"),
        data_atualizacao: new Date("2021-01-01T12:00-0500"),
        ativo: true
      },
      {
        _id: new ObjectId(),
        codigo: 9,
        id_aluno: 9,
        nome: "Treino de agilidade",
        exercicios: [exerciseIds[0], exerciseIds[1], exerciseIds[0], exerciseIds[1], exerciseIds[0], exerciseIds[1]],
        data_criacao: new Date("2021-03-01T12:00-0500"),
        data_atualizacao: new Date("2021-03-01T12:00-0500"),
        ativo: true
      },
      {
        _id: new ObjectId(),
        codigo: 10,
        id_aluno: 10,
        nome: "Treino de velocidade",
        exercicios: [exerciseIds[0], exerciseIds[1], exerciseIds[0], exerciseIds[1], exerciseIds[0], exerciseIds[1]],
        data_criacao: new Date("2021-05-01T12:00-0500"),
        data_atualizacao: new Date("2021-05-01T12:00-0500"),
        ativo: true
      }
    ];

    await db.collection('workouts').insertMany(workouts);

    // Insert students
    const students = [
      {
        _id: new ObjectId(),
        codigo: 1,
        id_educador: 1,
        nome: "João Paulo",
        avatar: "lib/recursos/imagens/userpng",
        data_criacao: new Date("2019-11-01T12:00-0500"),
        data_atualizacao: new Date("2019-11-01T12:00-0500"),
        ativo: true
      },
      {
        _id: new ObjectId(),
        codigo: 2,
        id_educador: 2,
        nome: "Maria Silva",
        avatar: "lib/recursos/imagens/user.png",
        data_criacao: new Date("2020-01-15T12:00-0500"),
        data_atualizacao: new Date("2020-01-15T12:00-0500"),
        ativo: true
      },
      {
        _id: new ObjectId(),
        codigo: 3,
        id_educador: 3,
        nome: "Carlos Souza",
        avatar: "lib/recursos/imagens/user.png",
        data_criacao: new Date("2020-03-10T12:00-0500"),
        data_atualizacao: new Date("2020-03-10T12:00-0500"),
        ativo: true
      },
      {
        _id: new ObjectId(),
        codigo: 4,
        id_educador: 4,
        nome: "Ana Pereira",
        avatar: "lib/recursos/imagens/user.png",
        data_criacao: new Date("2020-05-20T12:00-0500"),
        data_atualizacao: new Date("2020-05-20T12:00-0500"),
        ativo: true
      },
      {
        _id: new ObjectId(),
        codigo: 5,
        id_educador: 5,
        nome: "Pedro Lima",
        avatar: "lib/recursos/imagens/user.png",
        data_criacao: new Date("2020-07-01T12:00-0500"),
        data_atualizacao: new Date("2020-07-01T12:00-0500"),
        ativo: true
      },
      {
        _id: new ObjectId(),
        codigo: 6,
        id_educador: 6,
        nome: "Lucas Santos",
        avatar: "lib/recursos/imagens/user.png",
        data_criacao: new Date("2020-09-01T12:00-0500"),
        data_atualizacao: new Date("2020-09-01T12:00-0500"),
        ativo: true
      },
      {
        _id: new ObjectId(),
        codigo: 7,
        id_educador: 7,
        nome: "Fernanda Costa",
        avatar: "lib/recursos/imagens/user.png",
        data_criacao: new Date("2020-11-01T12:00-0500"),
        data_atualizacao: new Date("2020-11-01T12:00-0500"),
        ativo: true
      },
      {
        _id: new ObjectId(),
        codigo: 8,
        id_educador: 8,
        nome: "Juliana Alves",
        avatar: "lib/recursos/imagens/user.png",
        data_criacao: new Date("2021-01-01T12:00-0500"),
        data_atualizacao: new Date("2021-01-01T12:00-0500"),
        ativo: true
      },
      {
        _id: new ObjectId(),
        codigo: 9,
        id_educador: 9,
        nome: "Rafael Oliveira",
        avatar: "lib/recursos/imagens/user.png",
        data_criacao: new Date("2021-03-01T12:00-0500"),
        data_atualizacao: new Date("2021-03-01T12:00-0500"),
        ativo: true
      },
      {
        _id: new ObjectId(),
        codigo: 10,
        id_educador: 10,
        nome: "Mariana Rocha",
        avatar: "lib/recursos/imagens/user.png",
        data_criacao: new Date("2021-05-01T12:00-0500"),
        data_atualizacao: new Date("2021-05-01T12:00-0500"),
        ativo: true
      }
    ];

    await db.collection('students').insertMany(students);

    console.log('Database populated successfully!');
  } catch (error) {
    console.error('Error populating database:', error);
  } finally {
    await client.close();
  }
}

populateDatabase();
