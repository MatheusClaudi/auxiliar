import { browser, by, element } from 'protractor';

export class Util {
  isNotClickable(element) {
    return element.isPresent().then((isPresent) => {
        if (isPresent) {
            return element.isDisplayed().then((isDisplayed) => {
                if (isDisplayed) {
                    return !element.isEnabled();
                }
                return true;
            });
         }
         return true;
     });
  }

}
