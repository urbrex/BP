import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';
// export namespace org.holub.dschool{
   export abstract class Person extends Participant {
      email: string;
      name: string;
      surname: string;
      address: Address;
   }
   export class Address {
      city: string;
      street: string;
      zip: string;
   }
   export class Gps {
      hei: string;
      lat: string;
      lon: string;
   }
   export class Student extends Person {
      dateOfBirth: Date;
      phone: number;
      idCard: string;
   }
   export class Instructor extends Person {
      dateOfBirth: Date;
      phone: number;
      idCard: string;
   }
   export class Police extends Person {
   }
   export enum CourseStatus {
      CREATED,
      ACTIVE,
      FINISHED,
   }
   export enum CourseType {
      A1,
      A2,
      A,
      B,
      C,
      D,
      E,
      T,
   }
   export class DSCourse extends Asset {
      Coursekey: string;
      status: CourseStatus;
      started: Date;
      type: CourseType;
      instructor: Instructor;
      studentCourses: DSStudentCourse[];
      theoryLessons: DSTheoryLesson[];
   }
   export class DSStudentCourse {
      student: Student;
      evaluations: DSCourseEvaluation[];
      driveLessons: DSDriveLesson[];
      paid: number;
      feeStamp: boolean;
   }
   export class DSTheoryLesson {
      date: Date;
      started: Date;
      duration: number;
      locationAddresd: Address;
      locationInfo: string;
      mandatory: boolean;
      attendance: DSAttendance[];
   }
   export class DSDriveLesson {
      instructor: Instructor;
      date: Date;
      gpsInfo: Gps[];
   }
   export class DSCourseEvaluation extends Transaction {
      dateOfTest: Date;
      testResult: string;
      parkingResult: string;
      driveResult: string;
      detail: string;
      testAdministrator: Police;
   }
   export class DSAttendance extends Transaction {
      student: Student;
      arrival: Date;
      departure: Date;
   }
   export class Course extends Asset {
      Coursekey: string;
      status: CourseStatus;
      started: Date;
      finished: Date;
      type: CourseType;
      instructor: Instructor;
   }
   export class StudentCourse extends Asset {
      CourseKey: string;
      course: Course;
      student: Student;
      evaluations: CourseEvaluation[];
      paid: number;
      feeStamp: boolean;
   }
   export class TheoryLesson extends Asset {
      course: Course;
      TheoryKey: string;
      attendance: Attendance[];
      date: Date;
      started: Date;
      duration: number;
      locationAddresd: Address;
      locationInfo: string;
      mandatory: boolean;
   }
   export class DriveLesson extends Asset {
      id: string;
      instructor: Instructor;
      studentCourse: StudentCourse;
      date: Date;
      gpsInfo: Gps[];
   }
   export class CourseEvaluation extends Transaction {
      dateOfTest: Date;
      testResult: string;
      parkingResult: string;
      driveResult: string;
      detail: string;
      studentCourse: StudentCourse;
      testAdministrator: Police;
   }
   export class Attendance extends Transaction {
      student: Student;
      theory: TheoryLesson;
      arrival: Date;
      departure: Date;
   }
   export class SetupDrivingSchool extends Transaction {
   }
   export class SetupAndTest extends Transaction {
   }
   export class DSSetupAndTest extends Transaction {
   }
   export class DumpTheEvidence extends Transaction {
   }
   export class DumpTheEvidenceOfSecondModel extends Transaction {
   }
   export class TestQuerySpeedInModels extends Transaction {
      id: string;
      scenario: string;
   }
// }
