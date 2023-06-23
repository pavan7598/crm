import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CatalogComponent } from './catalog/catalog.component';
import { PlayerSelectionLangingComponent } from './player-selection-langing/player-selection-langing.component';
import { PlayerSelectionComponent } from './player-selection/player-selection.component';
import { PsQueryResultsComponent } from './ps-query-results/ps-query-results.component';


const routes: Routes = [
  {path:  'player', component:  PlayerSelectionLangingComponent, canActivate:  [], children: [
    {path:  '',  redirectTo: 'catalog' ,  pathMatch: 'full'},
  {path:  'catalog',  component:  CatalogComponent,data: { breadcrumb: 'Query selection catalog' }},
    {path:  'playerSelection',  component:  PlayerSelectionComponent, data: {
      breadcrumb: 'Query selection',
      id: String,
      type: String,
    }},
    {path:  'psQueryResults',  component:  PsQueryResultsComponent,data: { breadcrumb: 'Player selection results' }}
]}];

@NgModule({

  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlayerSelectionRouting {
}
