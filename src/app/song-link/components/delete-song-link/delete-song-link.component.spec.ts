import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteSongLinkComponent } from './delete-song-link.component';

describe('DeleteUltimateGuitarLinkComponent', () => {
  let component: DeleteSongLinkComponent;
  let fixture: ComponentFixture<DeleteSongLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteSongLinkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteSongLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
