import { browser, by, element } from 'protractor';
import { UserNavComponent } from '../../components/user-nav/user-naav.po';
import * as Helper from 'protractor-helper';



export class CreateRetrospectivePage {

  userNavComponent = new UserNavComponent();


  async createRetrospectiveWithoutSprint(name){
    Helper.waitForElementVisibility(this.getRetrospectiveNameFieldElement())
    Helper.fillFieldWithText(this.getRetrospectiveNameFieldElement(), name)
    Helper.click(this.getCreationButtonElement())
  }

  getRetrospectiveNameFieldElement(){
    return element(by.id('retrospectivename-input'))
  }

  getErrorRetroepectiveNameRequiredElement(){
    return element(by.id('error-retrospectivename-required'))
  }

  getErrorRetroepectiveNameUnderSizeElement(){
    return element(by.id('error-retrospectivename-size'))
  }
 
  getCreationButtonElement(){
    return element(by.id('create-retrospective'))
  }

  getDropdownButtonElement(){
    return element(by.id('dropdownBasic1'))
  }

  getDropdownSprintListElements(){
    return element(by.id('sprint'))
  }
  
}
