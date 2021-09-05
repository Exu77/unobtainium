import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SongLevelComponent } from './song-level.component';

describe('SongLevelComponent', () => {
  let component: SongLevelComponent;
  let fixture: ComponentFixture<SongLevelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SongLevelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SongLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
