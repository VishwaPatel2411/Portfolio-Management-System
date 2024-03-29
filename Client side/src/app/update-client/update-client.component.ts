import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientInfoService } from '../client-info.service';
import { ClientsInfo } from '../clients-info';

@Component({
  selector: 'app-update-client',
  templateUrl: './update-client.component.html',
  styleUrl: './update-client.component.css'
})
export class UpdateClientComponent implements OnInit {
  updateClientsform: FormGroup;
  id: number;
  submitted = false;
  clientsInfo: ClientsInfo = new ClientsInfo();

  constructor(private clientInfoService: ClientInfoService,
    private router: Router, private route: ActivatedRoute, private formBuider: FormBuilder) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    console.log("id:",this.id);

    this.clientInfoService.getClientById(this.id)
      .subscribe(data => {
        console.log('getClientById:',data);
        this.clientsInfo = data;
      },
        error => console.log(error));
    this.updateClientsform = this.formBuider.group({
      FName: ['', Validators.required],
      FDate: [''],
      FInitialAmount: [''],
      FPhone: ['', Validators.pattern("^[0-9]*$")],
      FEmail: ['', Validators.email]
    })
  }

  UpdateClient() {
    this.clientInfoService.updateClient(this.id, this.clientsInfo).subscribe(data => {
      alert("Updated")
      this.updateClientInLocalStorage(this.id, this.clientsInfo); //update in local storage
      this.goToClientsList();
    },
      error => console.log(error));

  }

  updateClientInLocalStorage(id: number, updatedClient: ClientsInfo): void {
    const savedOrder = localStorage.getItem('clientsOrder');
    console.log('savedOrder',savedOrder);

    if (savedOrder) {
      let clientsInfo2 = JSON.parse(savedOrder) as ClientsInfo[];
      const index = clientsInfo2.findIndex(client => client.id == id);
      console.log('id :', id);
      console.log('index :',index);
     if (index !== -1) {
        // Update the client data
        clientsInfo2[index] = updatedClient;
        console.log('updated clientsInfo2');

        // Save the updated data back to localStorage
        console.log('updated clientsInfo2 -Local Storage',clientsInfo2);
        localStorage.setItem('clientsOrder', JSON.stringify(clientsInfo2));
      }
    }
  }
  goToClientsList() {
    this.router.navigate(['/getDetails']);
  }

  onUpdatesubmit() {
    console.log('onUpdateSubmit: clientsInfo',this.clientsInfo);
    this.UpdateClient();
  }
}
