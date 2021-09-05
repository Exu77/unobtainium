import { TestBed } from '@angular/core/testing';

import { SongListService } from './songs-list.service';

describe('SongsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SongListService = TestBed.get(SongListService);
    expect(service).toBeTruthy();
  });
});
