import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SemanticLayerHomeComponent } from './semantic-layer-home/semantic-layer-home.component';
import { ConnectionListComponent } from './connection-list/connection-list.component';
import { LayerspropertiesformComponent } from './semantic-layer-home/layerspropertiesform/layerspropertiesform.component';
// import { CatalogComponent } from './catalog/catalog.component';
// import { PlayerSelectionLangingComponent } from './player-selection-langing/player-selection-langing.component';
// import { PlayerSelectionComponent } from './player-selection/player-selection.component';
import { ConnectionFormComponent } from './connection-form/connection-form.component';
import { ConnectionComponent } from './connection/connection.component';
import { LayerComponent } from './layer/layer.component';
import { AddColectionModelComponent } from './layer/add-colection-model/add-colection-model.component';
import { ElementModelComponent } from './layer/element-model/element-model.component';
 import { LayerDeactivateGuard } from './layer-deactivate.guard';
import { LoginGuard } from '../usermodule/gards/login.guard';

const routes: Routes = [
{path:  'semanticLayerHome', component:  SemanticLayerHomeComponent,data: { breadcrumb: 'SemanticLayerHome' },canActivate:[LoginGuard]},
{path:  '',  redirectTo: 'semanticLayerHome' ,  pathMatch: 'full'},
{path:  'layerList',  component:  ConnectionListComponent,data: { breadcrumb: 'LayerList' },canActivate:[LoginGuard]},
{path:  'connectionform',  component:  ConnectionFormComponent ,data: { breadcrumb: 'Connectionform' },canActivate:[LoginGuard]},
{path:  'layersForm',  component:  LayerspropertiesformComponent ,data: { breadcrumb: 'LayersForm' },canActivate:[LoginGuard]},
{path:  'layer',  component:  LayerComponent, data:  {breadcrumb: 'Layer',id:  String} ,canActivate:[LoginGuard],canDeactivate:[LayerDeactivateGuard]},
{path:  'connection', component: ConnectionComponent,data: { breadcrumb: 'Connection' },canActivate:[LoginGuard]},
{path:  'collectiontable', component: AddColectionModelComponent,data: { breadcrumb: 'Collectiontable' },canActivate:[LoginGuard]},
{path:  'elementmodel', component: ElementModelComponent,data: { breadcrumb: 'Elementmodel' },canActivate:[LoginGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SimaticLayernRouting {
}
