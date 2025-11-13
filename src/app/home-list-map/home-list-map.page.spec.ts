import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeListMapPage } from './home-list-map.page';

describe('HomeListMapPage', () => {
  let component: HomeListMapPage;
  let fixture: ComponentFixture<HomeListMapPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeListMapPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
