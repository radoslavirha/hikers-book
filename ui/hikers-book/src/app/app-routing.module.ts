import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/trips',
    pathMatch: 'full'
  },
  {
    path: 'trips',
    loadChildren: () => import('./component/trips/trips.module').then((m) => m.TripsModule)
  },
  {
    path: '**',
    redirectTo: '/trips',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
