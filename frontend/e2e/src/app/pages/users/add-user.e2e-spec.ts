import { LoginPage } from '../login/login.po';
import { HeaderComponent } from '../../components/header/header.po';
import { UserNavComponent } from '../../components/user-nav/user-naav.po';

import { browser, logging, element, by, Key } from 'protractor';
import { HomePage } from '../home/home.po';
import { Util } from '../../util/util.po';
import * as Helper from 'protractor-helper';
import { UsersPage } from './users.po';
import { AddUserPage } from './add-user.po';

describe('workspace-project user-creation', () => {
  let headerComponent: HeaderComponent;
  let userNavComponent: UserNavComponent;
  let usersPage: UsersPage;
  let addUserPage: AddUserPage;
  let util: Util;

  beforeEach(async () => {
    headerComponent = new HeaderComponent();
    userNavComponent = new UserNavComponent();
    usersPage = new UsersPage();
    addUserPage = new AddUserPage();
    util = new Util();
  });

  beforeAll(async () => {
    headerComponent = new HeaderComponent();
    userNavComponent = new UserNavComponent();
    usersPage = new UsersPage();
    addUserPage = new AddUserPage();
    util = new Util();

    await browser.waitForAngularEnabled(false);
    usersPage.goToUsersWithAdminAccount();
  });

  
  it('should do a sucessful register of a normal user', async () => {
    await browser.waitForAngularEnabled(false);
    usersPage.goToCreateusers();
    addUserPage.adduser("test", "test", "test@test.com", "test", "test", false)

    Helper.waitForElementVisibility(usersPage.getUsersTableElement()).then( async () => {
        usersPage.logout()
        usersPage.login("test@test.com", "test")
        usersPage.logout()
        usersPage.goToUsersWithAdminAccount();
    })
  });

  it('should do a sucessful register of a admin user', async () => {
    await browser.waitForAngularEnabled(false);
    usersPage.goToCreateusers();
    addUserPage.adduser("test2", "test2", "test2@test.com", "test", "test", true)

    Helper.waitForElementVisibility(usersPage.getUsersTableElement()).then( async () => {
        usersPage.logout()
        usersPage.login("test2@test.com", "test")
        userNavComponent.tryGoToUsers()
        usersPage.logout()
        usersPage.goToUsersWithAdminAccount();
    })
  });


 it('should show a error message when fill firstname field, and retrieve the information', async () => {
  await browser.waitForAngularEnabled(false);
  usersPage.goToCreateusers();
  Helper.fillFieldWithText(addUserPage.getFirstNameFieldElement(), "a").then(
    async () => {
      await addUserPage.getFirstNameFieldElement().sendKeys(Key.RIGHT + Key.BACK_SPACE)
      Helper.waitForElementVisibility(addUserPage.getErrorMessageFirstNameRequiredElement())
      await expect(util.isNotClickable(addUserPage.getSubmitFormButtonElement())).toBe(true)
      Helper.click(addUserPage.getCancelSubmitFormButtonElement())
    }
  )
});

it('should show a error message when fill lastname field, and retrieve the information', async () => {
  await browser.waitForAngularEnabled(false);
  usersPage.goToCreateusers();
  Helper.fillFieldWithText(addUserPage.getLastNameFieldElement(), "a").then(
    async () => {
      await addUserPage.getLastNameFieldElement().sendKeys(Key.RIGHT + Key.BACK_SPACE)
      Helper.waitForElementVisibility(addUserPage.getErrorMessageLastNameRequiredElement())
      await expect(util.isNotClickable(addUserPage.getSubmitFormButtonElement())).toBe(true)
      Helper.click(addUserPage.getCancelSubmitFormButtonElement())
    }
  )
});

it('should show a error message when fill email field, and retrieve the information', async () => {
  await browser.waitForAngularEnabled(false);
  usersPage.goToCreateusers();
  Helper.fillFieldWithText(addUserPage.getEmailFieldElement(), "a").then(
    async () => {
      await addUserPage.getEmailFieldElement().sendKeys(Key.RIGHT + Key.BACK_SPACE)
      Helper.waitForElementVisibility(addUserPage.getErrorMessageEmailRequiredElement())
      await expect(util.isNotClickable(addUserPage.getSubmitFormButtonElement())).toBe(true)
      Helper.click(addUserPage.getCancelSubmitFormButtonElement())
    }
  )
});

it('should show a error message when fill password field, and retrieve the information', async () => {
  await browser.waitForAngularEnabled(false);
  usersPage.goToCreateusers();
  Helper.fillFieldWithText(addUserPage.getPasswordFieldElement(), "a").then(
    async () => {
      await addUserPage.getPasswordFieldElement().sendKeys(Key.RIGHT + Key.BACK_SPACE)
      Helper.waitForElementVisibility(addUserPage.getErrorMessagePasswordRequiredElement())
      await expect(util.isNotClickable(addUserPage.getSubmitFormButtonElement())).toBe(true)
      Helper.click(addUserPage.getCancelSubmitFormButtonElement())
    }
  )
});

it('should show a error message when fill firstname field, with value under two of length', async () => {
  await browser.waitForAngularEnabled(false);
  usersPage.goToCreateusers();
  Helper.fillFieldWithText(addUserPage.getFirstNameFieldElement(), "a").then(
    async () => {
      Helper.waitForElementVisibility(addUserPage.getErrorMessageFirstNameUnderSizeElement())
      await expect(util.isNotClickable(addUserPage.getSubmitFormButtonElement())).toBe(true)
      Helper.click(addUserPage.getCancelSubmitFormButtonElement())
    }
  )
});

it('should show a error message when fill lastname field, with value under two of length', async () => {
  await browser.waitForAngularEnabled(false);
  usersPage.goToCreateusers();
  Helper.fillFieldWithText(addUserPage.getLastNameFieldElement(), "a").then(
    async () => {
      Helper.waitForElementVisibility(addUserPage.getErrorMessageLastNameUnderSizeElement())
      await expect(util.isNotClickable(addUserPage.getSubmitFormButtonElement())).toBe(true)
      Helper.click(addUserPage.getCancelSubmitFormButtonElement())
    }
  )
});

it('should show a error message when fill password field, with value under two of length', async () => {
  await browser.waitForAngularEnabled(false);
  usersPage.goToCreateusers();
  Helper.fillFieldWithText(addUserPage.getPasswordFieldElement(), "a").then(
    async () => {
      Helper.waitForElementVisibility(addUserPage.getErrorMessagePasswordUnderSizeElement())
      await expect(util.isNotClickable(addUserPage.getSubmitFormButtonElement())).toBe(true)
      Helper.click(addUserPage.getCancelSubmitFormButtonElement())
    }
  )
});

it('should show a error message when fill email field with a invalid email', async () => {
  await browser.waitForAngularEnabled(false);
  usersPage.goToCreateusers();
  Helper.fillFieldWithText(addUserPage.getEmailFieldElement(), "aaa").then(
    async () => {
      Helper.waitForElementVisibility(addUserPage.getErrorMessageEmailInvalidFormatElement())
      await expect(util.isNotClickable(addUserPage.getSubmitFormButtonElement())).toBe(true)
      Helper.click(addUserPage.getCancelSubmitFormButtonElement())
    }
  )
});

it('should show a error message when fill email field with a invalid email', async () => {
  await browser.waitForAngularEnabled(false);
  usersPage.goToCreateusers();
  Helper.fillFieldWithText(addUserPage.getEmailFieldElement(), "aaa@").then(
    async () => {
      Helper.waitForElementVisibility(addUserPage.getErrorMessageEmailInvalidFormatElement())
      await expect(util.isNotClickable(addUserPage.getSubmitFormButtonElement())).toBe(true)
      Helper.click(addUserPage.getCancelSubmitFormButtonElement())
    }
  )
});

it('should show a error message when fill email field with a invalid email', async () => {
  await browser.waitForAngularEnabled(false);
  usersPage.goToCreateusers();
  Helper.fillFieldWithText(addUserPage.getEmailFieldElement(), "aaa@aa").then(
    async () => {
      Helper.waitForElementVisibility(addUserPage.getErrorMessageEmailInvalidFormatElement())
      await expect(util.isNotClickable(addUserPage.getSubmitFormButtonElement())).toBe(true)
      Helper.click(addUserPage.getCancelSubmitFormButtonElement())
    }
  )
});

it('should show a error message when fill email field with a already exist email', async () => {
  await browser.waitForAngularEnabled(false);
  usersPage.goToCreateusers();
  Helper.fillFieldWithText(addUserPage.getEmailFieldElement(), "admin@admin.com").then(
    async () => {
      Helper.waitForElementVisibility(addUserPage.getErrorMessageEmailTakenElement())
      await expect(util.isNotClickable(addUserPage.getSubmitFormButtonElement())).toBe(true)
      Helper.click(addUserPage.getCancelSubmitFormButtonElement())
    }
  )
}); 


it('should show a error message when fill password field, and confirm password field with two diferents values', async () => {
  await browser.waitForAngularEnabled(false);
  usersPage.goToCreateusers();
  Helper.fillFieldWithText(addUserPage.getPasswordFieldElement(), "aaa")
  Helper.fillFieldWithText(addUserPage.getPasswordConfirmationFieldElement(), "aaaa").then( async () => {
    Helper.waitForElementVisibility(addUserPage.getErrorMessagePasswordMatchElement())
    await expect(util.isNotClickable(addUserPage.getSubmitFormButtonElement())).toBe(true)
    Helper.click(addUserPage.getCancelSubmitFormButtonElement())
  })
 });


});
