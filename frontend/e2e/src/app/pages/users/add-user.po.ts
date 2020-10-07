import { browser, by, element } from 'protractor';
import { UserNavComponent } from '../../components/user-nav/user-naav.po';
import * as Helper from 'protractor-helper';



export class AddUserPage {

  userNavComponent = new UserNavComponent();

  async fillFormFields(firstname, lastname, email, password, passwordconfirmation){
    Helper.fillFieldWithText(this.getFirstNameFieldElement(), firstname)
    Helper.fillFieldWithText(this.getLastNameFieldElement(), lastname)
    Helper.fillFieldWithText(this.getEmailFieldElement(), email)
    Helper.fillFieldWithText(this.getPasswordFieldElement(), password)
    Helper.fillFieldWithText(this.getPasswordConfirmationFieldElement(), passwordconfirmation)
  }

  async adduser(firstname, lastname, email, password, passwordconfirmation, isAdmin){
    this.fillFormFields(firstname, lastname, email, password, passwordconfirmation)
    if(isAdmin){
      Helper.click(this.getAcessLevelButtonElement())
    }
    Helper.click(this.getSubmitFormButtonElement())
  }

 
  getSubmitFormButtonElement() {
      return element(by.buttonText('ADICIONAR'))
  }

  getCancelSubmitFormButtonElement() {
    return element(by.buttonText('CANCELAR'))
  }

  getFirstNameFieldElement(){
    return element(by.id('name-user'))
  }

  getLastNameFieldElement(){
    return element(by.id('lastName'))
  }

  getEmailFieldElement(){
    return element(by.id('email'))
  }

  getPasswordFieldElement(){
    return element(by.id('senha'))
  }
  
  getPasswordConfirmationFieldElement(){
    return element(by.id('conf-senha'))
  }

  getAcessLevelButtonElement(){
    return element(by.id('select-acesslevel'))
  }


  getErrorMessageFirstNameRequiredElement(){ //
    return element(by.id('error-firstname-required')) 
  } 

  getErrorMessageLastNameRequiredElement(){ //
    return element(by.id('error-lastname-required'))
  }
  
  getErrorMessageEmailRequiredElement(){ //
    return element(by.id('error-email-required'))
  }
  
  getErrorMessagePasswordRequiredElement(){ //
    return element(by.id('error-password-required'))
  } 


  getErrorMessageFirstNameUnderSizeElement() { //
    return element(by.id('error-firstname-size'))
  }
  
  getErrorMessageLastNameUnderSizeElement() { //
    return element(by.id('error-lastname-size'))
  }

  getErrorMessagePasswordUnderSizeElement() { //
    return element(by.id('error-password-length'))
  }
    

  getErrorMessageEmailInvalidFormatElement(){ //
    return element(by.id('error-email-invalidformat'))
  }

  getErrorMessageEmailTakenElement(){
    return element(by.id('error-email-taken'))
  }

  getErrorMessagePasswordMatchElement(){
    return element(by.id('error-passwordconfirmation-match'))
  }
}
