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
import { CourseCreateService } from './CourseCreate.service';
import { StudentCourseService } from './../StudentCourse/StudentCourse.service';
import { StudentService } from './../Student/Student.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-course',
  templateUrl: './CourseCreate.component.html',
  styleUrls: ['./CourseCreate.component.css'],
  providers: [CourseCreateService,StudentCourseService,StudentService]
})
export class CourseCreateComponent implements OnInit {

  myForm: FormGroup;
  myEmailForm: FormGroup;
  NewStudForm: FormGroup;
  CK=null;

  private allCourses;
  private allStudentCourses;
  private asset;
  private studentCourse;
  private student;
  private Paddress;
  private currentId;
  private errorMessage;

  Coursekey = new FormControl('', Validators.required);
  status = new FormControl('', Validators.required);
  started = new FormControl('', Validators.required);
  finished = new FormControl('', Validators.required);
  type = new FormControl('', Validators.required);
  instructor = new FormControl('', Validators.required);
  dateOfBirth= new FormControl('', Validators.required);
  phone= new FormControl('', Validators.required);
  idCard= new FormControl('', Validators.required);
  email1= new FormControl('', Validators.required);
  name= new FormControl('', Validators.required);
  surname= new FormControl('', Validators.required);
  address= new FormControl('', Validators.required);
  city = new FormControl('', Validators.required);
  street = new FormControl('', Validators.required);
  zip = new FormControl('', Validators.required);

  email = new FormControl('', Validators.required);

  constructor(public serviceCourse: CourseCreateService,public serviceStudent: StudentService,public serviceStudentCourse: StudentCourseService, fb: FormBuilder) {
    this.myForm = fb.group({
      Coursekey: this.Coursekey,
      status: this.status,
      started: this.started,
      finished: this.finished,
      type: this.type,
      instructor: this.instructor
    });

    this.myEmailForm = fb.group({
      email: this.email
    })

    this.NewStudForm = fb.group({
      dateOfBirth: this.dateOfBirth,
      phone: this.phone,
      idCard: this.idCard,
      email: this.email,
      name: this.name,
      surname: this.surname,
      address: this.address,
      city : this.city,
      street : this.street,
      zip : this.zip
    })
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    const tempList = [];
    const tempList2 = [];
    return this.serviceCourse.getAll(`?filter=%7B%22where%22%3A%7B%22Coursekey%22%3A%22${this.CK}%22%7D%7D`)
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      result.forEach(asset => {
        tempList.push(asset);
      });
      this.allCourses = tempList;
      console.log(this.allCourses)
    })
    .then(() => {
      this.errorMessage = null;
      return this.serviceStudentCourse.getAll(`?filter=%7B%22where%22%3A%7B%22course%22%3A%22resource%3Aorg.holub.dschool.Course%23${this.CK}%22%7D%7D`)
      .toPromise()
    })
    .then((result) => {
      this.errorMessage = null;
      result.forEach(asset => {
        tempList2.push(asset);
      });
      this.allStudentCourses = tempList2;
      console.log(tempList2);
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
    this.CK=this.Coursekey.value;
    this.asset = {
      $class: 'org.holub.dschool.Course',
      'Coursekey': this.Coursekey.value,
      'status': this.status.value,
      'started': this.started.value,
      'finished': this.finished.value,
      'type': this.type.value,
      'instructor': this.instructor.value
    };

    this.myForm.setValue({
      'Coursekey': null,
      'status': null,
      'started': null,
      'finished': null,
      'type': null,
      'instructor': null
    });

    return this.serviceCourse.addAsset(this.asset)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.myForm.setValue({
        'Coursekey': null,
        'status': null,
        'started': null,
        'finished': null,
        'type': null,
        'instructor': null
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

  addStudent(myEmailForm: any): Promise<any> {
    this.studentCourse = {
      $class: 'org.holub.dschool.StudentCourse',
      "CourseKey": `${Date.now()}`,
      "course": `resource:org.holub.dschool.Course#${this.CK}`,
      "student": `resource:org.holub.dschool.Student#${this.email.value}`,
      "evaluations": [],
      "paid": 0,
      "feeStamp": true,
    };

    return this.serviceStudentCourse.addAsset(this.studentCourse)
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
  addNewStud(form: any): Promise<any>{
    this.studentCourse = {
      $class: 'org.holub.dschool.StudentCourse',
      "CourseKey": `${Date.now()}`,
      "course": `resource:org.holub.dschool.Course#${this.CK}`,
      "student": `resource:org.holub.dschool.Student#${this.email.value}`,
      "evaluations": [],
      "paid": 0,
      "feeStamp": true,
    };
    this.Paddress = {
      $class : "org.holub.dschool.Address",
      "city" : this.city.value,
      "street": this.street.value,
      "zip": this.zip.value
    }
    this.student = {
      $class: 'org.holub.dschool.Student',
      'dateOfBirth': this.dateOfBirth.value,
      'phone': this.phone.value,
      'idCard': this.idCard.value,
      'email': this.email.value,
      'name': this.name.value,
      'surname': this.surname.value,
      'address': this.Paddress
    }

    return this.serviceStudent.addParticipant(this.student)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
    })
    .then(() => {
      return this.serviceStudentCourse.addAsset(this.studentCourse)
    .toPromise()
    })
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

  updateAsset(form: any): Promise<any> {
    this.asset = {
      $class: 'org.holub.dschool.Course',
      'status': this.status.value,
      'started': this.started.value,
      'finished': this.finished.value,
      'type': this.type.value,
      'instructor': this.instructor.value
    };

    return this.serviceCourse.updateAsset(form.get('Coursekey').value, this.asset)
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

    return this.serviceCourse.deleteAsset(this.currentId)
    .toPromise()
    .then(() => {
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

    return this.serviceCourse.getAsset(id)
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      const formObject = {
        'Coursekey': null,
        'status': null,
        'started': null,
        'finished': null,
        'type': null,
        'instructor': null
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

      if (result.finished) {
        formObject.finished = result.finished;
      } else {
        formObject.finished = null;
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
      'finished': null,
      'type': null,
      'instructor': null
      });
  }

}
