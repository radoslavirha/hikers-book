import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { GraphQLModule } from '../graphql.module';
import { TripsRoutingModule } from './trips-routing.module';
import { TripsComponent } from './trips/trips.component';

@NgModule({
  declarations: [TripsComponent],
  imports: [CommonModule, MatGridListModule, MatCardModule, GraphQLModule, TripsRoutingModule],
  exports: [TripsComponent]
})
export class TripsModule {}
