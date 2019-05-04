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
import { InstructorService } from './Instructor.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-instructor',
  templateUrl: './Instructor.component.html',
  styleUrls: ['./Instructor.component.css'],
  providers: [InstructorService]
})
export class InstructorComponent implements OnInit {

  myForm: FormGroup;

  private allParticipants;
  private participant;
  private Paddress;
  private currentId;
  private errorMessage;

  dateOfBirth = new FormControl('', Validators.required);
  phone = new FormControl('', Validators.required);
  idCard = new FormControl('', Validators.required);
  email = new FormControl('', Validators.required);
  name = new FormControl('', Validators.required);
  surname = new FormControl('', Validators.required);
  address = new FormControl('', Validators.required);
  city = new FormControl('', Validators.required);
  street = new FormControl('', Validators.required);
  zip = new FormControl('', Validators.required);


  constructor(public serviceInstructor: InstructorService, fb: FormBuilder) {
    this.myForm = fb.group({
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
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    const tempList = [];
    return this.serviceInstructor.getAll()
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      result.forEach(participant => {
        tempList.push(participant);
      });
      this.allParticipants = tempList;
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
        this.errorMessage = error;
      }
    });
  }

	/**
   * Event handler for changing the checked state of a checkbox (handles array enumeration values)
   * @param {String} name - the name of the participant field to update
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
   * only). This is used for checkboxes in the participant updateDialog.
   * @param {String} name - the name of the participant field to check
   * @param {any} value - the enumeration value to check for
   * @return {Boolean} whether the specified participant field contains the provided value
   */
  hasArrayValue(name: string, value: any): boolean {
    return this[name].value.indexOf(value) !== -1;
  }

  addParticipant(form: any): Promise<any> {
    this.Paddress = {
      $class : "org.holub.dschool.Address",
      "city" : this.city.value,
      "street": this.street.value,
      "zip": this.zip.value
    }
    this.participant = {
      $class: 'org.holub.dschool.Instructor',
      'dateOfBirth': this.dateOfBirth.value,
      'phone': this.phone.value,
      'idCard': this.idCard.value,
      'email': this.email.value,
      'name': this.name.value,
      'surname': this.surname.value,
      'address': this.Paddress
    };

    this.myForm.setValue({
      'dateOfBirth': null,
      'phone': null,
      'idCard': null,
      'email': null,
      'name': null,
      'surname': null,
      'address': null,
      "city" : null,
      "street": null,
      "zip": null
    });

    return this.serviceInstructor.addParticipant(this.participant)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.myForm.setValue({
        'dateOfBirth': null,
        'phone': null,
        'idCard': null,
        'email': null,
        'name': null,
        'surname': null,
        'address': null,
        "city" : null,
        "street": null,
        "zip": null
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


   updateParticipant(form: any): Promise<any> {
    this.Paddress = {
      $class : "org.holub.dschool.Address",
      "city" : this.city.value,
      "street": this.street.value,
      "zip": this.zip.value
    }
    this.participant = {
      $class: 'org.holub.dschool.Instructor',
      'dateOfBirth': this.dateOfBirth.value,
      'phone': this.phone.value,
      'idCard': this.idCard.value,
      'name': this.name.value,
      'surname': this.surname.value,
      'address': this.address.value
    };

    return this.serviceInstructor.updateParticipant(form.get('email').value, this.participant)
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


  deleteParticipant(): Promise<any> {

    return this.serviceInstructor.deleteParticipant(this.currentId)
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

    return this.serviceInstructor.getparticipant(id)
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      const formObject = {
        'dateOfBirth': null,
        'phone': null,
        'idCard': null,
        'email': null,
        'name': null,
        'surname': null,
        'address': null,
        'street':null,
        'zip':null,
        'city':null
      };

      if (result.dateOfBirth) {
        formObject.dateOfBirth = result.dateOfBirth;
      } else {
        formObject.dateOfBirth = null;
      }

      if (result.phone) {
        formObject.phone = result.phone;
      } else {
        formObject.phone = null;
      }

      if (result.idCard) {
        formObject.idCard = result.idCard;
      } else {
        formObject.idCard = null;
      }

      if (result.email) {
        formObject.email = result.email;
      } else {
        formObject.email = null;
      }

      if (result.name) {
        formObject.name = result.name;
      } else {
        formObject.name = null;
      }

      if (result.surname) {
        formObject.surname = result.surname;
      } else {
        formObject.surname = null;
      }

      if (result.address) {
        formObject.address = result.address;
      } else {
        formObject.address = null;
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
      'dateOfBirth': null,
      'phone': null,
      'idCard': null,
      'email': null,
      'name': null,
      'surname': null,
      'address': null,
      'street':null,
      'zip':null,
      'city':null
    });
  }
}
