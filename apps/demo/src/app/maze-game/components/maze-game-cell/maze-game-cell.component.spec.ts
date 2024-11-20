import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MazeGameCellComponent } from './maze-game-cell.component';

describe('MazeGameCellComponent', () => {
  let component: MazeGameCellComponent;
  let fixture: ComponentFixture<MazeGameCellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MazeGameCellComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MazeGameCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
