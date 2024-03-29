import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StockInfoService } from '../stock-info.service';
import { StockInfo } from '../stock-info';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-update-sold-stock',
  templateUrl: './update-sold-stock.component.html',
  styleUrl: './update-sold-stock.component.css'
})
export class UpdateSoldStockComponent implements OnInit {
  stockId: number;
  clientId: any;
  stockInfo: StockInfo = new StockInfo();

  constructor(private stockInfoService: StockInfoService, private router: Router,
    private route: ActivatedRoute) { }
  
  ngOnInit(): void {
    this.stockId = this.route.snapshot.params['stockId'];
    this.clientId = this.route.snapshot.params['clientId'];
    this.stockInfoService.getStockById(this.stockId).subscribe(data => { 
      console.log(data);
      this.stockInfo.stockName = data.stockName;
      this.stockInfo.sellQuantity = data.sellQuantity;
      this.stockInfo.sellPrice = data.sellPrice;
      this.stockInfo.sellDate = data.sellDate;
  });
  }


  saveDetails() { 
   // const headers = new HttpHeaders().set('Content-Type', 'application/json');

    this.stockInfoService.updateSoldStock(this.clientId, this.stockId, this.stockInfo,).subscribe(data => { 
      console.log(data);
      alert("updated");
      console.log("sold stock updated");
      this.goToStockList();
    })
  }
  goToStockList() {
    console.log(this.clientId);
    this.router.navigate(['/clients', this.clientId, 'getStocks'])
  }
  onUpdateSubmit() { 
    console.log('ok')
    this.saveDetails();

  }
}
