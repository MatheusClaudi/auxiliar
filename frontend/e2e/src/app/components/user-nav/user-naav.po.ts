import { browser, by, element } from 'protractor';
import * as Helper from 'protractor-helper';

export class UserNavComponent {


  async tryGoToUsers() {
      Helper.waitForElementVisibility(this.getGoToUsersButton())
      Helper.click(this.getGoToUsersButton())
  }

  async tryGoToLabels(){
    Helper.waitForElementVisibility(this.getGoToLabelsButton())
    Helper.click(this.getGoToLabelsButton())
  }
  async tryGoToRetrospective(){
    Helper.waitForElementVisibility(this.getGoToRetrospective())
    Helper.click(this.getGoToRetrospective())
  }

  getGoToUsersButton(){
    return element(by.id('users-route'))
  }

  getGoToLabelsButton(){
    return  element(by.id('labels-route'))
  }

  getGoToRetrospective(){
    return element(by.id('retrospective-route'))
  }

}
