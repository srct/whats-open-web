import { TestBed, inject } from '@angular/core/testing';

import { SearchService } from './search.service';

describe('SearchProviderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SearchService]
    });
  });

  it('should ...', inject([SearchService], (service: SearchService) => {
    expect(service).toBeTruthy();
  }));
});
