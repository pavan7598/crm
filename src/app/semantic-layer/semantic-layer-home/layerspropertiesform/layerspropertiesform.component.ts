import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { LayersService } from '../../layers.service';
import { SematicNameCheck } from '../semantic-name-check';
import { FormControl, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-layerspropertiesform',
  templateUrl: './layerspropertiesform.component.html',
  styleUrls: ['./layerspropertiesform.component.scss']
})
export class LayerspropertiesformComponent implements OnInit {
  @Output() LayerSaved = new EventEmitter<any>();
 layer  = new FormGroup({
  layer_name: new FormControl('', [Validators.required], SematicNameCheck.createValidator(this.ls).bind(this)),
  layer_text:  new FormControl('', [Validators.required])
  });
  // layerName = new FormControl('', [Validators.required], SematicNameCheck.createValidator(this.ls).bind(this));

 submitted =  false;

  constructor( private layerservice:  LayersService,  private ls:  LayersService) { }

  ngOnInit() {
  }

  saveLayer()  {
    const layerData = this.layer.value;
    const layerObject = {
      description: layerData.layer_text,
    name: layerData.layer_name,
    objects: [],
    params: {},
    status: 'Not active'
      };
      this.layerservice.saveLayer(layerObject).subscribe( (data)  =>  {
        this.LayerSaved.emit(data);
      },  (err) =>  {
          // Error handeled with toster
      });
    }
        // cancel(){
        //   this.cancel.emit(false);
        //  }
      }
