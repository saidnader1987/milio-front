/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { NotImplementedComponent } from './not-implemented.component';

describe('NotImplementedComponent', () => {
  let component: NotImplementedComponent;
  let fixture: ComponentFixture<NotImplementedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotImplementedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotImplementedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
