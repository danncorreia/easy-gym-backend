import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Workout, WorkoutDocument } from './schemas/workout.schema';
import { Exercise, ExerciseDocument } from './schemas/exercise.schema';
import { WorkoutDto, ExerciseDto } from './dto/workout.dto';

@Injectable()
export class WorkoutsService {
  constructor(
    @InjectModel(Workout.name) private workoutModel: Model<WorkoutDocument>,
    @InjectModel(Exercise.name) private exerciseModel: Model<ExerciseDocument>,
  ) {}

  async create(createWorkoutDto: WorkoutDto) {
    const workout = new this.workoutModel({
      id_aluno: createWorkoutDto.id_aluno,
      nome: createWorkoutDto.nome,
      exercicios: createWorkoutDto.exercicios || [],
      data_criacao: new Date(),
      data_atualizacao: new Date(),
      ativo: true,
    });
    return workout.save();
  }

  async findAllByStudent(studentId: string) {
    const workouts = await this.workoutModel
      .find({ id_aluno: studentId, ativo: true })
      .lean()
      .sort({ data_criacao: -1 })
      .exec();

    // Fetch exercises for each workout
    const workoutsWithExercises = await Promise.all(
      workouts.map(async (workout) => {
        const exerciseIds = workout.exercicios;
        const exercises = await Promise.all(
          exerciseIds.map(async (exerciseId) => {
            const exercise = await this.exerciseModel.findById(exerciseId).lean().exec();
            return exercise ? {
              _id: exercise._id,
              nome: exercise.nome,
              img: exercise.img,
              series: exercise.series,
              repeticoes: exercise.repeticoes,
              carga: exercise.carga,
              data_criacao: exercise.data_criacao,
              data_atualizacao: exercise.data_atualizacao,
              ativo: exercise.ativo
            } : null;
          })
        );

        return {
          ...workout,
          exercicios: exercises.filter(e => e !== null)
        };
      })
    );

    return workoutsWithExercises;
  }

  async findOne(id: string) {
    const workout = await this.workoutModel
      .findOne({ _id: id, ativo: true })
      .exec();

    if (!workout) {
      throw new NotFoundException(`Workout with ID ${id} not found`);
    }

    return workout;
  }

  async addExercise(workoutId: string, exercise: ExerciseDto) {
    const workout = await this.workoutModel
      .findOneAndUpdate(
        { _id: workoutId },
        {
          $push: { exercicios: exercise },
          $set: { data_atualizacao: new Date() },
        },
        { new: true }
      )
      .exec();

    if (!workout) {
      throw new NotFoundException(`Workout with ID ${workoutId} not found`);
    }

    return workout;
  }

  async update(id: string, updateWorkoutDto: WorkoutDto) {
    const updatedWorkout = await this.workoutModel
      .findByIdAndUpdate(
        id,
        {
          $set: {
            nome: updateWorkoutDto.nome,
            exercicios: updateWorkoutDto.exercicios || [],
            data_atualizacao: new Date(),
          },
        },
        { new: true }
      )
      .exec();

    if (!updatedWorkout) {
      throw new NotFoundException(`Workout with ID ${id} not found`);
    }

    return updatedWorkout;
  }

  async remove(id: string) {
    const workout = await this.workoutModel
      .findByIdAndUpdate(id, { ativo: false }, { new: true })
      .exec();

    if (!workout) {
      throw new NotFoundException(`Workout with ID ${id} not found`);
    }

    return workout;
  }
}
