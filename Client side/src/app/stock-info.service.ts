import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StockInfo } from './stock-info';

@Injectable({
  providedIn: 'root'
})
export class StockInfoService {
  private baseURLgetStocks = "http://localhost:8098/home/clients/";
  private baseURLdeleteStock = "http://localhost:8098/home/getStocks/";
  private baseURLCommon = "http://localhost:8098/home/";


  router: any;
  clientId: number;
  id: number;

  constructor(private httpClient: HttpClient) { }

  getStocks(clientId: number): Observable<StockInfo[]> {
    const url = `${this.baseURLgetStocks}${clientId}/getStocks`;
    return this.httpClient.get<StockInfo[]>(url);
  }
  getStockById(stockId: number): Observable<StockInfo> {
    const url = `${this.baseURLCommon}getStockById/${stockId}`;
    return this.httpClient.get<StockInfo>(url);
  }
  getSoldStocks(clientId: number): Observable<StockInfo[]> {
    const url = `${this.baseURLCommon}clients/${clientId}/getSoldStocks`;
    return this.httpClient.get<StockInfo[]>(url);
  }
  addStocks(stockInfo: StockInfo, id: number): Observable<Object> {
    stockInfo.buy_sell = "buy";
    const url2 = `${this.baseURLgetStocks}${id}/getStocks/addStocks`;
    return this.httpClient.post(url2, stockInfo);
  }
  deleteStock(stockId: number): Observable<Object> {
    return this.httpClient.delete(`${this.baseURLdeleteStock}${stockId}/deleteStock`);
  }
  updateStock(clientId: number, stockId: number, stockInfo: StockInfo): Observable<Object> {
    return this.httpClient.put(`${this.baseURLCommon}${clientId}/updateStock/${stockId}`, stockInfo);
  }

  addToSold(clientId: number, stockId: number, stockInfo: StockInfo): Observable<Object> {

    return this.httpClient.post(`${this.baseURLCommon}${clientId}/${stockId}/sellStock`, stockInfo);
  }

  updateSoldStock(clientId: number, stockId: number, stockInfo: StockInfo): Observable<Object> {
    return this.httpClient.put(`${this.baseURLCommon}${clientId}/${stockId}/updateSoldStock`, stockInfo);
  }

  mergeSellColumns(): Observable<any> {
    return this.httpClient.put(`${this.baseURLCommon}MergeSellColumns`, {});
  }

  mergeBuyColumns(): Observable<any> {
    return this.httpClient.put(`${this.baseURLCommon}mergeBuyColumns`, {});
  }

  stockProfit(clientId: number): Observable<Object> {
    return this.httpClient.get(`${this.baseURLCommon}clients/${clientId}/stockProfit`);
  }

  undoBuyColumns(): Observable<any> { 
    return this.httpClient.put(`${this.baseURLCommon}undoMerge`, {});
  }
  undoSellColumns(): Observable<any> { 
    return this.httpClient.put(`${this.baseURLCommon}undoSoldMerge`, {});
  }
} 