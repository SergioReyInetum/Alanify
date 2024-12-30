import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TokenValidacionComponent } from './token-validacion.component';

describe('TokenValidacionComponent', () => {
  let component: TokenValidacionComponent;
  let fixture: ComponentFixture<TokenValidacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TokenValidacionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TokenValidacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
