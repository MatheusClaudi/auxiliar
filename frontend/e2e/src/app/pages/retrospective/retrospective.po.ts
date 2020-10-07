import { browser, by, element } from 'protractor';
import { UserNavComponent } from '../../components/user-nav/user-naav.po';
import * as Helper from 'protractor-helper';



export class RetrospectivePage {

  userNavComponent = new UserNavComponent();
 

  getRetrospectiveColumnsElement(){
    return element.all(by.id('card-list'))
  }

  fromColumnGetAddButtonElement(element){
    return element.element(by.id('add-note'))
  }

  fromColumnGetNotesElements(columnElement){
    return columnElement.all(by.id('note'))
  }

  fromNoteGetOptionsMenuButtonElement(noteElement){
    return noteElement.element(by.id('show-menu'))
  }

  getEditButtonElement(noteElement){
    return noteElement.element(by.id('edit-card'))
  }
 
  getDeleteButtonElement(noteElement){
    return noteElement.element(by.id('remove-card'))
  }

  getEditFieldElement(noteElement){
    return noteElement.element(by.id('edit-field'))
  }

  fromNoteGetOptionsLabelsButtonElement(noteElement){
    let aux = noteElement.element(by.className('multiselect-dropdown')).element(by.className('dropdown-btn')).all(by.tagName('span'))
  
    aux.count().then( async(value)=> {
      return aux.get(value-1)
    })
  }

  fromLabelElementGetDeleteButtonElement(labelElement){
    return labelElement.element(by.tagName('a'))
  }

  fromNoteGetLabelsFromNoteElements(noteElement){
    return noteElement.element(by.className('multiselect-dropdown')).element(by.className('dropdown-btn')).all(by.className('selected-item'))
  }

  fromNoteGetFilterInputFieldElement(noteElement){
    return noteElement.element(by.id('dropdown-list')).element(by.className('filter-textbox')).element(by.tagName('input'))
  }

  fromNoteGetLabelsAddListElements(noteElement){
    return noteElement.element(by.className('multiselect-item-checkbox'))
  }


  fromLabelAddListGetNameField(labelElement){
    return labelElement.element(by.tagName('div'))
  }

}
 