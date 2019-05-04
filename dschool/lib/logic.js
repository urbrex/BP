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
    const factory = getFactory();
    
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
    instructor.phone = 904555555;
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
    student1.phone = 904555555;
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
    student2.phone = 904555555;
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
    student3.phone = 904555555;
    student3.idCard = 'cisloKarty';
    student3.dateOfBirth = setupDrivingSchool.timestamp;

    const policemanAddress = factory.newConcept(NS, 'Address');
    policemanAddress.city = 'USA';
    policemanAddress.street = 'Valley of Death';
    policemanAddress.zip = '000 00';

    const policeman = factory.newResource(NS, 'Police', 'BW@mail');
    policeman.address = policemanAddress;
    policeman.name = 'Bruce';
    policeman.surname = 'Willis';

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
    course.type = 'B';

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
 * Initialize some assets and participants for running a driving school.
 * @param {org.holub.dschool.DSSetupAndTest} dSSetupAndTest - the SetupDemo transaction
 * @transaction
 */
async function dSSetupAndTest(dSSetupAndTest) {  // eslint-disable-line no-unused-vars
  const factory = getFactory();
  const NS = 'org.holub.dschool';
  let courses=[];
  
  // create 100 courses

  for(let i=0;i<100;i++){
    let course = factory.newResource(NS, 'DSCourse', `DSC${i}`);
    course.status="CREATED";
    course.started=dSSetupAndTest.timestamp;
    course.finished=dSSetupAndTest.timestamp;
    course.type="A";
    course.instructor=factory.newRelationship(NS, 'Instructor', `MK@mail${i}`);
    course.studentCourses=[];
    course.theoryLessons=[];
    for (let j=0;j<10;j++){
      let studentCourse = factory.newConcept(NS, 'DSStudentCourse');
      studentCourse.student=factory.newRelationship(NS, 'Student', `IS@mail${i*10+j}`);
      studentCourse.paid=0;
      studentCourse.feeStamp=false;
      studentCourse.driveLessons=[];
      course.studentCourses.push(studentCourse);
      
      let theory = factory.newConcept(NS, 'DSTheoryLesson');
      theory.date=dSSetupAndTest.timestamp;
      theory.started=dSSetupAndTest.timestamp;
      theory.duration=2+j;
      let locationAddresd = factory.newConcept(NS, 'Address');
      locationAddresd.city="Milano";
      theory.locationAddresd=locationAddresd;
      theory.locationInfo="U mna doma"
      theory.mandatory=true
      course.theoryLessons.push(theory)
      
      
      for (let k=0;k<3;k++){
        let drive = factory.newConcept(NS, 'DSDriveLesson');
        drive.date=dSSetupAndTest.timestamp;
        drive.instructor=factory.newRelationship(NS, 'Instructor', `MK@mail${i}`);
        course.studentCourses[j].driveLessons.push(drive);
      }
    }

    console.log(i);
    courses.push(course);
  }
  console.log("zapisuje");
  const DSCourseRegistry = await getAssetRegistry(NS + '.DSCourse');
  await DSCourseRegistry.addAll(courses);
}

 /**
 * Create attendance of student
 * @param {org.holub.dschool.Attendance} attendance - dreiving lesson transaction
 * @transaction
 */

 async function attendance(attendance) {
   const factory = getFactory();
   const NS = 'org.holub.dschool'
   
   const theoryLesson = attendance.theory;
   
    if (theoryLesson.attendance) {
        theoryLesson.attendance.push(attendance);
    } else {
        theoryLesson.attendance = [attendance];
    }

   	const theoryRegistry = await getAssetRegistry('org.holub.dschool.TheoryLesson');
    await theoryRegistry.update(theoryLesson);
 }

/**
 * Create attendance of student
 * @param {org.holub.dschool.CourseEvaluation} courseEvaluation - dreiving lesson transaction
 * @transaction
 */

