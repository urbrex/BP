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
 * Initialize some assets and participants for running a driving school.
 * @param {org.holub.dschool.SetupDrivingSchool} setupDrivingSchool - the SetupDemo transaction
 * @transaction
 */
async function setupDrivingSchool(setupDrivingSchool) {  // eslint-disable-line no-unused-vars
    
    const NS = 'org.holub.dschool'
    
    // create instructor
    const instructorAddress = factory.newConcept(NS, 'Address');
    instructorAddress.city = 'Liesek';
    instructorAddress.street = 'Lesna';
    instructorAddress.zip = '000 00';

    const instructor = factory.newResource(NS, 'Instructor', 'MK@mail');
    instructor.address = instructorAddress;
    instructor.email = 'MK@mail';
    instructor.name = 'Maros';
    instructor.surname = 'Kabac';
    instructor.phone = 0904555555;
    instructor.idCard = 'cisloKarty';
    instructor.dateOfBirth = setupDrivingSchool.timestamp;

    // create students
    const studentAddress1 = factory.newConcept(NS, 'Address');
    studentAddress1.city = 'Trstena';
    studentAddress1.street = 'Zelezniciarov';
    studentAddress1.zip = '000 00';

    const student1 = factory.newResource(NS, 'Student', 'NS@mail');
    student1.address = studentAddress1;
    student1.name = 'Nikola';
    student1.surname = 'Strokova';
    student1.phone = 0904555555;
    student1.idCard = 'cisloKarty';
    student1.dateOfBirth = setupDrivingSchool.timestamp;

    const studentAddress2 = factory.newConcept(NS, 'Address');
    studentAddress2.city = 'Tvrdosin';
    studentAddress2.street = 'Bernolakova';
    studentAddress2.zip = '000 00';

    const student2 = factory.newResource(NS, 'Student', 'JK@mail');
    student2.address = studentAddress2;
    student2.name = 'Jan';
    student2.surname = 'Kubica';
    student2.phone = 0904555555;
    student2.idCard = 'cisloKarty';
    student2.dateOfBirth = setupDrivingSchool.timestamp;

    const studentAddress3 = factory.newConcept(NS, 'Address');
    studentAddress3.city = 'Dolny Kubin';
    studentAddress3.street = 'Mieru';
    studentAddress3.zip = '000 00';

    const student3 = factory.newResource(NS, 'Student', 'IS@mail');
    student3.address = studentAddress3;
    student3.name = 'Ivan';
    student3.surname = 'Stevanka';
    student3.phone = 0904555555;
    student3.idCard = 'cisloKarty';
    student3.dateOfBirth = setupDrivingSchool.timestamp;

    const policeman = factory.newConcept(NS, 'Address');
    policeman.city = 'USA';
    policeman.street = 'Valley of Death';
    policeman.zip = '000 00';

    const policeman = factory.newResource(NS, 'Police', 'BW@mail');
    policeman.address = studentAddress3;
    policeman.name = 'Bruce';
    policeman.surname = 'Willis';
    policeman.phone = 0904555555;
    policeman.idCard = 'vsetky';
    policeman.dateOfBirth = setupDrivingSchool.timestamp;

    // add instructor students and policeman
    const studentsRegistry = await getParticipantRegistry(NS + '.Student');
    await studentsRegistry.addAll([student1,student2,student3]);
    const instructorRegistry = await getParticipantRegistry(NS + '.Instructor');
    await instructorRegistry.addAll([instructor]);
    const policeRegistry = await getParticipantRegistry(NS + '.Police');
    await policeRegistry.addAll([policeman]);

    // create course and student Courses
    const course = factory.newResource(NS, 'Course', 'C1');
    course.instructor = factory.newRelationship(NS, 'Instructor', 'MK@mail');
    course.status = 'ACTIVE';
    course.Type = 'B';

    const StudentCourse1 = factory.newResource(NS, 'StudentCourse', 'SC1');
    StudentCourse1.course = factory.newRelationship(NS, 'Course', 'C1');
    StudentCourse1.student = factory.newRelationship(NS, 'Student', 'NS@mail');
    StudentCourse1.paid = 0;
    StudentCourse1.feeStamp = false;
    
    const StudentCourse2 = factory.newResource(NS, 'StudentCourse', 'SC2');
    StudentCourse2.course = factory.newRelationship(NS, 'Course', 'C1');
    StudentCourse2.student = factory.newRelationship(NS, 'Student', 'JK@mail');
    StudentCourse2.paid = 100;
    StudentCourse2.feeStamp = false;

    const StudentCourse3 = factory.newResource(NS, 'StudentCourse', 'SC2');
    StudentCourse3.course = factory.newRelationship(NS, 'Course', 'C1');
    StudentCourse3.student = factory.newRelationship(NS, 'Student', 'IS@mail');
    StudentCourse3.paid = 350;
    StudentCourse3.feeStamp = false;

    //Add Courses
    const courseRegistry = await getAssetRegistry(NS + '.Course');
    await courseRegistry.addAll([course]);
    const studentCourseRegistry = await getAssetRegistry(NS + '.StudentCourse');
    await studentCourseRegistry.addAll([StudentCourse1,StudentCourse2,StudentCourse3]);

    //create theory lessons and drive lessons

    const address = factory.newConcept(NS, 'Address');
    address.city = 'Tvrdosin';
    address.street = 'Vojtasakova';
    address.zip = '000 00';

    const theory1 = factory.newResource(NS, 'TheoryLesson', 'TL1');
    theory1.course = factory.newRelationship(NS, 'Course', 'C1');
    theory1.date = setupDrivingSchool.timestamp;
    theory1.started = setupDrivingSchool.timestamp;
    theory1.duration = 1;
    theory1.mandatory=true;
    theory1.locationAddresd=address;
    theory1.locationInfo='miestnost 1.50'

    const theory2 = factory.newResource(NS, 'TheoryLesson', 'TL2');
    theory2.course = factory.newRelationship(NS, 'Course', 'C1');
    theory2.date = setupDrivingSchool.timestamp;
    theory2.started = setupDrivingSchool.timestamp;
    theory2.duration = 1;
    theory2.mandatory=true;
    theory2.locationAddresd=address;
    theory2.locationInfo='miestnost 1.50'

    const drive1 = factory.newResource(NS, 'DriveLesson', 'DL1');
    drive1.instructor = factory.newRelationship(NS, 'Instructor', 'MK@mail');
    drive1.studentCourse = factory.newRelationship(NS, 'StudentCourse', 'SC1');
    drive1.date=setupDrivingSchool.timestamp;

    const drive2 = factory.newResource(NS, 'DriveLesson', 'DL2');
    drive2.instructor = factory.newRelationship(NS, 'Instructor', 'MK@mail');
    drive2.studentCourse = factory.newRelationship(NS, 'StudentCourse', 'SC1');
    drive2.date=setupDrivingSchool.timestamp;

    const drive3 = factory.newResource(NS, 'DriveLesson', 'DL3');
    drive3.instructor = factory.newRelationship(NS, 'Instructor', 'MK@mail');
    drive3.studentCourse = factory.newRelationship(NS, 'StudentCourse', 'SC1');
    drive3.date=setupDrivingSchool.timestamp;

    const drive4 = factory.newResource(NS, 'DriveLesson', 'DL4');
    drive4.instructor = factory.newRelationship(NS, 'Instructor', 'MK@mail');
    drive4.studentCourse = factory.newRelationship(NS, 'StudentCourse', 'SC2');
    drive4.date=setupDrivingSchool.timestamp;

    const drive5 = factory.newResource(NS, 'DriveLesson', 'DL5');
    drive5.instructor = factory.newRelationship(NS, 'Instructor', 'MK@mail');
    drive5.studentCourse = factory.newRelationship(NS, 'StudentCourse', 'SC2');
    drive5.date=setupDrivingSchool.timestamp;

    const drive6 = factory.newResource(NS, 'DriveLesson', 'DL6');
    drive6.instructor = factory.newRelationship(NS, 'Instructor', 'MK@mail');
    drive6.studentCourse = factory.newRelationship(NS, 'StudentCourse', 'SC3');
    drive6.date=setupDrivingSchool.timestamp;

    //add Lessons

    const theoryRegistry = await getAssetRegistry(NS + '.TheoryLesson');
    await theoryRegistry.addAll([theory1, theory2]);
    const driveCourseRegistry = await getAssetRegistry(NS + '.DriveLesson');
    await driveCourseRegistry.addAll([drive1,drive2,drive3,drive4,drive5,drive6]);
}

 /**
 * GET all theory lessons and drives of student
 * @param {org.holub.dschool.CreateStudentCourse} createStudentCourse - dreiving lesson transaction
 * @transaction
 */
