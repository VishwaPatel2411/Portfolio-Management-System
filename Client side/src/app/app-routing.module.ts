import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientListComponent } from './client-list/client-list.component';
import { AddClientComponent } from './add-client/add-client.component';
import { UpdateClientComponent } from './update-client/update-client.component';
import { StockListComponent } from './stock-list/stock-list.component';
import { AddStockComponent } from './add-stock/add-stock.component';
import { UpdateStockComponent } from './update-stock/update-stock.component';
import { SellStockComponent } from './sell-stock/sell-stock.component';
import { UpdateSoldStockComponent } from './update-sold-stock/update-sold-stock.component';
import { AverageCalcComponent } from './average-calc/average-calc.component';

const routes: Routes = [
  { path: 'getDetails', component: ClientListComponent },
  { path: '', redirectTo: 'getDetails', pathMatch: 'full' },
  { path: 'addClient', component: AddClientComponent },
  { path: 'updateClient/:id', component: UpdateClientComponent },
  { path: 'clients/:clientId/getStocks', component: StockListComponent },
  { path: 'clients/:id/getStocks/addStocks', component: AddStockComponent },
  { path: ':clientId/updateStock/:stockId', component: UpdateStockComponent },
  { path: ':clientId/:stockId/sellStock', component: SellStockComponent },
  { path: ':clientId/:stockId/updateSoldStock',component:UpdateSoldStockComponent},
  {path : 'averageCalculator', component:AverageCalcComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],

})
export class AppRoutingModule { }
