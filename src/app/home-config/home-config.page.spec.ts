import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeConfigPage } from './home-config.page';

describe('HomeConfigPage', () => {
  let component: HomeConfigPage;
  let fixture: ComponentFixture<HomeConfigPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeConfigPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