/* 
 async function CreateStudentCourse(createStudentCourse) {
   const factory = getFactory();
   const NS = 'org.holub.dschool'
   
   const studentCourse = createStudentCourse.courses;
   
   //createStudentCourse.courses = factory.newRelationship(NS, 'StudentCourse','C1');
   // if (studentCourse.sc) {
   //     studentCourse.sc.push(createStudentCourse);
    //} else {
    //    studentCourse.sc = [createStudentCourse];
    //}
    // add the temp reading to the shipment
    
    var results= query('getStudentCoursesOfCourse');
    	for (var n = 0; n < results.length; n++) {
        	studentCourse.sc[n]= factory.newRelationship(NS, 'StudentCourse',results[n].CourseKey); 
       	}
   		const courseRegistry = await getAssetRegistry('org.holub.dschool.StudentCourse');
    	await courseRegistry.update(studentCourse);
      
     //  return query('getStudentCoursesOfCourse', {course: 'C1'} )
    //.then(function (results) {
	//	createStudentCourse.courses = 'C1';
     //   for (var n = 0; n < results.length; n++) {
      //      if (createStudentCourse.courses) {
      //  		createStudentCourse.courses.push(results[n].CourseKey);
    	//	} else {
        //		createStudentCourse.courses = results[n].CourseKey;
    	//	}
      // } // for
 // })
 }
*/
/**
 * Create course of driving school.
 * @param {org.holub.dschool.CreateCourse} createCourse - create course transaction
 * @transaction
 */
/*
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
*/
/*
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
*/
/**
 * atendance of student
 * @param {org.holub.dschool.Attendance} attendance - the TemperatureReading transaction
 * @transaction
 */
/*
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
*/
/**
 * DriveLesson
 * @param {org.holub.dschool.DriveLesson} driveLesson - dreiving lesson transaction
 * @transaction
 */
/*
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
*/
/**
 * Course evaluation
 * @param {org.holub.dschool.CourseEvaluation} courseEvaluation - dreiving lesson transaction
 * @transaction
 */
/*
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
*/
