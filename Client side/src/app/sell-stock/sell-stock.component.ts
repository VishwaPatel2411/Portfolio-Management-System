import { Component, OnInit } from '@angular/core';
import { StockInfoService } from '../stock-info.service';
import { ActivatedRoute, Router } from '@angular/router';
import { StockInfo } from '../stock-info';
import { FormBuilder, Validators } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';


@Component({
  selector: 'app-sell-stock',
  templateUrl: './sell-stock.component.html',
  styleUrl: './sell-stock.component.css'
})
export class SellStockComponent implements OnInit {
  stockInfo: StockInfo = new StockInfo();
  clientId: number;
  stockId: number;
  submitted = false;
  sellStockForm: FormGroup;


  constructor(private formBuilder: FormBuilder,private stockInfoService: StockInfoService, private router: Router,private route: ActivatedRoute) { 

  }
  ngOnInit() {
    this.clientId = this.route.snapshot.params['clientId'];
    this.stockId = this.route.snapshot.params['stockId'];
    this.stockInfoService.getStockById(this.stockId).subscribe(data => {
      console.log(data);
     // this.stockInfo = data;
      this.sellStockForm.patchValue({
        FStockName: data.stockName // Pre-populate stockName field
      });

    })

    this.sellStockForm = this.formBuilder.group({
      FStockName: ['', ],
      FSellQuantity: ['', ],
      FSellPrice: ['',],
      FSellOn: ['', ]
    })
  }

  goToStockList() {
    this.router.navigate(['/clients', this.clientId, 'getStocks'])
  }
  addToSold() { 
    this.stockInfoService.addToSold(this.clientId, this.stockId, this.stockInfo).subscribe(
      data => {
        console.log(data);
        alert('successfully sold');
        console.log('successfully sold stock:');
        this.submitted = true;
        this.goToStockList();
      },
      error => console.log(error));
  }
  onsubmit() { 
    this.addToSold();

  }
}
