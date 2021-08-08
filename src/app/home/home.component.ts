import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';

import { User } from '../interfaces';
import { ListEmployeeComponent } from '../list-employee/list-employee.component';
import { UserService } from '../services';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent implements OnInit {
  currentUser: User;
  users: User[] = [];
  employees: ListEmployeeComponent;


  constructor(private userService: UserService, private router: Router) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
    this.loadAllUsers();
    
  }

  deleteUser(id: number) {
    this.userService.delete(id).pipe(first()).subscribe(() => {
      this.loadAllUsers()
    });
  }

  private loadAllUsers() {
    this.userService.getAll().pipe(first()).subscribe(users => {
      this.users = users;
    });
  }
  private loadEmployeesList() {
    return this.router.navigate(['list-employee'],);
  }

  private loadCreatedEmployee() {
    return this.router.navigate(['create-employee']);
  }
  
}
