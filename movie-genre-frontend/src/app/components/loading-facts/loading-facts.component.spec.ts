import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingFactsComponent } from './loading-facts.component';

describe('LoadingFactsComponent', () => {
  let component: LoadingFactsComponent;
  let fixture: ComponentFixture<LoadingFactsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoadingFactsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoadingFactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
