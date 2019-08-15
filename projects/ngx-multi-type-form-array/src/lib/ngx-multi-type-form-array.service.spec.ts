import { TestBed } from '@angular/core/testing';

import { NgxMultiTypeFormArrayService } from './ngx-multi-type-form-array.service';

describe('NgxMultiTypeFormArrayService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgxMultiTypeFormArrayService = TestBed.get(NgxMultiTypeFormArrayService);
    expect(service).toBeTruthy();
  });
});
