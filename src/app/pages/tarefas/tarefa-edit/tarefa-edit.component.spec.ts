import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TarefaEditComponent } from './tarefa-edit.component';

describe('TarefaEditComponent', () => {
  let component: TarefaEditComponent;
  let fixture: ComponentFixture<TarefaEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TarefaEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TarefaEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
