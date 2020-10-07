import { LoginPage } from './login.po';
import { HeaderComponent } from '../../components/header/header.po';
import { browser, logging, element, by, Key } from 'protractor';
import { HomePage } from '../home/home.po';
import { Util } from '../../util/util.po';
import * as Helper from 'protractor-helper';

describe('workspace-project admin-login', () => {
  let loginPage: LoginPage;
  let headerComponent: HeaderComponent;
  let homePage: HomePage;
  let util: Util;

  beforeEach(() => {
    loginPage = new LoginPage();
    homePage = new HomePage();
    headerComponent = new HeaderComponent();
    util = new Util();
  });


  it('should do a sucessful sing in an sing out', async () => {
    await browser.waitForAngularEnabled(false);
    loginPage.navigateToLogin();
    Helper.fillFieldWithText(loginPage.emailField, "admin@admin.com")
    Helper.fillFieldWithText(loginPage.passwordField, "4G2wR%u96yYzhmGs")
    Helper.click(loginPage.submitButton)

    Helper.waitForElementVisibility(element(by.buttonText('Sair')))
    Helper.click(element(by.buttonText('Sair')))
    Helper.waitForElementNotToBeVisible(element(by.buttonText('Sair')))
  });

  /*
  it("submit button shouldn't be enabled when all fields are empty", async () => {
    browser.waitForAngularEnabled(false);
    loginPage.navigateToLogin();

    expect(util.isNotClickable(loginPage.submitButton)).toBe(false)
  })

  it("submit button shouldn't be enabled when password field be empty", async () => {
    browser.waitForAngularEnabled(false);
    loginPage.navigateToLogin();

    loginPage.emailField.sendKeys("something");
    browser.sleep(3000);

    expect(util.isNotClickable(loginPage.submitButton)).toBe(false)
    browser.navigate().refresh();
  })

  it("submit button shouldn't be enabled when email field be empty", async () => {
    browser.waitForAngularEnabled(false);
    loginPage.navigateToLogin();

    loginPage.passwordField.sendKeys("something");
    browser.sleep(3000);

    expect(util.isNotClickable(loginPage.submitButton)).toBe(false)
    browser.navigate().refresh();
  })

  it('should do a sucessful sing in an sing out', async () => {
    await browser.waitForAngularEnabled(false);
    loginPage.navigateToLogin();

    loginPage.login("admin@admin.com", "4G2wR%u96yYzhmGs");
    browser.sleep(3000);

    expect(headerComponent.isLoged()).toBe(true).then(
      async() => {
       await headerComponent.tryLogout();
       browser.sleep(3000);
       expect(headerComponent.isLoged()).toBe(false);
      }
    ); 
  });

  it('should show error message when do a invalid login', async () => {
    await browser.waitForAngularEnabled(false);
    loginPage.navigateToLogin();
    
    loginPage.login("somethingWrong", "somethingWrong");
    browser.sleep(3000);

    expect(element.all(by.className("text-danger")).get(0).getText()).toEqual("*Ocorreu um problema no login");
    expect(headerComponent.isLoged()).toBe(false);
  })


  it('should show error message when fill email field, and retrieve the information', async () => {
    
    await browser.waitForAngularEnabled(false);
    loginPage.navigateToLogin();

    await loginPage.emailField.sendKeys("a")
    browser.sleep(3000);
    await loginPage.emailField.sendKeys(Key.RIGHT + Key.BACK_SPACE)
    browser.sleep(3000);

    expect(element.all(by.className("text-danger")).get(0).getText()).toEqual("*Campo obrigatório");
    browser.navigate().refresh();
  })

  it('should show error message when fill password field, and retrieve the information', async () => {
    
    await browser.waitForAngularEnabled(false);
    loginPage.navigateToLogin();

    await loginPage.passwordField.sendKeys("a")
    browser.sleep(3000);
    await loginPage.passwordField.sendKeys(Key.RIGHT + Key.BACK_SPACE)
    browser.sleep(3000);

    expect(element.all(by.className("text-danger")).get(0).getText()).toEqual("*Campo obrigatório");
    browser.navigate().refresh();
  })

  it('should show error message when fill all fields, and retrieve the information from all', async () => {
    
    await browser.waitForAngularEnabled(false);
    loginPage.navigateToLogin();

    await loginPage.emailField.sendKeys("a")
    browser.sleep(3000);
    await loginPage.emailField.sendKeys(Key.RIGHT + Key.BACK_SPACE)
    browser.sleep(3000);

    await loginPage.passwordField.sendKeys("a")
    browser.sleep(3000);
    await loginPage.passwordField.sendKeys(Key.RIGHT + Key.BACK_SPACE)
    browser.sleep(3000);

    expect(element.all(by.className("text-danger")).get(0).getText()).toEqual("*Campo obrigatório");
    expect(element.all(by.className("text-danger")).get(1).getText()).toEqual("*Campo obrigatório");
    browser.navigate().refresh();
  })

  */


/*
  it("submit button shouldn't be enabled when all  fields are empty", async () => {
    browser.waitForAngularEnabled(false);
    loginPage.navigateToLogin();
    expect(util.isNotClickable(loginPage.submitButton)).toBe(false)
    expect(element.all(by.className("text-danger")).get(0).getText()).toEqual("*Campo obrigatório");
  })

  */
 
});
