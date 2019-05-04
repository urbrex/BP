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
import { DSCourseService } from './DSCourse.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-dscourse',
  templateUrl: './DSCourse.component.html',
  styleUrls: ['./DSCourse.component.css'],
  providers: [DSCourseService]
})
export class DSCourseComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
  private errorMessage;

  Coursekey = new FormControl('', Validators.required);
  status = new FormControl('', Validators.required);
  started = new FormControl('', Validators.required);
  type = new FormControl('', Validators.required);
  instructor = new FormControl('', Validators.required);
  studentCourses = new FormControl('', Validators.required);
  theoryLessons = new FormControl('', Validators.required);

  constructor(public serviceDSCourse: DSCourseService, fb: FormBuilder) {
    this.myForm = fb.group({
      Coursekey: this.Coursekey,
      status: this.status,
      started: this.started,
      type: this.type,
      instructor: this.instructor,
      studentCourses: this.studentCourses,
      theoryLessons: this.theoryLessons
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    const tempList = [];
    return this.serviceDSCourse.getAll()
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
      $class: 'org.holub.dschool.DSCourse',
      'Coursekey': this.Coursekey.value,
      'status': this.status.value,
      'started': this.started.value,
      'type': this.type.value,
      'instructor': this.instructor.value,
      'studentCourses': this.studentCourses.value,
      'theoryLessons': this.theoryLessons.value
    };

    this.myForm.setValue({
      'Coursekey': null,
      'status': null,
      'started': null,
      'type': null,
      'instructor': null,
      'studentCourses': null,
      'theoryLessons': null
    });

    return this.serviceDSCourse.addAsset(this.asset)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.myForm.setValue({
        'Coursekey': null,
        'status': null,
        'started': null,
        'type': null,
        'instructor': null,
        'studentCourses': null,
        'theoryLessons': null
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
      $class: 'org.holub.dschool.DSCourse',
      'status': this.status.value,
      'started': this.started.value,
      'type': this.type.value,
      'instructor': this.instructor.value,
      'studentCourses': this.studentCourses.value,
      'theoryLessons': this.theoryLessons.value
    };

    return this.serviceDSCourse.updateAsset(form.get('Coursekey').value, this.asset)
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

    return this.serviceDSCourse.deleteAsset(this.currentId)
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

    return this.serviceDSCourse.getAsset(id)
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      const formObject = {
        'Coursekey': null,
        'status': null,
        'started': null,
        'type': null,
        'instructor': null,
        'studentCourses': null,
        'theoryLessons': null
      };

      if (result.Coursekey) {
        formObject.Coursekey = result.Coursekey;
      } else {
        formObject.Coursekey = null;
      }

      if (result.status) {
        formObject.status = result.status;
      } else {
        formObject.status = null;
      }

      if (result.started) {
        formObject.started = result.started;
      } else {
        formObject.started = null;
      }

      if (result.type) {
        formObject.type = result.type;
      } else {
        formObject.type = null;
      }

      if (result.instructor) {
        formObject.instructor = result.instructor;
      } else {
        formObject.instructor = null;
      }

      if (result.studentCourses) {
        formObject.studentCourses = result.studentCourses;
      } else {
        formObject.studentCourses = null;
      }

      if (result.theoryLessons) {
        formObject.theoryLessons = result.theoryLessons;
      } else {
        formObject.theoryLessons = null;
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
      'Coursekey': null,
      'status': null,
      'started': null,
      'type': null,
      'instructor': null,
      'studentCourses': null,
      'theoryLessons': null
      });
  }

}
