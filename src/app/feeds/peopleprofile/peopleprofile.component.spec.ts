import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeopleprofileComponent } from './peopleprofile.component';

describe('PeopleprofileComponent', () => {
  let component: PeopleprofileComponent;
  let fixture: ComponentFixture<PeopleprofileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PeopleprofileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PeopleprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
