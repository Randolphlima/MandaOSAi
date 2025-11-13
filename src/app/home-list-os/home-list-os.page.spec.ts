import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeListOsPage } from './home-list-os.page';

describe('HomeListOsPage', () => {
  let component: HomeListOsPage;
  let fixture: ComponentFixture<HomeListOsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeListOsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