async function courseEvaluation(courseEvaluation) {
    const factory = getFactory();
    const NS = 'org.holub.dschool'
    
    const studentCourse = courseEvaluation.studentCourse;
    
     if (studentCourse.evaluations) {
        studentCourse.evaluations.push(courseEvaluation);
     } else {
        studentCourse.evaluations = [courseEvaluation];
     }
 
    const studentCourseRegistry = await getAssetRegistry('org.holub.dschool.StudentCourse');
    await studentCourseRegistry.update(studentCourse);
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
/**
 * Initialize some assets and participants for running a driving school.
 * @param {org.holub.dschool.SetupAndTest} setupAndTest - the SetupDemo transaction
 * @transaction
 */
async function setupAndTest(setupAndTest) {  // eslint-disable-line no-unused-vars
    
    const NS = 'org.holub.dschool'
    const factory = getFactory();
    
    // create 100 instructors
    let instructors= [];
  console.log("creating instructors");
    for(let i=0;i<100;i++){
        let instructorAddress = factory.newConcept(NS, 'Address');
        instructorAddress.city = 'Liesek'+i;
        instructorAddress.street = 'Lesna'+i;
        instructorAddress.zip = '000 00'+i;

        let instructor = factory.newResource(NS, 'Instructor', `MK@mail${i}`);
        instructor.address = instructorAddress;
        instructor.email = 'MK@mail'+i;
        instructor.name = 'Maros'+i;
        instructor.surname = 'Kabac'+i;
        instructor.phone = 904555555;
        instructor.idCard = 'cisloKarty';
        instructor.dateOfBirth = setupAndTest.timestamp;

        instructors.push(instructor);
    }
      console.log("creating students");
    // create students
    let students= [];
    for(let i=0;i<1000;i++){
        let studentAddress1 = factory.newConcept(NS, 'Address');
        studentAddress1.city = 'Trstena';
        studentAddress1.street = 'Zelezniciarov';
        studentAddress1.zip = '000 00';

        let student1 = factory.newResource(NS, 'Student', `NS@mail${i}`);
        student1.address = studentAddress1;
        student1.name = 'Nikola';
        student1.surname = 'Strokova';
        student1.phone = 904555555;
        student1.idCard = 'cisloKarty';
        student1.dateOfBirth =setupAndTest.timestamp;
        
        students.push(student1);
    }
  console.log("creating policeman");
    let policemans = [];
    for(let i=0;i<100;i++){
        let policemanAddress = factory.newConcept(NS, 'Address');
        policemanAddress.city = 'USA';
        policemanAddress.street = 'Valley of Death';
        policemanAddress.zip = '000 00';

        let policeman = factory.newResource(NS, 'Police', `BW@mail${i}`);
        policeman.address = policemanAddress;
        policeman.name = 'Bruce';
        policeman.surname = 'Willis';
        policemans.push(policeman);
    }
    // add instructor students and policeman
    const studentsRegistry = await getParticipantRegistry(NS + '.Student');
    await studentsRegistry.addAll(students);
    const instructorRegistry = await getParticipantRegistry(NS + '.Instructor');
    await instructorRegistry.addAll(instructors);
    const policeRegistry = await getParticipantRegistry(NS + '.Police');
    await policeRegistry.addAll(policemans);

    // create course and student Courses
    console.log("creating courses");
    let courses= [];
    for(let i=0;i<100;i++){
        let course = factory.newResource(NS, 'Course', `${i}`);
        course.instructor = factory.newRelationship(NS, 'Instructor', `MK@mail${i}`);
        course.status = 'ACTIVE';
        course.type = 'B';
        courses.push(course);
    }
    console.log("creating student courses");
    let studentCourses= [];
    for(let i=0;i<1000;i++){
        let StudentCourse = factory.newResource(NS, 'StudentCourse', `${i}`);
        StudentCourse.course = factory.newRelationship(NS, 'Course', `${i%10}`);
        StudentCourse.student = factory.newRelationship(NS, 'Student', `NS@mail${i}`);
        StudentCourse.paid = 0;
        StudentCourse.feeStamp = false;
        studentCourses.push(StudentCourse);
    }
    console.log("add courses to registy");
    //Add Courses
    const courseRegistry = await getAssetRegistry(NS + '.Course');
    await courseRegistry.addAll(courses);
    console.log("add student courses to registy");
    const studentCourseRegistry = await getAssetRegistry(NS + '.StudentCourse');
    await studentCourseRegistry.addAll(studentCourses);

    //create theory lessons and drive lessons
    console.log("create theory lesson");
    let address = factory.newConcept(NS, 'Address');
    address.city = 'Tvrdosin';
    address.street = 'Vojtasakova';
    address.zip = '000 00';

    let theories= [];
    for(let i=0;i<1000;i++){
    let theory = factory.newResource(NS, 'TheoryLesson', `${i}`);
    theory.course = factory.newRelationship(NS, 'Course', `${i%10}`);
    theory.date = setupAndTest.timestamp;
    theory.started = setupAndTest.timestamp;
    theory.duration = 1;
    theory.mandatory=true;
    theory.locationAddresd=address;
    theory.locationInfo='miestnost 1.50'
    theories.push(theory);
    }
	console.log("create drive lessons");
    let drives= [];
    for(let i=0;i<3000;i++){
    let drive = factory.newResource(NS, 'DriveLesson', `${i}`);
    drive.instructor = factory.newRelationship(NS, 'Instructor', `MK@mail${i%30}`);
    drive.studentCourse = factory.newRelationship(NS, 'StudentCourse', `${i%3}`);
    drive.date=setupAndTest.timestamp;
    drives.push(drive);
    }

    console.log("add theory and drives");
    const theoryRegistry = await getAssetRegistry(NS + '.TheoryLesson');
    await theoryRegistry.addAll(theories);
    const driveCourseRegistry = await getAssetRegistry(NS + '.DriveLesson');
    await driveCourseRegistry.addAll(drives);
    console.log("finished");
}

/**
 * Delete all assets participants an transactions created by Second demo.
 * @param {org.holub.dschool.DumpTheEvidenceOfSecondModel} dumpTheEvidenceOfSecondModel - the DumpTheEvidence transaction
 * @transaction
 */
async function dumpTheEvidenceOfSecondModel(dumpTheEvidenceOfSecondModel) {
  const NS = 'org.holub.dschool'
  let DScourses=[];
  for(let i=0;i<100;i++){
    
    const logRegistry = await getAssetRegistry('org.holub.dschool.DSCourse');
    let bool = await logRegistry.exists(`DSC${i}`);
    console.log(bool)
    if (bool)
    DScourses.push(`DSC${i}`);
      /*
    return getAssetRegistry(NS + '.DSCourse')
    .then(function (ds) {
      // Determine if the specific vehicle exists in the vehicle asset registry.
      return ds.exists(`DSC${i}`);
    })
    .then(function (exists) {
      console.log(exists)
      if(exists)
      	DScourses.push(`DSC${i}`);
    })
    .catch(function (error) {
      // Add optional error handling here.
    });*/
    
  }
   return getAssetRegistry(NS + '.DSCourse')
  .then(function (DSCourseReg) {
    return DSCourseReg.removeAll(DScourses);
  })
}
/**
 * Delete all assets participants an transactions created by demo.
 * @param {org.holub.dschool.DumpTheEvidence} dumpTheEvidence - the DumpTheEvidence transaction
 * @transaction
 */
async function dumpTheEvidence(dumpTheEvidence) {
  
  const NS = 'org.holub.dschool'
  let instructors=[];
  let students=[];
  let policemans=[];
  let courses=[];
  let studentcourses=[];
  let theories=[];
  let drives=[];
  
  for(let i=0;i<100;i++){
  	instructors.push(`MK@mail${i}`);
  	policemans.push(`BW@mail${i}`);
  	courses.push(`${i}`);
  }
  console.log(1);
  
  for(let i=0;i<1000;i++){
  	students.push(`NS@mail${i}`);
    studentcourses.push(`${i}`);
    theories.push(`${i}`);
  }
  console.log(2);
  for(let i=0;i<3000;i++){
  	drives.push(`${i}`);
  }
  console.log(3);
  return getAssetRegistry(NS + '.TheoryLesson')
  .then(function (vehicleAssetRegistry) {
    return vehicleAssetRegistry.removeAll(theories);
  })
  .then(function(){
    return getAssetRegistry(NS + '.DriveLesson')
  })
  .then(function (vehicleAssetRegistry) {
  	return vehicleAssetRegistry.removeAll(drives);
  })
  .then(function(){
    console.log(3);
    return getAssetRegistry(NS + '.StudentCourse')
  })
  .then(function (vehicleAssetRegistry) {
    return vehicleAssetRegistry.removeAll(studentcourses);
  })
  .then(function(){
    return getAssetRegistry(NS + '.Course')	
  })
  .then(function (vehicleAssetRegistry) {
   	return vehicleAssetRegistry.removeAll(courses);
  })
  .then(function(){
    return getParticipantRegistry(NS + '.Instructor')
  })
  .then(function (vehicleAssetRegistry) {
    console.log(4);
   	return vehicleAssetRegistry.removeAll(instructors);
  })
  .then(function(){
    return getParticipantRegistry(NS + '.Student')
  })
  .then(function (vehicleAssetRegistry) {
    return vehicleAssetRegistry.removeAll(students);
  })
  .then(function(){
    return getParticipantRegistry(NS + '.Police')
  })
  .then(function (vehicleAssetRegistry) {
    return vehicleAssetRegistry.removeAll(policemans);
  })
}

function DSGetAllStudentCourses(attr){
   return new Promise((resolve, reject) => {
    resolve(response);
  })
}

function GetAllStudentCourses(attr){
   return new Promise((resolve, reject) => {
    resolve(response);
  })
}

function UpdateMultipleStudentDrives(attr) {
  return new Promise((resolve, reject) => {
    let re=[];
    return getAssetRegistry('org.holub.dschool.DriveLesson')
    .then(function(registry){
    	return registry.getAll();
    })
    .then(function(drives){
    	
      	drives.forEach(function(el) {
        	if (el.studentCourse.$identifier===attr.id){
              el.date=attr.timestamp
              re.push(el);
            }
        })
        resolve();
    })
    .then(function () {
      return getAssetRegistry('org.holub.dschool.DriveLesson')
    })  
    .then(function (DSCourseRgistry) {
      return DSCourseRgistry.updateAll(re);
    })
    .then(() => {
      console.log("sxxwsdf")
    	resolve()
    })
    .catch(function (error) {
      console.log(error)
    });
  })
}

function DSUpdateMultipleStudentDrives(attr) {
  return new Promise((resolve, reject) => {
    let c=[]
    return getAssetRegistry('org.holub.dschool.DSCourse')
    .then(function (DSCourseRgistry) {
      console.log("4");
      return DSCourseRgistry.getAll();
    })
    .then(function (courses) {
       courses.forEach(function(el) {
         el.studentCourses.forEach(function(elem) {
  			if (elem.student.$identifier===attr.id){
              elem.driveLessons.forEach(function(drive) {
              	drive.date=attr.timestamp
              })
              c.push(el)
            }
         });
	  });
    }) 
    .then(function () {
      return getAssetRegistry('org.holub.dschool.DSCourse')
    })  
    .then(function (DSCourseRgistry) {
      console.log(c)
      return DSCourseRgistry.updateAll(c);
    })
    .then(() => {
      console.log("sxxwsdf")
    	resolve()
    })
    .catch(function (error) {
      console.log(error)
    });
    console.log('TKA')
    //resolve()
  })
}

function FetchAllData() {
  return new Promise((resolve, reject) => {
    let allCourses=[];
    let allStudentCourses=[];
    
    return getAssetRegistry('org.holub.dschool.Course')
    .then(function (CourseRgistry) {
      return CourseRgistry.getAll();
    })
    .then(function (courses) {
      for (let i=0;i<courses.length;i++){
        let j=Number(courses[i].$identifier)
        allCourses[j]=courses[i];
        allCourses[j].studentCourses=[];
        allCourses[j].theories=[];
      }
    })
    .then(function () {
      return getAssetRegistry('org.holub.dschool.TheoryLesson');
    })
    .then(function (TheoryLessonRgistry) {
      return TheoryLessonRgistry.getAll();
    })
    .then(function (theoryLesson) {
      for (let i=0;i<theoryLesson.length;i++){
  		allCourses[theoryLesson[i].course.$identifier].theories.push(theoryLesson[i]);
      }
    })
    
    .then(function () {
      return getAssetRegistry('org.holub.dschool.StudentCourse');
    })
    .then(function (StudentCourseRgistry) {
      return StudentCourseRgistry.getAll();
    })
    .then(function (studentCourses) {
      for (let i=0;i<studentCourses.length;i++){
        let j=Number(studentCourses[i].$identifier);
        allStudentCourses[j]=studentCourses[i];
        allStudentCourses[j].evaluations=[];
        allStudentCourses[j].drives=[];
      }
    })
    .then(function () {
      return getAssetRegistry('org.holub.dschool.DriveLesson');
    })
    .then(function (DriveLessonRgistry) {
      return DriveLessonRgistry.getAll();
    })
    .then(function (driveLesson) {
      for (let i=0;i<driveLesson.length;i++){
        allStudentCourses[driveLesson[i].studentCourse.$identifier].drives.push(driveLesson[i]);
      }
    })
    .then(function () {
      allStudentCourses.forEach(function(el) {
  		allCourses[el.course.$identifier].studentCourses.push(el);
	  });
      console.log('F3')
      resolve(allCourses);
    })
  })
}


function DSFetchAllData(attr) {
  return new Promise((resolve, reject) => {
    console.log("3");
    return getAssetRegistry('org.holub.dschool.DSCourse')
    .then(function (DSCourseRgistry) {
      console.log("4");
      return DSCourseRgistry.getAll();
    })
    .then(function (courses) {
      console.log("5");
      resolve(courses);
    })  
    .catch(function (error) {
      
    });
    
  })
}

/**
 * Test query speed of two different models. In first one data must be assembled from different tables by references. In second one 
 * @param {org.holub.dschool.TestQuerySpeedInModels} testQuerySpeedInModels - the DumpTheEvidence transaction
 * @transaction
 */
async function testQuerySpeedInModels(testQuerySpeedInModels) {
  console.log("1");
  const factory = getFactory();
  const NS = 'org.holub.dschool'
  let t0 = new Date().getTime();
  let t1;
  console.log("2");
  return DSUpdateMultipleStudentDrives(testQuerySpeedInModels)
  /*return getAssetRegistry('org.holub.dschool.DSCourse')
  .then(function (DSCourseRgistry) {
    console.log("4");
    return DSCourseRgistry.getAll();
  })*/
  .then(() => {
    t1 = new Date().getTime();
    
    console.log((t1-t0)/1000 + "s fetched ");   
    return null;
  })
  .catch(error => console.log(error));
  /*
 t1 = new Date().getTime();
  let theTimeBitch=t1-t0;
  let testLog = factory.newResource(NS, 'ModelTest', testQuerySpeedInModels.id);
  testLog.scenario=testQuerySpeedInModels.scenario;
  testLog.time=("taken " + theTimeBitch + " miliseconds" + t0 +" odd " +t1);
  
  //const logRegistry = await getAssetRegistry('org.holub.dschool.ModelTest');
  //await logRegistry.add(testLog);
  getAssetRegistry('org.holub.dschool.ModelTest')
  .then((res) => {
    res.add(testLog);
  })*/
}