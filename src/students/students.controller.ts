import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Query,
} from '@nestjs/common';
import { StudentsService } from './students.service';
import { WorkoutsService } from './workouts.service';
import { StudentDto } from './dto/student.dto';
import { WorkoutDto, ExerciseDto } from './dto/workout.dto';

@Controller('students')
export class StudentsController {
  constructor(
    private readonly studentsService: StudentsService,
    private readonly workoutsService: WorkoutsService,
  ) {}

  @Post()
  create(@Body() createStudentDto: StudentDto) {
    return this.studentsService.create(createStudentDto);
  }

  @Get()
  findAll(@Query('educatorId') educatorId?: number) {
    if (educatorId) {
      return this.studentsService.findByEducator(educatorId);
    }
    return this.studentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.studentsService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateStudentDto: StudentDto) {
    return this.studentsService.update(id, updateStudentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studentsService.remove(id);
  }

  // Workout endpoints
  @Get(':id/workouts')
  findWorkouts(@Param('id') id: string) {
    return this.workoutsService.findAllByStudent(id);
  }

  @Post(':id/workouts')
  createWorkout(@Param('id') id: string, @Body() createWorkoutDto: WorkoutDto) {
    return this.workoutsService.create({
      ...createWorkoutDto,
      id_aluno: id,
    });
  }

  @Get(':studentId/workouts/:workoutId')
  findOneWorkout(
    @Param('studentId') studentId: string,
    @Param('workoutId') workoutId: string,
  ) {
    return this.workoutsService.findOne(workoutId);
  }

  @Post(':studentId/workouts/:workoutId/exercises')
  addExercise(
    @Param('workoutId') workoutId: string,
    @Body() exercise: ExerciseDto,
  ) {
    return this.workoutsService.addExercise(workoutId, exercise);
  }
}
