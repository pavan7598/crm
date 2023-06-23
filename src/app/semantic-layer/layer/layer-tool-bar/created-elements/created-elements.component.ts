import { Component, OnInit , Input, OnDestroy} from '@angular/core';
import { LayersService } from '../../../layers.service';
import { Subject, Subscription } from 'rxjs';
import { MatDialog } from '@angular/material';
import { ElementModelComponent } from '../../element-model/element-model.component';
import { AddColectionModelComponent } from '../../add-colection-model/add-colection-model.component';

@Component({
  selector: 'app-created-elements',
  templateUrl: './created-elements.component.html',
  styleUrls: ['./created-elements.component.scss']
})
export class CreatedElementsComponent implements OnInit,  OnDestroy {
@Input() objects: any;
elementSub$: Subscription;
elmentAdd$: Subscription;
  constructor(public layerSerive: LayersService,
     public dialog: MatDialog) {

  }
  deleteFolder(event)  {
    /*debugger;*/
    this.objects.splice(event,  1);
  }
  editFolder(ev)  {
    //
    const dlref = this.dialog.open(AddColectionModelComponent, {data: ev});
    dlref.componentInstance.create$.subscribe((data)  =>  {
      ev.elementLabel = data.CreateCollection;
      dlref.close();
    });
  }
  ngOnInit() {
    // console.log(`Logging the object Array ------------------`);
    // console.log(this.objects);
    this.elementSub$ = this.layerSerive.elementEvent.subscribe((element)  =>  {
      // console.log('Element is clicked ------XX--------',  element,  this.objects);

      // show the element model -----------------------------
      const dlref = this.dialog.open(ElementModelComponent, {data: {object: this.objects, element}});
      this.elmentAdd$ = dlref.componentInstance.elementAdded$.subscribe((data)  =>  {
      // console.log(`Loggign the data in the element `, data);
      dlref.close();
      });
      dlref.afterClosed().subscribe(()  =>  {
        // do some action after the dialog is closed -------------
      });
      //
    });
}
ngOnDestroy() {
this.elementSub$.unsubscribe();
}

}
