import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ClientInfoService } from '../client-info.service';


@Component({
  selector: 'app-average-calc',
  templateUrl: './average-calc.component.html',
  styleUrl: './average-calc.component.css'
})
export class AverageCalcComponent implements OnInit{
  items: { quantity: number, price: number }[] = [{quantity:0,price:0}]
  averageValue: number;


  constructor(private http: HttpClient, private clientInfoService: ClientInfoService,) { }
  ngOnInit(): void {
    throw new Error('Method not implemented ngOnIt.');
  }

  addItem() :void{ 
    this.items.push({ quantity: 0, price: 0 });
  }

  calculateAverage() :void { 
    let totalQuantity = 0;
    let totalValue = 0;
    for (const item of this.items) {
      totalValue = totalValue + (item.price * item.quantity);
      totalQuantity = totalQuantity + item.quantity;
    }
      if (totalQuantity === 0) {
        this.averageValue = 0;
      }
      else { this.averageValue = totalValue / totalQuantity; }
    }
  }



  

