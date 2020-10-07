import { browser, by, element } from 'protractor';
import * as Helper from 'protractor-helper';



export class LoginPage {
  navigateToLogin(): Promise<unknown> {
    return browser.get('/login') as Promise<unknown>;
  }

  emailField = element(by.id('email-input'));
  passwordField = element(by.id('password-input'));
  submitButton = element(by.id('submit-button'));

  //errorMessage = element.all(by.css("app-login")).element(by.className("text-danger"))[0];

  getTitleText(): Promise<string> {
    return element(by.className('title')).element(by.css("h2")).getText() as Promise<string>;
  }

  tokenExists(){
    return browser.executeScript("return !!window.sessionStorage.getItem('token');")
  }

  login(email = '', password = '') {
      this.emailField.sendKeys(email);
      this.passwordField.sendKeys(password);
      this.submitButton.click();
  }

  async goToLoginPageAndSingInWithCrendentials(email, password){ 

    this.navigateToLogin();
    Helper.fillFieldWithText(this.emailField, email)
    Helper.fillFieldWithText(this.passwordField, password)
    Helper.click(this.submitButton)
    return Helper.waitForElementVisibility(element(by.buttonText('Sair'))) 
  }

  async goToLoginPageAndSingInWithAdminCrendentials(){ 

    this.navigateToLogin();
    Helper.fillFieldWithText(this.emailField, "admin@admin.com")
    Helper.fillFieldWithText(this.passwordField, "4G2wR%u96yYzhmGs")
    Helper.click(this.submitButton)
    return Helper.waitForElementVisibility(element(by.buttonText('Sair'))) 
  }
}
