import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigurarOrdenadorComponent } from './configurar-ordenador.component';

describe('ConfigurarOrdenadorComponent', () => {
  let component: ConfigurarOrdenadorComponent;
  let fixture: ComponentFixture<ConfigurarOrdenadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConfigurarOrdenadorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfigurarOrdenadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
