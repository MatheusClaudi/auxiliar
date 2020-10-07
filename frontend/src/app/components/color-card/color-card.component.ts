import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'color-card',
  templateUrl: './color-card.component.html',
  styleUrls: ['./color-card.component.css'],
})
export class ColorCardComponent implements OnInit {
  public showMenu: boolean;
  @Output('cardColor') changeColor = new EventEmitter();

  constructor() {}

  ngOnInit(): void {
    this.showMenu = false;
  }

  displayMenu() {
    this.showMenu = !this.showMenu;
  }

  closeMenu() {
    this.showMenu = false;
  }

  mudaCor(color: number) {
    if (color === 1) {
      this.changeColor.emit('#5eca38');
      console.log('verde');
    } else if (color === 2) {
      this.changeColor.emit('rgb(278, 200, 20)');
      console.log('amarelo');
    } else {
      this.changeColor.emit('#eb4929');
      console.log('vermelho');
    }
  }
}
