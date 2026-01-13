import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeepTableComponent } from './deep-table';

describe('DeepTable', () => {
  let component: DeepTableComponent;
  let fixture: ComponentFixture<DeepTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeepTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeepTableComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
