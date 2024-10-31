import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { FileUploaderService } from './fileUploader.service';

describe('FileUploaderService', () => {
  let service: FileUploaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(FileUploaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
