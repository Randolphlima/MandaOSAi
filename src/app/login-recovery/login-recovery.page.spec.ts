import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginRecoveryPage } from './login-recovery.page';

describe('LoginRecoveryPage', () => {
  let component: LoginRecoveryPage;
  let fixture: ComponentFixture<LoginRecoveryPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginRecoveryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
