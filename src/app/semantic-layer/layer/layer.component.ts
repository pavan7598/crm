import { Component, OnInit, HostListener, DoCheck } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LayersService } from '../layers.service';
import { Subject, Subscription, Observable,from } from 'rxjs';
import { ConnectionService } from '../connection.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-layer',
  templateUrl: './layer.component.html',
  styleUrls: ['./layer.component.scss']
})
export class LayerComponent implements OnInit,DoCheck {

editEvent = new Subject<any>();
conChange$: Subscription;
oldObject={};
id:any;
_Layer: any =  {
  connectionId: '',
  objects : [],
  params: {
    schema: []
  }
};
isSaved=true;
@HostListener('window:beforeunload', ['$event'])
beforeUnloadHander(event) {
    return this.isSaved;
}

  constructor(private activatedroute: ActivatedRoute,
    private layerservice:  LayersService,
    private toastr: ToastrService,
    private connectionservice:  ConnectionService) {
       from(this._Layer.params.schema).subscribe((data) =>  {
          //  console.log('>>>>>>>>>>>>>>',data);

       });
      //  .flatMap(function(item) {
      //   return rx.Observable.ofObjectChanges(item);
      // });
    this.getLayer(this.activatedroute.snapshot.params.id);
    this.conChange$ = this.connectionservice.connectionChangeTrigger$
    .subscribe((data:  any)  =>  {
      if  (data)  {
        this._Layer.connectionId = data;
      }
    });
   }
   getLayer(id) {
     this.id = id;
    this.layerservice.editLayer(id).subscribe((data:  any)  =>  {
       this._Layer = data.item;
       this.oldObject=JSON.parse(JSON.stringify(this._Layer));
       if (!this._Layer.params)  {
        this._Layer.params =  {
          schema: []
        };
       }
       this.editEvent.next();
       this.connectionservice.connectionChangeTrigger$.next(this._Layer.connectionId);
    });
  }
  saveLayer() {

    this.layerservice.updateLayer(this.id,  this._Layer)
    .subscribe((data) =>  {
      this.toastr.success('Save', 'successful');
      this.isSaved=true;
      this.oldObject=JSON.parse(JSON.stringify(this._Layer));
    });
  }
  ngOnInit() {

  }
  ngDoCheck(){

    if(Object.keys(this.oldObject).length === 0) {
      return;
    }

    let old:String = JSON.stringify(this.oldObject);
    let newval:String = JSON.stringify(this._Layer);
    if(old !== newval )  {

      this.isSaved=false;
      this.oldObject=JSON.parse(JSON.stringify(this._Layer));
    }
  }
}
