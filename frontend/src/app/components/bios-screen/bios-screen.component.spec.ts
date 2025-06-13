import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BiosScreenComponent } from './bios-screen.component';

describe('BiosScreenComponent', () => {
  let component: BiosScreenComponent;
  let fixture: ComponentFixture<BiosScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BiosScreenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BiosScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
