import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OsChamadoHomePage } from './os-chamado-home.page';

describe('OsChamadoHomePage', () => {
  let component: OsChamadoHomePage;
  let fixture: ComponentFixture<OsChamadoHomePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(OsChamadoHomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
