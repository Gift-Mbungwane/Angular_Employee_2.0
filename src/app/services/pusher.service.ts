import { Injectable } from '@angular/core';
import * as Pusher from 'pusher-js';

// this is here to discourage the instantianting of pusher any where its
// needed, better to reference it from one place
@Injectable()
export class PusherService {
private pusher: any;

constructor() {
  this.pusher = new Pusher('b8488e0a8f8bcb7f909a', {
    cluster: 'eu',
    encrypted: true
  });
}

getPusher() {
  return this.pusher;
}

}
