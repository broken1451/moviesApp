import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NowPlayinngComponent } from './now-playinng.component';

describe('NowPlayinngComponent', () => {
  let component: NowPlayinngComponent;
  let fixture: ComponentFixture<NowPlayinngComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NowPlayinngComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NowPlayinngComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
