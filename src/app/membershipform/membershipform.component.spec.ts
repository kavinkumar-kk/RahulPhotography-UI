import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembershipformComponent } from './membershipform.component';

describe('MembershipformComponent', () => {
  let component: MembershipformComponent;
  let fixture: ComponentFixture<MembershipformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MembershipformComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MembershipformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
