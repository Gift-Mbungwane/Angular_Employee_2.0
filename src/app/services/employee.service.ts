import { Injectable } from '@angular/core';
import { IEmployee } from '../interfaces/iemployee';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mapTo';
import { PusherService } from './pusher.service';
import { catchError } from 'rxjs/operators';
import { error } from 'protractor';
import { _throw as throwError } from 'rxjs/observable/throw';

@Injectable()
export class EmployeeService {
private endPoint = 'http://localhost:3000/employee'; // normally you use environment.ts
private channel: any;

constructor(private http: HttpClient, private pusherService: PusherService) {
  this.channel = this.pusherService.getPusher().subscribe('employee');
}

/**
 * @return employee's channel for the different event available under employee
 */
getChannel () {
  return this.channel;
}

list (): Observable<IEmployee[]> {
  return this.http.get(this.endPoint)
  .map(res => <IEmployee[]> res);
}

/**
 * Create new employee
 * @param param
 * @return Observable<IEmployee> with the id
 */
create(param: IEmployee): Observable<IEmployee> {
  return this.http.post(this.endPoint, param)
  .map(res => <IEmployee> res);
}

/**
 * Remove an employee
 * @param employee to remove
 * @return Observable<IEmployee> the employee just removed
 */
delete(employee: IEmployee): Observable<IEmployee> {
  return this.http.delete(`${this.endPoint}/${employee.id}`)
  .mapTo(employee);
}

  getEmployee(id: number): Observable<IEmployee> {
    return this.http.get<IEmployee>(`${this.endPoint}/${id}`)
      .pipe(catchError(this.handleError));
  }

  private handleError(errorResponse: HttpErrorResponse) {
    if (errorResponse.error instanceof ErrorEvent) {
      console.error('Client Side Error: ', errorResponse.error.message);
    } else {
      console.error('Server Side Error: ', errorResponse);
    }
    return throwError('there is a problem with the service . We are notified workking on it. Please have patience');

  }
}
