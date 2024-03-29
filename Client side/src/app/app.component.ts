import { Component } from '@angular/core';
import { ClientInfoService } from './client-info.service';
import { ClientsInfo } from './clients-info';
import { OrderPipe } from 'ngx-order-pipe';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  
  title = 'App1';


  constructor(private clientInfoService: ClientInfoService) {
    
   }

}
