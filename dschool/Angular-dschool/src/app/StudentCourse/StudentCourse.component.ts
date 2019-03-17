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

import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { StudentCourseService } from './StudentCourse.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-studentcourse',
  templateUrl: './StudentCourse.component.html',
  styleUrls: ['./StudentCourse.component.css'],
  providers: [StudentCourseService]
})
export class StudentCourseComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
  private errorMessage;

  CourseKey = new FormControl('', Validators.required);
  course = new FormControl('', Validators.required);
  student = new FormControl('', Validators.required);
  evaluations = new FormControl('', Validators.required);
  driveLesson = new FormControl('', Validators.required);
  failedAtempts = new FormControl('', Validators.required);
  paid = new FormControl('', Validators.required);
  feeStamp = new FormControl('', Validators.required);

  constructor(public serviceStudentCourse: StudentCourseService, fb: FormBuilder) {
    this.myForm = fb.group({
      CourseKey: this.CourseKey,
      course: this.course,
      student: this.student,
      evaluations: this.evaluations,
      driveLesson: this.driveLesson,
      failedAtempts: this.failedAtempts,
      paid: this.paid,
      feeStamp: this.feeStamp
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    const tempList = [];
    return this.serviceStudentCourse.getAll()
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      result.forEach(asset => {
        tempList.push(asset);
      });
      this.allAssets = tempList;
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

	/**
   * Event handler for changing the checked state of a checkbox (handles array enumeration values)
   * @param {String} name - the name of the asset field to update
   * @param {any} value - the enumeration value for which to toggle the checked state
   */
  changeArrayValue(name: string, value: any): void {
    const index = this[name].value.indexOf(value);
    if (index === -1) {
      this[name].value.push(value);
    } else {
      this[name].value.splice(index, 1);
    }
  }

	/**
	 * Checkbox helper, determining whether an enumeration value should be selected or not (for array enumeration values
   * only). This is used for checkboxes in the asset updateDialog.
   * @param {String} name - the name of the asset field to check
   * @param {any} value - the enumeration value to check for
   * @return {Boolean} whether the specified asset field contains the provided value
   */
  hasArrayValue(name: string, value: any): boolean {
    return this[name].value.indexOf(value) !== -1;
  }

  addAsset(form: any): Promise<any> {
    this.asset = {
      $class: 'org.holub.dschool.StudentCourse',
      'CourseKey': this.CourseKey.value,
      'course': this.course.value,
      'student': this.student.value,
      'evaluations': this.evaluations.value,
      'driveLesson': this.driveLesson.value,
      'failedAtempts': this.failedAtempts.value,
      'paid': this.paid.value,
      'feeStamp': this.feeStamp.value
    };

    this.myForm.setValue({
      'CourseKey': null,
      'course': null,
      'student': null,
      'evaluations': null,
      'driveLesson': null,
      'failedAtempts': null,
      'paid': null,
      'feeStamp': null
    });

    return this.serviceStudentCourse.addAsset(this.asset)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.myForm.setValue({
        'CourseKey': null,
        'course': null,
        'student': null,
        'evaluations': null,
        'driveLesson': null,
        'failedAtempts': null,
        'paid': null,
        'feeStamp': null
      });
      this.loadAll();
    })
    .catch((error) => {
      if (error === 'Server error') {
          this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else {
          this.errorMessage = error;
      }
    });
  }


  updateAsset(form: any): Promise<any> {
    this.asset = {
      $class: 'org.holub.dschool.StudentCourse',
      'course': this.course.value,
      'student': this.student.value,
      'evaluations': this.evaluations.value,
      'driveLesson': this.driveLesson.value,
      'failedAtempts': this.failedAtempts.value,
      'paid': this.paid.value,
      'feeStamp': this.feeStamp.value
    };

    return this.serviceStudentCourse.updateAsset(form.get('CourseKey').value, this.asset)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.loadAll();
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }


  deleteAsset(): Promise<any> {

    return this.serviceStudentCourse.deleteAsset(this.currentId)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.loadAll();
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

  setId(id: any): void {
    this.currentId = id;
  }

  getForm(id: any): Promise<any> {

    return this.serviceStudentCourse.getAsset(id)
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      const formObject = {
        'CourseKey': null,
        'course': null,
        'student': null,
        'evaluations': null,
        'driveLesson': null,
        'failedAtempts': null,
        'paid': null,
        'feeStamp': null
      };

      if (result.CourseKey) {
        formObject.CourseKey = result.CourseKey;
      } else {
        formObject.CourseKey = null;
      }

      if (result.course) {
        formObject.course = result.course;
      } else {
        formObject.course = null;
      }

      if (result.student) {
        formObject.student = result.student;
      } else {
        formObject.student = null;
      }

      if (result.evaluations) {
        formObject.evaluations = result.evaluations;
      } else {
        formObject.evaluations = null;
      }

      if (result.driveLesson) {
        formObject.driveLesson = result.driveLesson;
      } else {
        formObject.driveLesson = null;
      }

      if (result.failedAtempts) {
        formObject.failedAtempts = result.failedAtempts;
      } else {
        formObject.failedAtempts = null;
      }

      if (result.paid) {
        formObject.paid = result.paid;
      } else {
        formObject.paid = null;
      }

      if (result.feeStamp) {
        formObject.feeStamp = result.feeStamp;
      } else {
        formObject.feeStamp = null;
      }

      this.myForm.setValue(formObject);

    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

  resetForm(): void {
    this.myForm.setValue({
      'CourseKey': null,
      'course': null,
      'student': null,
      'evaluations': null,
      'driveLesson': null,
      'failedAtempts': null,
      'paid': null,
      'feeStamp': null
      });
  }

}
