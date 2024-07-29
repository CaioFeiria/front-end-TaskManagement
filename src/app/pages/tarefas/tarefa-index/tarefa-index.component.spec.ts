import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TarefaIndexComponent } from './tarefa-index.component';

describe('TarefaIndexComponent', () => {
  let component: TarefaIndexComponent;
  let fixture: ComponentFixture<TarefaIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TarefaIndexComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TarefaIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
