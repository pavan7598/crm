import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SemanticLayerHomeComponent } from './semantic-layer-home/semantic-layer-home.component';
import { SimaticLayernRouting } from './semantic-layer-routing';
// import { MeterialModules } from '../meterial-modules/meterial-modules.module';

import { DragDropModule } from '@angular/cdk/drag-drop';
import {MatSidenavModule} from '@angular/material/sidenav';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ConnectionComponent } from './connection/connection.component';
import { LayersComponent } from './layers/layers.component';
import { LayerListComponent } from './layer-list/layer-list.component';
import { ConnectionListComponent } from './connection-list/connection-list.component';
import { ConnectionItemComponent } from './connection-list/connection-item/connection-item.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { LayerspropertiesformComponent } from './semantic-layer-home/layerspropertiesform/layerspropertiesform.component';
//import { SharedModuleModule } from '../shared-module/shared-module.module';
import { ConnectionFormComponent } from './connection-form/connection-form.component';
import { ToastrModule } from 'ngx-toastr';
import { LayerComponent } from './layer/layer.component';
import { LayerHeaderComponent } from './layer/layer-header/layer-header.component';
import { LayerToolBarComponent } from './layer/layer-tool-bar/layer-tool-bar.component';
import { LayerContainerComponent } from './layer/layer-container/layer-container.component';
import { SchemaComponent } from './layer/layer-tool-bar/schema/schema.component';
import { ColumnComponent } from './layer/layer-tool-bar/column/column.component';
import { LayerTableComponent } from './layer/layer-container/layer-table/layer-table.component';
import { TableColumnComponent } from './layer/layer-container/layer-table/table-column/table-column.component';
import { JoinsModelComponent } from './layer/joins-model/joins-model.component';
import { ElementModelComponent } from './layer/element-model/element-model.component';
import { AddColectionModelComponent } from './layer/add-colection-model/add-colection-model.component';
import { CreatedElementsComponent } from './layer/layer-tool-bar/created-elements/created-elements.component';
import { CollectionComponent } from './layer/layer-tool-bar/created-elements/collection/collection.component';
import { ElmentComponent } from './layer/layer-tool-bar/created-elements/collection/elment/elment.component';
import { CustomElementModelComponent } from './layer/custom-element-model/custom-element-model.component';
//import { PlayerSelectionModule } from '../player-selection-module/player-selection-module.module';
import { CustomElementsCollectionListComponent } from './layer/custom-element-model/custom-elements-collection-list/custom-elements-collection-list.component';
import { CustomElementComponent } from './layer/custom-element-model/custom-element/custom-element.component';
import { CustomFilterPanelComponent } from './layer/custom-element-model/custom-filter-panel/custom-filter-panel.component';
import { CustomFilterElementComponent } from './layer/custom-element-model/custom-filter-element/custom-filter-element.component';
import { CustomSqlFilterComponent } from './layer/custom-element-model/custom-sql-filter/custom-sql-filter.component';
import { MeterialModules } from '../meterial/meterial-modules';
import { SharedModule } from '../shared/shared.module';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@NgModule({
  declarations: [SemanticLayerHomeComponent, ConnectionComponent,
    LayersComponent, LayerListComponent,
     ConnectionListComponent, ConnectionItemComponent,
      ConnectionFormComponent,
       LayerspropertiesformComponent,
       LayerComponent,
       LayerHeaderComponent,
        LayerToolBarComponent, LayerContainerComponent, SchemaComponent, ColumnComponent,
         LayerTableComponent, TableColumnComponent, JoinsModelComponent, ElementModelComponent,
         AddColectionModelComponent, CreatedElementsComponent, CollectionComponent, ElmentComponent, CustomElementModelComponent, CustomElementsCollectionListComponent, CustomElementComponent, CustomFilterPanelComponent, CustomFilterElementComponent, CustomSqlFilterComponent
    ],
    entryComponents: [
      JoinsModelComponent,
       ElementModelComponent,
       CustomElementModelComponent
    ],
  imports: [
    CommonModule,
    SimaticLayernRouting,
    DragDropModule,
    MatSidenavModule,
    FlexLayoutModule,
    MeterialModules,
    ToastrModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    //PlayerSelectionModule
  ],
  providers: [
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} }
]
})
export class SemanticLayerModule { }
