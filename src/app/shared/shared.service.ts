import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
selected_filter;
slabModelData;

public matricsRefresh =  new BehaviorSubject<any>({});
public matricsRefreshData = this.matricsRefresh.asObservable();


constructor(public http: HttpClient) { }

  getElements() {
    return this.http.get(environment.serverURL + `segmentation/getElements/`)
  }
}
