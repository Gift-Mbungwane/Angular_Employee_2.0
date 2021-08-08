import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../services/employee.service';
import { IEmployee } from '../interfaces/iemployee';
import { NgAlertService, MessageType } from '@theo4u/ng-alert';
import 'bootstrap/dist/css/bootstrap.min.css';

@Component({
  selector: 'app-list-employee',
  templateUrl: './list-employee.component.html',
  styles: ['bootstrap/dist/css/bootstrap.min.css']
})
export class ListEmployeeComponent implements OnInit {
  employees: IEmployee[] = [];
  loading = true;

  constructor(private employeeService: EmployeeService, private ngAlert: NgAlertService) { }

  ngOnInit() {
    this.loading = true;
    this.employeeService.list()
      .subscribe(employees => {
        this.loading = false;
        this.employees = employees;
      });

    // subscribe to pusher's event
    this.employeeService.getChannel().bind('new', data => {
      data.new = true;
      this.employees.push(data);
    });

    this.employeeService.getChannel().bind('deleted', data => {
      this.employees = this.employees.filter(emp => emp.id !== data.id);
    });
  }

  delete(employee: IEmployee) {
   // show delete confirmation with ngAlert
    this.ngAlert.push({
      message: `<strong>Are you sure!</strong> you want to delele this employee with name <strong>${employee.name}</strong>`,
      type: MessageType.warning,
      buttons: [
        {
          label: 'Continue',
          action: () => {
            this.actualDelete(employee);

          },
          css: 'btn btn-danger'
        }
      ]
    });
  }

  private actualDelete (employee: IEmployee) {
    this.employeeService.delete(employee)
      .subscribe(() => {
        // remove the employee if removed successfully
        this.employees = this.employees.filter(item => item !== employee);
        this.ngAlert.push({
          message: `${employee.name} removed`,
          type: MessageType.success
        });
      });
  }

}
