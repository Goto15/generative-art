import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SvgGenComponent } from './svg-gen.component';

describe('SvgGenComponent', () => {
  let component: SvgGenComponent;
  let fixture: ComponentFixture<SvgGenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SvgGenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SvgGenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
