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

import { CourseComponent } from './Course/Course.component';
import { StudentCourseComponent } from './StudentCourse/StudentCourse.component';
import { TheoryLessonComponent } from './TheoryLesson/TheoryLesson.component';
import { SampleAssetComponent } from './SampleAsset/SampleAsset.component';

import { StudentComponent } from './Student/Student.component';
import { InstructorComponent } from './Instructor/Instructor.component';
import { PoliceComponent } from './Police/Police.component';
import { SampleParticipantComponent } from './SampleParticipant/SampleParticipant.component';

import { CourseEvaluationComponent } from './CourseEvaluation/CourseEvaluation.component';
import { DriveLessonComponent } from './DriveLesson/DriveLesson.component';
import { AttendanceComponent } from './Attendance/Attendance.component';
import { CreateCourseComponent } from './CreateCourse/CreateCourse.component';
import { CreateStudentCourseComponent } from './CreateStudentCourse/CreateStudentCourse.component';
import { SampleTransactionComponent } from './SampleTransaction/SampleTransaction.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'Course', component: CourseComponent },
  { path: 'StudentCourse', component: StudentCourseComponent },
  { path: 'TheoryLesson', component: TheoryLessonComponent },
  { path: 'SampleAsset', component: SampleAssetComponent },
  { path: 'Student', component: StudentComponent },
  { path: 'Instructor', component: InstructorComponent },
  { path: 'Police', component: PoliceComponent },
  { path: 'SampleParticipant', component: SampleParticipantComponent },
  { path: 'CourseEvaluation', component: CourseEvaluationComponent },
  { path: 'DriveLesson', component: DriveLessonComponent },
  { path: 'Attendance', component: AttendanceComponent },
  { path: 'CreateCourse', component: CreateCourseComponent },
  { path: 'CreateStudentCourse', component: CreateStudentCourseComponent },
  { path: 'SampleTransaction', component: SampleTransactionComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
 imports: [RouterModule.forRoot(routes)],
 exports: [RouterModule],
 providers: []
})
export class AppRoutingModule { }
