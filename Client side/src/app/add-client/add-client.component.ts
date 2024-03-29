import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientInfoService } from '../client-info.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientsInfo } from '../clients-info';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrl: './add-client.component.css'
})
export class AddClientComponent implements OnInit {
  clientsInfo: ClientsInfo = new ClientsInfo();
  client: any;
  addClientsform: FormGroup;
  submitted = false;
  clientId: number;
  clientsInfo3: ClientsInfo[] = [];
  
  constructor(private clientInfoService: ClientInfoService,
    private router: Router, private formBuider: FormBuilder, private route: ActivatedRoute) { }

  ngOnInit(): void {

    // this.clientId = this.route.snapshot.params['clientId'];
    
    this.addClientsform = this.formBuider.group({
      FName: ['', Validators.required],
      FDate: [''],
      FAMOUNT: ['', Validators.pattern("^[0-9]*$")],
      FPhone: ['', Validators.pattern("^[0-9]*$")],
      FEmail: ['', Validators.email]
    })
  }

  saveClients() {
    console.log("first line saveClient --clientsInfo3", this.clientsInfo3);
    this.clientInfoService.addClients(this.clientsInfo).subscribe(data => {
      console.log(data);
      console.log("successfully added client");
      alert("Successfully added");   
      const storedArray = localStorage.getItem('clientsOrder');
      if (storedArray) {
        const clientsOrderArray = JSON.parse(storedArray);
      //to show array 
      clientsOrderArray.forEach((element: any, index: any) => {
        console.log(`Element ${index}:`, element);
      });
    }
      const existingClientsInfo3 = JSON.parse(localStorage.getItem('clientsOrder') || '[]') as ClientsInfo[];
        const clientInfoData = data as ClientsInfo;
      existingClientsInfo3.push(clientInfoData);
      localStorage.setItem('clientsOrder', JSON.stringify(existingClientsInfo3));
      console.log("after setIteam clinetsInfo3", existingClientsInfo3);
      this.clientsInfo3 = existingClientsInfo3;
      this.goToClientsList();
    },
      error => console.log(error));
  }


  
  goToClientsList() {
    this.router.navigate(['/getDetails']);
  }
  onsubmit() {
    //  console.log(this.clientsInfo);

    console.log("clientsInfo3 in Onsubmit first line",this.clientsInfo3);

    this.submitted = true;

    if (this.addClientsform.invalid) {
      return;
    }
    else
      this.saveClients();
  }
  
}
