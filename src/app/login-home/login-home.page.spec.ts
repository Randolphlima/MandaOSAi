import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginHomePage } from './login-home.page';

describe('LoginHomePage', () => {
  let component: LoginHomePage;
  let fixture: ComponentFixture<LoginHomePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginHomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
