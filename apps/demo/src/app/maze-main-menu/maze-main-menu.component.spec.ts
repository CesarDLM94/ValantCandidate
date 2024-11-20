import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MazeMainMenuComponent } from './maze-main-menu.component';

describe('MazeMainMenuComponent', () => {
  let component: MazeMainMenuComponent;
  let fixture: ComponentFixture<MazeMainMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MazeMainMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MazeMainMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
