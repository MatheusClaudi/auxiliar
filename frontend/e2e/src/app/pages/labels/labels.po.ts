import { browser, by, element } from 'protractor';
import { UserNavComponent } from '../../components/user-nav/user-naav.po';
import * as Helper from 'protractor-helper';
import { LoginPage } from '../login/login.po';



export class LabelsPage {

  userNavComponent = new UserNavComponent();
  loginPage = new LoginPage();

  async goToLabelsWithAccount(email, password){

    this.loginPage.goToLoginPageAndSingInWithCrendentials(email, password).then( async () => {
      this.userNavComponent.tryGoToLabels();
      Helper.waitForElementVisibility(this.getInitCreationTagElement())
    })
    
  }

  getLabelElementByLabelName(name){
    return element(by.cssContainingText('.card-tag', name))
  }
  


  getInitCreationTagElement(){
      return element(by.id('new-tag'))
  }

  getAddTagNameFieldElement(){
    return element(by.id('tag-name-field'))
  }

  getTagNameFieldElement(){
      return element(by.id('input-tag'))
  }

  getSubimitTagButtonElement(){
    return element(by.id('submit-tag'))
  }

  getTagCardsElements(){
    return element.all(by.id('card-tag'))  
  }

  getListLabelElement(){
    return element(by.className('list-tags'))
  }

  fromLabelElementGetEditButtonElement(labelElement){
    return labelElement.element(by.id('edit-label'))
  }

  fromLabelElementGetDeleteButtonElement(labelElement){
    return labelElement.element(by.id('remove-label'))
  }

  fromLabelElementGetEditFieldElement(labelElement){
    return labelElement.element(by.className('updateTag'))
  }

}
