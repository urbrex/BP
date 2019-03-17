import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';
// export namespace org.holub.dschool{
   export abstract class Person extends Participant {
      email: string;
      name: string;
      surname: string;
      addres: Address;
      chipNumber: string;
   }
   export class Address {
      city: string;
      street: string;
      zip: string;
   }
   export class Gps {
      date: Date;
      coordinates: string;
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
   export class Course extends Asset {
      Coursekey: string;
      status: CourseStatus;
      started: Date;
      finished: Date;
      type: CourseType;
      numberOfStudents: number;
      studentsFinishedCourse: number;
      instructor: Instructor;
      theory: TheoryLesson[];
   }
   export class StudentCourse extends Asset {
      CourseKey: string;
      course: Course;
      student: Student;
      evaluations: CourseEvaluation[];
      driveLesson: DriveLesson[];
      failedAtempts: number;
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
   export class CourseEvaluation extends Transaction {
      dateOfTest: Date;
      testResult: string;
      parkingResult: string;
      driveResult: string;
      detail: string;
      studentCourse: StudentCourse;
      testAdministrator: Police;
   }
   export class DriveLesson extends Transaction {
      instructor: Instructor;
      studentCourse: StudentCourse;
      date: Date;
      gpsInfo: Gps[];
   }
   export class Attendance extends Transaction {
      student: Student;
      theory: TheoryLesson;
      arrival: Date;
      departure: Date;
   }
   export class CreateCourse extends Transaction {
   }
   export class CreateStudentCourse extends Transaction {
   }
   export class SampleAsset extends Asset {
      assetId: string;
      value: string;
   }
   export class SampleEvent extends Event {
      asset: SampleAsset;
      oldValue: string;
      newValue: string;
   }
   export class SampleParticipant extends Participant {
      participantId: string;
      firstName: string;
      lastName: string;
   }
   export class SampleTransaction extends Transaction {
      asset: SampleAsset;
      newValue: string;
   }
// }
