import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EmployeeService } from '../services/employee.service';
import { IEmployee } from '../interfaces/iemployee';
import 'bootstrap/dist/css/bootstrap.min.css';


@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styles: ['bootstrap/dist/css/bootstrap.min.css']
})
export class CreateEmployeeComponent implements OnInit {
   employeeForm: FormGroup;
   loader: boolean;

  constructor(private formbBuilder: FormBuilder, private employeeService: EmployeeService) { }

  ngOnInit() {
    this.createForm();
  }

  /**
   * create our reactive form here
   */
  private createForm() {
    this.employeeForm = this.formbBuilder.group({
      name: ['', Validators.required],
      position: ['Manager', Validators.required],
      salary: ['R', Validators.required]
    });
  }

  /**
   * submit new employee to server
   */
  onSubmit() {
    const param = this.employeeForm.value;
    this.employeeService.create(param)
      .subscribe((employee: IEmployee) => {
         this.loader = false;
         this.employeeForm.reset({position: 'Manager'});
      },
        (error) => {
          console.error(error);
          this.loader = false;
        });
  }


}
