import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenuaryComponent } from './genuary.component';

describe('GenuaryComponent', () => {
  let component: GenuaryComponent;
  let fixture: ComponentFixture<GenuaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenuaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenuaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
