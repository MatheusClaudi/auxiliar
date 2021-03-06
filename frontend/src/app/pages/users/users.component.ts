import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { interval } from 'rxjs';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { EventService } from 'src/app/services/events-service';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  testUser: User;
  users: Array<User> = [];
  myVar;
  myVar2;
  access = true;

  page = 0
  maxPage
  nPerPage = 5


  constructor(
    private modalService: NgbModal,
    private userService: UserService,
    private router: Router
  ) {
    this.refresh()

    this.myVar2 = EventService.newAdminVerificaton.subscribe(
      data => {
        if (!data){
          this.router.navigate(['/home']);
        }
      }
    );
  }

  ngOnInit(): void {
  }

  refresh() {
    this.users = [];
    this.userService.findPage(this.page, this.nPerPage).subscribe(
      pageResponse => {
        this.maxPage = pageResponse.totalPages
        this.users = pageResponse.content
      }
    )
  }

  ngOnDestroy(){
    this.myVar2.unsubscribe();
  }

  previous(){
    if (this.page != 0){
      this.page = this.page - 1;
      this.refresh()
    }
  }

  next(){
    if (this.page + 1 != this.maxPage ){
      this.page = this.page + 1;
      this.refresh()
    }
  }

  toggle(user) {
    if (!user.roles.includes('ENTITY')){
      if (user.active) {
        this.userService.unableUser(user.id).subscribe(
          data => {
            this.refresh();
          }
        );
      }
      else {
        this.userService.enableUser(user.id).subscribe(
          data => {
            this.refresh();
          }
        );
      }
    }
  }

  editUser(user) {
    if (!user.roles.includes('ENTITY')){
      this.router.navigate(['/add-user'], { queryParams: {edit: true}, state: {data: user}});
    }
  }

  goToAddUser() {
    this.router.navigate(['/add-user'], {queryParams: {edit: false}});
  }

  showDetails(user: User) {
    user.showDetails = !user.showDetails;
  }

  adminManagement(user) {
    if (!user.roles.includes('ENTITY')){

      if (user.roles.includes('ADMIN')){
        this.userService.retrieveUserAdmin(user.id).subscribe(
          data => {
            this.refresh();
          }
        );
      }
      else{
        this.userService.giveUserAdmin(user.id).subscribe(
          data => {
            this.refresh();
          }
        );
      }
    }
  }

  deleteUser(usr) {
    if (!usr.roles.includes('ENTITY')){
      this.userService.deleteUserFromSystem(usr.id).subscribe(
        data => {
          this.refresh();
        }
      );
    }
  }

}
