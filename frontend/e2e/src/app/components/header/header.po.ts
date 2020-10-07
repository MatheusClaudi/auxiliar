import { browser, by, element } from 'protractor';
import * as Helper from 'protractor-helper';


export class HeaderComponent {


  async tryLogout(){
    var logoutLoginButton = await element(by.buttonText('Sair'));
    return await logoutLoginButton.click();
  }

  async tryLogin(){
    var logoutLoginButton = await element(by.buttonText('Entrar'));
    return await logoutLoginButton.click();
  }

  async logout(){
    Helper.waitForElementVisibility(element(by.buttonText('Sair')))
    Helper.click(element(by.buttonText('Sair')))
    Helper.waitForElementNotToBeVisible(element(by.buttonText('Sair')))
  }

  isLoged(){
    return browser.executeScript("return !!window.sessionStorage.getItem('token');")
  }
}
