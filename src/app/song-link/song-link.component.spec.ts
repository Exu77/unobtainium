import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SongLinkComponent } from './song-link.component';

describe('UltimateGuitarLinkComponent', () => {
  let component: SongLinkComponent;
  let fixture: ComponentFixture<SongLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SongLinkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SongLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
