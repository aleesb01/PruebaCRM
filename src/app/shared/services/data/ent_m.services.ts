import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";

import {  throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { AppConstant } from '../../constants/appConstant';

import { Ent_m } from '../../../model/ent_m';

@Injectable({
  providedIn: 'root'
})
export class Ent_m_service {

  private REST_API_SERVER = AppConstant.API_ENDPOINT;
  private REST_API_CLT = this.REST_API_SERVER + 'query/ent_m?param%5Bchk_clt%5D=1&api_key=' + AppConstant.API_KEY;

  constructor(private httpClient: HttpClient) { }

  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

  public sendGetRequest() {
    return this.httpClient.get('http://195.248.231.219:8888/TRAZAGEST/vERP_2_dat_dat/v1/ent_m?api_key=ACCESO');
  }

  public getFacturasCliente() {
    
  }
}