import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSongLinkComponent } from './edit-song-link.component';

describe('EditUltimateGuitarLinkComponent', () => {
  let component: EditSongLinkComponent;
  let fixture: ComponentFixture<EditSongLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditSongLinkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSongLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
