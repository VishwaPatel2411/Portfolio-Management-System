import { Component, OnInit } from '@angular/core';
import { StockInfoService } from '../stock-info.service';
import { ActivatedRoute, Router } from '@angular/router';
import { StockInfo } from '../stock-info';

@Component({
  selector: 'app-update-stock',
  templateUrl: './update-stock.component.html',
  styleUrl: './update-stock.component.css'
})
export class UpdateStockComponent implements OnInit {
  clientId: number;
  stockId: number;
  stockInfo: StockInfo = new StockInfo();

 
  constructor(private stockInfoService: StockInfoService,
    private router: Router, private route: ActivatedRoute) { }
  
  ngOnInit(): void {
   this.clientId= this.route.snapshot.params['clientId'];
    this.stockId = this.route.snapshot.params['stockId'];
    this.stockInfoService.getStockById(this.stockId).subscribe(data => { 
      console.log(data);
      this.stockInfo = data;
    })
  }
  updateStock() { 
    this.stockInfoService.updateStock(this.clientId, this.stockId, this.stockInfo).subscribe(data => { 
      console.log(data);
      console.log("updated client successfully");
      alert("updated successfully");
      this.goToStockList();

    })
  }
  goToStockList() { 
    this.router.navigate(['/clients' , this.clientId, 'getStocks'])
  }
  onUpdateSubmit() { 
    console.log("inside onupdatesubmit");
    this.updateStock();
    console.log("clientId",this.clientId);

  }
}
