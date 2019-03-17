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
import { TheoryLessonService } from './TheoryLesson.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-theorylesson',
  templateUrl: './TheoryLesson.component.html',
  styleUrls: ['./TheoryLesson.component.css'],
  providers: [TheoryLessonService]
})
export class TheoryLessonComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
  private errorMessage;

  course = new FormControl('', Validators.required);
  TheoryKey = new FormControl('', Validators.required);
  attendance = new FormControl('', Validators.required);
  date = new FormControl('', Validators.required);
  started = new FormControl('', Validators.required);
  duration = new FormControl('', Validators.required);
  locationAddresd = new FormControl('', Validators.required);
  locationInfo = new FormControl('', Validators.required);
  mandatory = new FormControl('', Validators.required);

  constructor(public serviceTheoryLesson: TheoryLessonService, fb: FormBuilder) {
    this.myForm = fb.group({
      course: this.course,
      TheoryKey: this.TheoryKey,
      attendance: this.attendance,
      date: this.date,
      started: this.started,
      duration: this.duration,
      locationAddresd: this.locationAddresd,
      locationInfo: this.locationInfo,
      mandatory: this.mandatory
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    const tempList = [];
    return this.serviceTheoryLesson.getAll()
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
      $class: 'org.holub.dschool.TheoryLesson',
      'course': this.course.value,
      'TheoryKey': this.TheoryKey.value,
      'attendance': this.attendance.value,
      'date': this.date.value,
      'started': this.started.value,
      'duration': this.duration.value,
      'locationAddresd': this.locationAddresd.value,
      'locationInfo': this.locationInfo.value,
      'mandatory': this.mandatory.value
    };

    this.myForm.setValue({
      'course': null,
      'TheoryKey': null,
      'attendance': null,
      'date': null,
      'started': null,
      'duration': null,
      'locationAddresd': null,
      'locationInfo': null,
      'mandatory': null
    });

    return this.serviceTheoryLesson.addAsset(this.asset)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.myForm.setValue({
        'course': null,
        'TheoryKey': null,
        'attendance': null,
        'date': null,
        'started': null,
        'duration': null,
        'locationAddresd': null,
        'locationInfo': null,
        'mandatory': null
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
      $class: 'org.holub.dschool.TheoryLesson',
      'course': this.course.value,
      'attendance': this.attendance.value,
      'date': this.date.value,
      'started': this.started.value,
      'duration': this.duration.value,
      'locationAddresd': this.locationAddresd.value,
      'locationInfo': this.locationInfo.value,
      'mandatory': this.mandatory.value
    };

    return this.serviceTheoryLesson.updateAsset(form.get('TheoryKey').value, this.asset)
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

    return this.serviceTheoryLesson.deleteAsset(this.currentId)
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

    return this.serviceTheoryLesson.getAsset(id)
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      const formObject = {
        'course': null,
        'TheoryKey': null,
        'attendance': null,
        'date': null,
        'started': null,
        'duration': null,
        'locationAddresd': null,
        'locationInfo': null,
        'mandatory': null
      };

      if (result.course) {
        formObject.course = result.course;
      } else {
        formObject.course = null;
      }

      if (result.TheoryKey) {
        formObject.TheoryKey = result.TheoryKey;
      } else {
        formObject.TheoryKey = null;
      }

      if (result.attendance) {
        formObject.attendance = result.attendance;
      } else {
        formObject.attendance = null;
      }

      if (result.date) {
        formObject.date = result.date;
      } else {
        formObject.date = null;
      }

      if (result.started) {
        formObject.started = result.started;
      } else {
        formObject.started = null;
      }

      if (result.duration) {
        formObject.duration = result.duration;
      } else {
        formObject.duration = null;
      }

      if (result.locationAddresd) {
        formObject.locationAddresd = result.locationAddresd;
      } else {
        formObject.locationAddresd = null;
      }

      if (result.locationInfo) {
        formObject.locationInfo = result.locationInfo;
      } else {
        formObject.locationInfo = null;
      }

      if (result.mandatory) {
        formObject.mandatory = result.mandatory;
      } else {
        formObject.mandatory = null;
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
      'course': null,
      'TheoryKey': null,
      'attendance': null,
      'date': null,
      'started': null,
      'duration': null,
      'locationAddresd': null,
      'locationInfo': null,
      'mandatory': null
      });
  }

}
