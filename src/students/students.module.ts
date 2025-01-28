import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StudentsService } from './students.service';
import { WorkoutsService } from './workouts.service';
import { StudentsController } from './students.controller';
import { Student, StudentSchema } from './schemas/student.schema';
import { Workout, WorkoutSchema } from './schemas/workout.schema';
import { Exercise, ExerciseSchema } from './schemas/exercise.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Student.name, schema: StudentSchema },
      { name: Workout.name, schema: WorkoutSchema },
      { name: Exercise.name, schema: ExerciseSchema },
    ]),
  ],
  controllers: [StudentsController],
  providers: [StudentsService, WorkoutsService],
})
export class StudentsModule {}
