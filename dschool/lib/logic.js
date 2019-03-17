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

'use strict';
/**
 * Write your transction processor functions here
 */

/**
 * Sample transaction
 * @param {org.holub.dschool.SampleTransaction} sampleTransaction
 * @transaction
 */
async function sampleTransaction(tx) {
    // Save the old value of the asset.
    const oldValue = tx.asset.value;

    // Update the asset with the new value.
    tx.asset.value = tx.newValue;

    // Get the asset registry for the asset.
    const assetRegistry = await getAssetRegistry('org.holub.dschool.SampleAsset');
    // Update the asset in the asset registry.
    await assetRegistry.update(tx.asset);

    // Emit an event for the modified asset.
    let event = getFactory().newEvent('org.holub.dschool', 'SampleEvent');
    event.asset = tx.asset;
    event.oldValue = oldValue;
    event.newValue = tx.newValue;
    emit(event);
}

/**
 * Create course of driving school.
 * @param {org.holub.dschool.CreateCourse} createCourse - create course transaction
 * @transaction
 */

async function createCourse(createCourse){
    const factory = getFactory();
    const NS = 'org.holub.dschool';
    
    // create course
    course = factory.newResource(NS, 'Course', createCourse.Coursekey);
    course.status = 'Created';
    course.started = createCourse.started;
    course.type = createCourse.type;
    course.numberOfStudents = createCourse.numberOfStudents;
    course.studentsFinishedCourse = 0;
    course.instructor = factory.newRelationship(NS, 'Instructor', createCourse.instructor)
    
    const courseRegistry = await getAssetRegistry(NS + '.Course');
    await courseRegistry.addAll([course]);
}

async function createStudentCourse(createStudentCourse){
    const factory = getFactory();
    const NS = 'org.holub.dschool';
    
    // create course
    course = factory.newResource(NS, 'StudentCourse', createCourse.Coursekey);
    course.started = createCourse.started;
    course.type = createCourse.type;
    course.numberOfStudents = createCourse.numberOfStudents;
    course.studentsFinishedCourse = 0;
    course.instructor = factory.newRelationship(NS, 'Instructor', createCourse.instructor)
    
    const courseRegistry = await getAssetRegistry(NS + '.StudentCourse');
    await courseRegistry.addAll([course]);
}

/**
 * atendance of student
 * @param {org.holub.dschool.Attendance} attendance - the TemperatureReading transaction
 * @transaction
 */

 async function attendance(attendance){
    const theory=attendance.theory;

    if (theory.attendance) {
        theory.attendance.push(attendance);
    } else {
        theory.attendance = [attendance];
    }

    const theoryRegistry = await getAssetRegistry('org.holub.dschool.TheoryLesson')
    await theoryRegistry.update(theory)
 }

/**
 * DriveLesson
 * @param {org.holub.dschool.DriveLesson} driveLesson - dreiving lesson transaction
 * @transaction
 */

async function driveLesson(driveLesson){
    const studentCourse=driveLesson.studentCourse;

    if (studentCourse.driveLesson) {
        studentCourse.driveLesson.push(driveLesson);
    } else {
        studentCourse.driveLesson = [driveLesson];
    }

    const studentCourseRegistry = await getAssetRegistry('org.holub.dschool.StudentCourse')
    await studentCourseRegistry.update(studentCourse)
 }

/**
 * Course evaluation
 * @param {org.holub.dschool.CourseEvaluation} courseEvaluation - dreiving lesson transaction
 * @transaction
 */

async function courseEvaluation(courseEvaluation){
    const studentCourse=courseEvaluation.studentCourse;

    if (studentCourse.evaluations) {
        studentCourse.evaluations.push(courseEvaluation);
    } else {
        studentCourse.evaluations = [courseEvaluation];
    }

    const studentCourseRegistry = await getAssetRegistry('org.holub.dschool.StudentCourse')
    await studentCourseRegistry.update(studentCourse)
 }

 /**
 * GET all theory lessons and drives of student
 * @param {org.holub.dschool.DriveLesson} driveLesson - dreiving lesson transaction
 * @transaction
 */

 async function getAllStudentLessonsAndDrives() {
    var Drives = getStudentTheory;
    var theoryLessons
 }
