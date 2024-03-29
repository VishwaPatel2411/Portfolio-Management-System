import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ClientsInfo } from './clients-info';
import { StockInfo } from './stock-info';

@Injectable({
  providedIn: 'root'
})
export class ClientInfoService {
  private baseURL = "http://localhost:8098/home/";
  private baseURLDelete = "http://localhost:8098/home/deleteClient";
  private baseURLUpdate = "http://localhost:8098/home/updateClient";
  router: any;

  constructor(private httpClient: HttpClient) { }

  getClientsList(): Observable<ClientsInfo[]> {
    return this.httpClient.get<ClientsInfo[]>(`${this.baseURL}getDetails`);
  }


  addClients(clientsInfo: ClientsInfo): Observable<Object> {
    return this.httpClient.post(`${this.baseURL}addClient`, clientsInfo)
  }

  getAUM(): Observable<any> {
    return this.httpClient.get<any>(`${this.baseURL}getAUM`);
  }
  getTotalClientsNum(): Observable<any> {
    return this.httpClient.get<any>(`${this.baseURL}totalClientsNum`);
  }
  deleteClient(id: number): Observable<Object> {
    return this.httpClient.delete(`${this.baseURLDelete}/${id}`)
  }

  getClientById(id: number): Observable<ClientsInfo> {
    return this.httpClient.get<ClientsInfo>(`${this.baseURL}getDetails/${id}`);

  }

  updateClient(id: number, clientsInfo: ClientsInfo): Observable<Object> {
    return this.httpClient.put(`${this.baseURLUpdate}/${id}`, clientsInfo);
  }

  searchClient(name: String): Observable<ClientsInfo[]> {
    return this.httpClient.get<ClientsInfo[]>(`${this.baseURL}search?name=${name}`);
  }

 
  clientProfit(): Observable<any> {
    return this.httpClient.get(`${this.baseURL}clientProfit`)
  }

}
