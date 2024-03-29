import { Component, OnInit } from '@angular/core';
import { StockInfoService } from '../stock-info.service';
import { ActivatedRoute, Router } from '@angular/router';
import { StockInfo } from '../stock-info';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-stock',
  templateUrl: './add-stock.component.html',
  styleUrl: './add-stock.component.css'
})
export class AddStockComponent implements OnInit {
  stockInfo: StockInfo = new StockInfo();
  submitted = false;
  addStockform: FormGroup;
  id :number;

  constructor(private stockInfoService: StockInfoService,
    private router: Router, private formBuider: FormBuilder, private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    if (!this.id) {
      // Handle the case where clientId is not available
      console.error('clientId is not available in the route parameters.');
    }
    this.addStockform = this.formBuider.group({
      FStockName: ['', Validators.required],
      FQuantity: ['', Validators.required],
      FPrice: ['', Validators.required],
      FBuyOn: ['', Validators.required]
    })
  }

  saveStocks() {
    this.stockInfoService.addStocks(this.stockInfo,this.id).subscribe(data => {
      console.log(data);
      console.log("successfully added stock");
      alert("Successfully added");
      this.submitted = true;
      this.goToStocksList(this.id);

    },
      error => console.log(error));
  }

  goToStocksList(id:number) {
    
    this.router.navigate([`/clients/${id}/getStocks`]);
  }
  onsubmit() {
   console.log(this.id);
    console.log(this.stockInfo);
    this.submitted = true;
    this.saveStocks();
  }
 
}
