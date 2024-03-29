import { Component, OnInit } from '@angular/core';
import { ClientInfoService } from '../client-info.service';
import { ActivatedRoute, Router } from '@angular/router';
import { StockInfo } from '../stock-info';
import { ClientsInfo } from '../clients-info';
import { StockInfoService } from '../stock-info.service';
import { getLocaleCurrencySymbol } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-stock-list',
  templateUrl: './stock-list.component.html',
  styleUrl: './stock-list.component.css'
})
export class StockListComponent implements OnInit {
  clientId: number;
  stockId: number;
  //stocks: StockInfo = new StockInfo();
  stocks: StockInfo[];
  clientsInfo2: ClientsInfo[] = [];
  //selectedclient: ClientsInfo | null = null;
  HoldStock: StockInfo[] = [];
  SoldStock: StockInfo[] = [];
  StockProfit: any;

  ngOnInit(): void {

    this.clientId = this.route.snapshot.params['clientId'];
    this.stockId = this.route.snapshot.params['stockId'];
    this.showHoldStocks();
    this.showSoldStock();
    //this.stockProfit();
  }
  constructor(private stockInfoService: StockInfoService, private clientInfoService: ClientInfoService,
    private router: Router, private route: ActivatedRoute) { }


  showHoldStocks() {
    if (this.clientId !== undefined && this.clientId !== null) {
      this.stockInfoService.getStocks(this.clientId).subscribe((data) => {
        this.HoldStock = data;
      //  this.showSoldStock();
      });
    } else {
      console.error('clientId is undefined or null');
    }
  }

  showSoldStock() {
    this.stockInfoService.getSoldStocks(this.clientId).subscribe(data => {
      this.SoldStock = data;
       this.stockProfit();

    })
  }
  navigateToAddStock(clientId: number) {
    this.router.navigate(['clients', clientId, 'getStocks', 'addStocks']);
  }

  deleteStock(stockId: number) {
    console.log("stockId:", this.stockId);
    this.stockInfoService.deleteStock(stockId).subscribe((data) => {
      alert("stock deleted");

      console.log(data);
      this.showHoldStocks();
      this.showSoldStock();
      this.stockProfit();
    },
      (error) => {
        if (error instanceof HttpErrorResponse && error.status == 200) {
          // it will ignore parsing error for success response
          alert("Stock deleted");
          this.showHoldStocks();
          this.stockProfit();
          this.showSoldStock();
        }
        else
          console.error("Error:", error);

      }
    )
  }
  updateStock(clientId: number, stockId: number) {
    this.router.navigate([clientId, 'updateStock', stockId]);
  }

  addToSold(clientId: number, stockId: number) {
    this.router.navigate([clientId, stockId, 'sellStock']);
  }

  updateSoldStock(clientId: number, stockId: number) {
    this.router.navigate([clientId, stockId, 'updateSoldStock']);
  }

  mergeSellColumns() {
    this.stockInfoService.mergeSellColumns().subscribe(data => {
      console.log('sell Merge successful:', data);
      alert("Successfully merged");
      this.showSoldStock();

    },
      error => {
        console.error('Error merging sellColumns:', error);
        this.showSoldStock();

      }
    );
  }

  mergeBuyColumns() {
    this.stockInfoService.mergeBuyColumns().subscribe(
      data => {
        console.log('buy merged successfully', data);
        alert("Successfully merged");

        this.showHoldStocks();
      },
      error => {
        console.error('Error merging buy Columns:', error);
        this.showHoldStocks();

      }
    )
  }

  stockProfit() {
    this.stockInfoService.stockProfit(this.clientId).subscribe(data => {
      console.log('stockProfit', data);
      this.StockProfit = data;
    })
  }
  undoBuyColumns() { 
    this.stockInfoService.undoBuyColumns().subscribe(data => { 
      console.log(data);
      console.log("successfully undo buy columns");
      alert("Successfully undo");
      this.showHoldStocks();

    },
      error => {
        console.error('Error undo buy Columns:', error);
        this.showHoldStocks();
      }
)
  }
  undoSellColumns() {
    this.stockInfoService.undoSellColumns().subscribe(data => { 
      console.log(data);
      console.log("succesffuly sold undo");
      alert("Succesfully undo sold");
      this.showSoldStock();
    }, error => { 
      console.log("error:", error);
      this.showSoldStock();
    }
    )
    
  }

  currentProperty: string = '';
  currentOrder: number = 1;

  SortByProperty(property: string) {
    let sortOrder = 1;
    if (this.currentProperty === property) {
      sortOrder = this.currentOrder * -1;
    }

    this.currentProperty = property;
    this.currentOrder = sortOrder * 1;


    this.HoldStock.sort((a, b) => {
      if (a[property] > b[property]) {
        return sortOrder * 1;
      }
      if (a[property] < b[property]) {
        return sortOrder * -1;
      }
      return 0;
    })

  }
  currentProperty1: string = '';
  currentOrder1: number = 1;

  SortByProperty1(property: string) {
    let sortOrder = 1;
    if (this.currentProperty === property) {
      sortOrder = this.currentOrder * -1;
    }

    this.currentProperty = property;
    this.currentOrder = sortOrder * 1;


    this.SoldStock.sort((a, b) => {
      if (a[property] > b[property]) {
        return sortOrder * 1;
      }
      if (a[property] < b[property]) {
        return sortOrder * -1;
      }
      return 0;
    })

  }


  }



