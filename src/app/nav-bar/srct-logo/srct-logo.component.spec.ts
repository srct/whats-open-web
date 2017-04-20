import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SrctLogoComponent } from './srct-logo.component';

describe('SrctLogoComponent', () => {
  let component: SrctLogoComponent;
  let fixture: ComponentFixture<SrctLogoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SrctLogoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SrctLogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
