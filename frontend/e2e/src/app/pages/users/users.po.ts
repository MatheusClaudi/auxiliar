import { browser, by, element } from 'protractor';
import { LoginPage } from '../login/login.po';
import { UserNavComponent } from '../../components/user-nav/user-naav.po';
import * as Helper from 'protractor-helper';



export class UsersPage {

  loginPage = new LoginPage();
  userNavComponent = new UserNavComponent();

  async goToUsersWithAdminAccount(){

    this.loginPage.navigateToLogin();
    Helper.fillFieldWithText(this.loginPage.emailField, "admin@admin.com")
    Helper.fillFieldWithText(this.loginPage.passwordField, "4G2wR%u96yYzhmGs")
    Helper.click(this.loginPage.submitButton)
    Helper.waitForElementVisibility(element(by.buttonText('Sair'))).then(
        async () => {
            this.userNavComponent.tryGoToUsers();
            Helper.waitForElementVisibility(this.getUsersTableElement())
        }
    )    
  }

  async login(a, b){

    this.loginPage.navigateToLogin();
    Helper.fillFieldWithText(this.loginPage.emailField, a)
    Helper.fillFieldWithText(this.loginPage.passwordField, b)
    Helper.click(this.loginPage.submitButton)
    Helper.waitForElementVisibility(element(by.buttonText('Sair'))) 
  }

  async logout(){
    Helper.waitForElementVisibility(element(by.buttonText('Sair')))
    Helper.click(element(by.buttonText('Sair')))
    Helper.waitForElementNotToBeVisible(element(by.buttonText('Sair')))
  }

  async goToCreateusers(){
    Helper.click(this.getCreateUserButtonElement())
  }

  getCreateUserButtonElement() {
      return element(by.buttonText('NOVO USUÁRIO'));
  }

  getUsersTableElement(){
    return element(by.tagName('tbody'))
  }
}
