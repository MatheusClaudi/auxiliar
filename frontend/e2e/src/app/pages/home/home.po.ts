import { browser, by, element } from 'protractor';



export class HomePage {
 

  navigateToHome(): Promise<unknown> {
    return browser.get('/home') as Promise<unknown>;
  }  
}
