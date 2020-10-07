import { browser, by, element } from 'protractor';
import { UserNavComponent } from '../../components/user-nav/user-naav.po';
import * as Helper from 'protractor-helper';
import { LoginPage } from '../login/login.po';



export class RetrospectiveDashboardPage {

  userNavComponent = new UserNavComponent();

  loginPage = new LoginPage();

  async goToRetrospectiveWithAccount(email, password){

    this.loginPage.goToLoginPageAndSingInWithCrendentials(email, password).then( async () => {
      this.userNavComponent.tryGoToRetrospective();
      Helper.waitForElementVisibility(this.getCreationRetrospectiveButtonElement())
    })
    
  }

  deleteRetrospective(element) {
    Helper.click(this.fromRetrospectiveGetDeleteButton(element))
  }

  getRetrospectiveElement(name){
    return element(by.cssContainingText('.card-board', name))
  }
  
 
  getCreationRetrospectiveButtonElement() {
    return element(by.className('createRetrospective'))
  }

  getRetrospectiveElements(){
    return element.all(by.id('card-board'))  
  }

  fromRetrospectiveGetDeleteButton(element){
    return element.element(by.id('delete'))
  }

}
