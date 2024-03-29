import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ClientsInfo } from '../clients-info';
import { Router } from '@angular/router';
import { ClientInfoService } from '../client-info.service';
import { Input, Output, EventEmitter } from '@angular/core';
import { StockInfo } from '../stock-info';
import { RouterModule, Routes } from '@angular/router';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrl: './client-list.component.css',

})
export class ClientListComponent implements OnInit {

  AUM: any;
  TotalClientsNum: any;
  orderHeader: string = '';
  stocks: StockInfo[];
  clientsInfo2: ClientsInfo[] = [];
  selectedclient: ClientsInfo | null = null;
  selectedClientStock: StockInfo[] = [];
  searchWord: string = '';
  ClientProfit: any;

  constructor(private clientInfoService: ClientInfoService,
    private router: Router, private cdr: ChangeDetectorRef, private http: HttpClient) {
   
  }

  ngOnInit(): void {

    this.getAUM();
    this.getTotalClientsNum();
    this.clientProfit();
   // this.loadClients();
    const savedData = localStorage.getItem('clientsOrder');
    if (savedData) {
      // Parse the JSON string and assign it to clientsInfo2
      this.clientsInfo2 = JSON.parse(savedData) as ClientsInfo[];
    }
  }
 
  loadClients() {
    this.clientInfoService.getClientsList().subscribe((clientsNew) => {
      this.clientsInfo2 = clientsNew;

    });
  }

  getAUM() {
    this.clientInfoService.getAUM().subscribe(data => {
      this.AUM = data;
    });
  }

  private getTotalClientsNum() {
    this.clientInfoService.getTotalClientsNum().subscribe(data => {
      this.TotalClientsNum = data;
    });
  }


  deleteClient(id: number) {
    if (confirm('Are you sure to delete this record'))
      this.clientInfoService.deleteClient(id).subscribe(data => {
        console.log(data);
        alert('Deleted successfully');
        const a = localStorage.getItem('clientsOrder');
        if (a) {
          let clientsInfo2 = JSON.parse(a) as ClientsInfo[];
          const index = clientsInfo2.findIndex(client => client.id === id);
          if (index !== -1) {
            clientsInfo2.splice(index, 1); //start at index and remove 1 element
            // Update local storage after removing the item
            localStorage.setItem('clientsOrder', JSON.stringify(clientsInfo2));
          }
        }
        const savedData = localStorage.getItem('clientsOrder');
        if (savedData) {
          this.clientsInfo2 = JSON.parse(savedData) as ClientsInfo[];
        }
      // this.loadClients(); 
        this.getAUM();
        this.getTotalClientsNum()
      })
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.clientsInfo2, event.previousIndex, event.currentIndex);
    // Save the new order of clientsInfo2 to your backend or localStorage here
    this.saveOrder();

  }

  private saveOrder() {
    localStorage.setItem('clientsOrder', JSON.stringify(this.clientsInfo2));
  }

  updateClient(id: number) {
    this.router.navigate(['updateClient', id]);

  }

  showStocks(clientId: number) {
    this.router.navigate(['clients', clientId, 'getStocks']);
  }

  searchClient() {
    if (this.searchWord.trim()) {
      this.clientInfoService.searchClient(this.searchWord.trim())
        .subscribe(clientsInfo2 => {
          this.clientsInfo2 = clientsInfo2;
        });
    } else {
      // this.loadClients();
      const savedOrder = localStorage.getItem('clientsOrder');
      if (savedOrder) {
        this.clientsInfo2 = JSON.parse(savedOrder);
      }
    }
  }

  currentProperty: string = '';
  currentOrder: number = 1;

  sortItemsBy(property: string) { 
    let sortOrder = 1;
    if (this.currentProperty === property) {
      sortOrder = this.currentOrder * -1;
    }
    
      this.currentProperty = property;
    this.currentOrder = sortOrder * 1;
    

    this.clientsInfo2.sort((a, b) => { 
      if (a[property] > b[property]) { 
        return sortOrder * 1;
      }
      if (a[property]< b[property]) { 
        return sortOrder * -1;
      }
      return 0;
    })

  }


  clientProfit() { 
  this.clientInfoService.clientProfit().subscribe(data => { 
    console.log("clientProfit:", data);
    this.ClientProfit = data;
  })
  }

  }




