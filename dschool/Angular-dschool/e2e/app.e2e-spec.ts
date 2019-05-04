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

import { AngularTestPage } from './app.po';
import { ExpectedConditions, browser, element, by } from 'protractor';
import {} from 'jasmine';


describe('Starting tests for Angular-dschool', function() {
  let page: AngularTestPage;

  beforeEach(() => {
    page = new AngularTestPage();
  });

  it('website title should be Angular-dschool', () => {
    page.navigateTo('/');
    return browser.getTitle().then((result)=>{
      expect(result).toBe('Angular-dschool');
    })
  });

  it('network-name should be dschool@0.1.2',() => {
    element(by.css('.network-name')).getWebElement()
    .then((webElement) => {
      return webElement.getText();
    })
    .then((txt) => {
      expect(txt).toBe('dschool@0.1.2.bna');
    });
  });

  it('navbar-brand should be Angular-dschool',() => {
    element(by.css('.navbar-brand')).getWebElement()
    .then((webElement) => {
      return webElement.getText();
    })
    .then((txt) => {
      expect(txt).toBe('Angular-dschool');
    });
  });

  
    it('DSCourse component should be loadable',() => {
      page.navigateTo('/DSCourse');
      browser.findElement(by.id('assetName'))
      .then((assetName) => {
        return assetName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('DSCourse');
      });
    });

    it('DSCourse table should have 8 columns',() => {
      page.navigateTo('/DSCourse');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(8); // Addition of 1 for 'Action' column
      });
    });
  
    it('Course component should be loadable',() => {
      page.navigateTo('/Course');
      browser.findElement(by.id('assetName'))
      .then((assetName) => {
        return assetName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('Course');
      });
    });

    it('Course table should have 7 columns',() => {
      page.navigateTo('/Course');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(7); // Addition of 1 for 'Action' column
      });
    });
  
    it('StudentCourse component should be loadable',() => {
      page.navigateTo('/StudentCourse');
      browser.findElement(by.id('assetName'))
      .then((assetName) => {
        return assetName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('StudentCourse');
      });
    });

    it('StudentCourse table should have 7 columns',() => {
      page.navigateTo('/StudentCourse');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(7); // Addition of 1 for 'Action' column
      });
    });
  
    it('TheoryLesson component should be loadable',() => {
      page.navigateTo('/TheoryLesson');
      browser.findElement(by.id('assetName'))
      .then((assetName) => {
        return assetName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('TheoryLesson');
      });
    });

    it('TheoryLesson table should have 10 columns',() => {
      page.navigateTo('/TheoryLesson');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(10); // Addition of 1 for 'Action' column
      });
    });
  
    it('DriveLesson component should be loadable',() => {
      page.navigateTo('/DriveLesson');
      browser.findElement(by.id('assetName'))
      .then((assetName) => {
        return assetName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('DriveLesson');
      });
    });

    it('DriveLesson table should have 6 columns',() => {
      page.navigateTo('/DriveLesson');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(6); // Addition of 1 for 'Action' column
      });
    });
  

  
    it('Student component should be loadable',() => {
      page.navigateTo('/Student');
      browser.findElement(by.id('participantName'))
      .then((participantName) => {
        return participantName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('Student');
      });
    });

    it('Student table should have 8 columns',() => {
      page.navigateTo('/Student');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(8); // Addition of 1 for 'Action' column
      });
    });
  
    it('Instructor component should be loadable',() => {
      page.navigateTo('/Instructor');
      browser.findElement(by.id('participantName'))
      .then((participantName) => {
        return participantName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('Instructor');
      });
    });

    it('Instructor table should have 8 columns',() => {
      page.navigateTo('/Instructor');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(8); // Addition of 1 for 'Action' column
      });
    });
  
    it('Police component should be loadable',() => {
      page.navigateTo('/Police');
      browser.findElement(by.id('participantName'))
      .then((participantName) => {
        return participantName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('Police');
      });
    });

    it('Police table should have 5 columns',() => {
      page.navigateTo('/Police');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(5); // Addition of 1 for 'Action' column
      });
    });
  

  
    it('DSCourseEvaluation component should be loadable',() => {
      page.navigateTo('/DSCourseEvaluation');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('DSCourseEvaluation');
      });
    });
  
    it('DSAttendance component should be loadable',() => {
      page.navigateTo('/DSAttendance');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('DSAttendance');
      });
    });
  
    it('CourseEvaluation component should be loadable',() => {
      page.navigateTo('/CourseEvaluation');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('CourseEvaluation');
      });
    });
  
    it('Attendance component should be loadable',() => {
      page.navigateTo('/Attendance');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('Attendance');
      });
    });
  
    it('SetupDrivingSchool component should be loadable',() => {
      page.navigateTo('/SetupDrivingSchool');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('SetupDrivingSchool');
      });
    });
  
    it('SetupAndTest component should be loadable',() => {
      page.navigateTo('/SetupAndTest');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('SetupAndTest');
      });
    });
  
    it('DSSetupAndTest component should be loadable',() => {
      page.navigateTo('/DSSetupAndTest');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('DSSetupAndTest');
      });
    });
  
    it('DumpTheEvidence component should be loadable',() => {
      page.navigateTo('/DumpTheEvidence');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('DumpTheEvidence');
      });
    });
  
    it('DumpTheEvidenceOfSecondModel component should be loadable',() => {
      page.navigateTo('/DumpTheEvidenceOfSecondModel');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('DumpTheEvidenceOfSecondModel');
      });
    });
  
    it('TestQuerySpeedInModels component should be loadable',() => {
      page.navigateTo('/TestQuerySpeedInModels');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('TestQuerySpeedInModels');
      });
    });
  

});