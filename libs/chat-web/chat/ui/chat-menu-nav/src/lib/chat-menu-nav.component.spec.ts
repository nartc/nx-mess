import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatMenuNavComponent } from './chat-menu-nav.component';

describe('ChatMenuNavComponent', () => {
  let component: ChatMenuNavComponent;
  let fixture: ComponentFixture<ChatMenuNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatMenuNavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatMenuNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
