import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { ApolloTestingController, ApolloTestingModule } from 'apollo-angular/testing';
import { TripsComponent } from './trips.component';

describe('TripsComponent', () => {
  let component: TripsComponent;
  let fixture: ComponentFixture<TripsComponent>;
  let controller: ApolloTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TripsComponent],
      imports: [ApolloTestingModule, MatGridListModule, MatCardModule]
    });
    fixture = TestBed.createComponent(TripsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    controller = TestBed.inject(ApolloTestingController);
  });

  afterEach(() => {
    controller.verify();
  });

  it('should create', () => {
    controller.expectOne('Trips');
    expect(component).toBeTruthy();
  });

  it('should load data', () => {
    const mockTrips = [
      {
        label: 'Trip 1',
        createdAt: '2021-01-01'
      },
      {
        label: 'Trip 2',
        createdAt: '2021-01-02'
      }
    ];
    const op = controller.expectOne('Trips');

    op.flush({ data: { Trips: mockTrips } });

    component.trips.subscribe((trips) => {
      expect(trips).toEqual(mockTrips);
    });
  });
});
