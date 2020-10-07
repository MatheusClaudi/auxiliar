import { LoginPage } from '../login/login.po';
import { HeaderComponent } from '../../components/header/header.po';
import { UserNavComponent } from '../../components/user-nav/user-naav.po';

import { browser, logging, element, by, Key } from 'protractor';
import { HomePage } from '../home/home.po';
import { Util } from '../../util/util.po';
import * as Helper from 'protractor-helper';
import { UsersPage } from '../users/users.po';
import { AddUserPage } from '../users/add-user.po';
import { RetrospectiveDashboardPage } from './retrospective-dashboard.po';
import { CreateRetrospectivePage } from './create-retrospective.po';


describe('workspace-project retrospective-creation', () => {
  let headerComponent: HeaderComponent;
  let userNavComponent: UserNavComponent;
  let usersPage: UsersPage;
  let dashboardPage: RetrospectiveDashboardPage;
  let addUserPage: AddUserPage;
  let createRetrospectivePage: CreateRetrospectivePage;
  let util: Util;

  beforeEach(async () => {
    headerComponent = new HeaderComponent();
    userNavComponent = new UserNavComponent();
    usersPage = new UsersPage();
    dashboardPage = new RetrospectiveDashboardPage();
    addUserPage = new AddUserPage();
    createRetrospectivePage = new CreateRetrospectivePage();
    util = new Util();
  });

  beforeAll(async () => {
    headerComponent = new HeaderComponent();
    userNavComponent = new UserNavComponent();
    usersPage = new UsersPage();
    dashboardPage = new RetrospectiveDashboardPage();
    addUserPage = new AddUserPage();
    createRetrospectivePage = new CreateRetrospectivePage();
    util = new Util();

    await browser.waitForAngularEnabled(false);
/*
    
    usersPage.goToUsersWithAdminAccount()
    usersPage.goToCreateusers()
    addUserPage.adduser("test", "test", "testretrospective@test.com", "testlabels", "testlabels", false)
    headerComponent.logout()
  */
    dashboardPage.goToRetrospectiveWithAccount("testretrospective@test.com", "testlabels")
  });


  it('should do a sucessful register of a retropective, and erase it after', async () => {
    await browser.waitForAngularEnabled(false);

    let addButton = dashboardPage.getCreationRetrospectiveButtonElement()
    Helper.waitForElementVisibility(addButton)
    Helper.click(addButton)
    createRetrospectivePage.createRetrospectiveWithoutSprint("test")
    browser.sleep(3000)
    dashboardPage.deleteRetrospective(dashboardPage.getRetrospectiveElement("test"))
  });

  it('should show a error message when fill firstname field, and retrieve the information', async () => {
    await browser.waitForAngularEnabled(false);
    let addButton = dashboardPage.getCreationRetrospectiveButtonElement()
    Helper.waitForElementVisibility(addButton)
    Helper.click(addButton)

    Helper.fillFieldWithText(createRetrospectivePage.getRetrospectiveNameFieldElement(), "a").then(
      async () => {
        await createRetrospectivePage.getRetrospectiveNameFieldElement().sendKeys(Key.RIGHT + Key.BACK_SPACE)
        Helper.waitForElementVisibility(createRetrospectivePage.getErrorRetroepectiveNameRequiredElement())
        userNavComponent.tryGoToRetrospective()
      }
    )
  });

  it('should show a error message when fill firstname field, and retrieve the information', async () => {
    await browser.waitForAngularEnabled(false);
    let addButton = dashboardPage.getCreationRetrospectiveButtonElement()
    Helper.waitForElementVisibility(addButton)
    Helper.click(addButton)

    Helper.fillFieldWithText(createRetrospectivePage.getRetrospectiveNameFieldElement(), "a").then(
      async () => {
        Helper.waitForElementVisibility(createRetrospectivePage.getErrorRetroepectiveNameUnderSizeElement())
        userNavComponent.tryGoToRetrospective()
      }
    )
  });

  

});
