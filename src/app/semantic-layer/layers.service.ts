import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { environment } from "../../environments/environment";
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LayersService {
  environment: any = environment;
  baseUrl = environment.baseUrl_sematicLayer;
  public layerContainer$ = new Subject<any>();
  public elementEvent = new Subject<any>();

 rowname="";


  constructor(private http: HttpClient) {

   }
  //  baseUrl="http://localhost:4500/";
   getLayers()  {
    return this.http.get(this.baseUrl + 'api/layers/find-all');
   }
   getLayersByName(name)  {
    return this.http.get(this.baseUrl + `api/layers/findName/${name}`).pipe(map((result)  =>  {
      return result;
    }));
   }
   saveLayer(payload) {
    return this.http.post(this.baseUrl+'api/layers/create',  payload);
   }
   deleteLayer(id)  {
     return this.http.post(this.baseUrl+`api/layers/delete/${id}`,  {id }  );
   }

   editLayer(id)  {
    return this.http.get(this.baseUrl+`api/layers/find-one`,  {params: {id}}  );
   }
   updateLayer(id,  payload)  {
    return this.http.post(this.baseUrl+`api/layers/update/${id}`,   payload );
   }

   getConnectionList() {
    return this.http.get(this.baseUrl+`api/data-sources/find-all`);
  }


   //below method is sending rowname to layer component to visible after click on pencil mark to edit
   rownameforedit(data){
     this.rowname=data;
   }
   sendrowname(){
     return this.rowname;
   }



}
