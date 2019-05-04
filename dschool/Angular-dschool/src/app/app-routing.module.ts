/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';

import { DSCourseComponent } from './DSCourse/DSCourse.component';
import { CourseComponent } from './Course/Course.component';
import { CourseCreateComponent } from './CourseCreate/CourseCreate.component';
import { StudentCourseComponent } from './StudentCourse/StudentCourse.component';
import { TheoryLessonComponent } from './TheoryLesson/TheoryLesson.component';
import { DriveLessonComponent } from './DriveLesson/DriveLesson.component';

import { StudentComponent } from './Student/Student.component';
import { InstructorComponent } from './Instructor/Instructor.component';
import { PoliceComponent } from './Police/Police.component';

import { DSCourseEvaluationComponent } from './DSCourseEvaluation/DSCourseEvaluation.component';
import { DSAttendanceComponent } from './DSAttendance/DSAttendance.component';
import { CourseEvaluationComponent } from './CourseEvaluation/CourseEvaluation.component';
import { AttendanceComponent } from './Attendance/Attendance.component';
import { SetupDrivingSchoolComponent } from './SetupDrivingSchool/SetupDrivingSchool.component';
import { SetupAndTestComponent } from './SetupAndTest/SetupAndTest.component';
import { DSSetupAndTestComponent } from './DSSetupAndTest/DSSetupAndTest.component';
import { DumpTheEvidenceComponent } from './DumpTheEvidence/DumpTheEvidence.component';
import { DumpTheEvidenceOfSecondModelComponent } from './DumpTheEvidenceOfSecondModel/DumpTheEvidenceOfSecondModel.component';
import { TestQuerySpeedInModelsComponent } from './TestQuerySpeedInModels/TestQuerySpeedInModels.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'DSCourse', component: DSCourseComponent },
  { path: 'Course', component: CourseComponent },
  { path: 'CourseCreate', component: CourseCreateComponent },
  { path: 'StudentCourse', component: StudentCourseComponent },
  { path: 'TheoryLesson', component: TheoryLessonComponent },
  { path: 'DriveLesson', component: DriveLessonComponent },
  { path: 'Student', component: StudentComponent },
  { path: 'Instructor', component: InstructorComponent },
  { path: 'Police', component: PoliceComponent },
  { path: 'DSCourseEvaluation', component: DSCourseEvaluationComponent },
  { path: 'DSAttendance', component: DSAttendanceComponent },
  { path: 'CourseEvaluation', component: CourseEvaluationComponent },
  { path: 'Attendance', component: AttendanceComponent },
  { path: 'SetupDrivingSchool', component: SetupDrivingSchoolComponent },
  { path: 'SetupAndTest', component: SetupAndTestComponent },
  { path: 'DSSetupAndTest', component: DSSetupAndTestComponent },
  { path: 'DumpTheEvidence', component: DumpTheEvidenceComponent },
  { path: 'DumpTheEvidenceOfSecondModel', component: DumpTheEvidenceOfSecondModelComponent },
  { path: 'TestQuerySpeedInModels', component: TestQuerySpeedInModelsComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
 imports: [RouterModule.forRoot(routes)],
 exports: [RouterModule],
 providers: []
})
export class AppRoutingModule { }
