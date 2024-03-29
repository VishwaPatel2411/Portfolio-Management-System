import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClientListComponent } from './client-list/client-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AddClientComponent } from './add-client/add-client.component';
import { UpdateClientComponent } from './update-client/update-client.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StockListComponent } from './stock-list/stock-list.component';
import { AddStockComponent } from './add-stock/add-stock.component';
import { UpdateStockComponent } from './update-stock/update-stock.component';
import { SellStockComponent } from './sell-stock/sell-stock.component';
import { UpdateSoldStockComponent } from './update-sold-stock/update-sold-stock.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { AverageCalcComponent } from './average-calc/average-calc.component';

@NgModule({
  declarations: [
    AppComponent,
    ClientListComponent,
    AddClientComponent,
    UpdateClientComponent,
    StockListComponent,
    AddStockComponent,
    UpdateStockComponent,
    SellStockComponent,
    UpdateSoldStockComponent,
    AverageCalcComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    DragDropModule,
    


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
