import { LoginPage } from '../login/login.po';
import { HeaderComponent } from '../../components/header/header.po';
import { UserNavComponent } from '../../components/user-nav/user-naav.po';

import { browser, logging, element, by, Key } from 'protractor';
import { HomePage } from '../home/home.po';
import { Util } from '../../util/util.po';
import * as Helper from 'protractor-helper';
import { UsersPage } from '../users/users.po';
import { AddUserPage } from '../users/add-user.po';
import { LabelsPage } from './labels.po';


describe('workspace-project label-edition', () => {
  let headerComponent: HeaderComponent;
  let userNavComponent: UserNavComponent;
  let labelsPage: LabelsPage;
  let usersPage: UsersPage;
  let addUserPage: AddUserPage;
  let util: Util;

  beforeEach(async () => {
    headerComponent = new HeaderComponent();
    userNavComponent = new UserNavComponent();
    labelsPage = new LabelsPage();
    usersPage = new UsersPage();
    addUserPage = new AddUserPage();
    util = new Util();
  });

  beforeAll(async () => {
    headerComponent = new HeaderComponent();
    userNavComponent = new UserNavComponent();
    labelsPage = new LabelsPage();
    usersPage = new UsersPage();
    addUserPage = new AddUserPage();
    util = new Util();

    await browser.waitForAngularEnabled(false);

    /*
    usersPage.goToUsersWithAdminAccount()
    usersPage.goToCreateusers()
    addUserPage.adduser("test", "test", "testlabels2@testlabels.com", "testlabels", "testlabels", false)
    headerComponent.logout()
    */
    labelsPage.goToLabelsWithAccount("testlabels@testlabels.com", "testlabels")
  });

/*
  it('should do a sucessful register of a label, edit it and erase it after', async () => {
    await browser.waitForAngularEnabled(false);
    let aux = await labelsPage.getLabelElementByLabelName("Something")
    Helper.click(labelsPage.fromLabelElementGetEditButtonElement(aux))
    Helper.waitForElementVisibility(aux)

    let name = "testeEdit"

    Helper.click(labelsPage.getInitCreationTagElement())
    Helper.waitForElementVisibility(labelsPage.getSubimitTagButtonElement())
    Helper.fillFieldWithText(labelsPage.getAddTagNameFieldElement(), name)
    Helper.click(labelsPage.getSubimitTagButtonElement())

    Helper.waitForTextToBePresentInElement(labelsPage.getListLabelElement(), name).then(async () => {
      Helper.waitForTextToBePresentInElement(labelsPage.getLabelElementByLabelName(name), name)
      Helper.click(labelsPage.fromLabelElementGetEditButtonElement(labelsPage.getLabelElementByLabelName(name)))

      Helper.click(labelsPage.fromLabelElementGetDeleteButtonElement(labelsPage.getLabelElementByLabelName(name)))
      Helper.waitForTextNotToBePresentInElement(labelsPage.getListLabelElement(), name)
    })
    
  });
  */
});
