import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatMePage } from './chat-me.component';

describe('ChatMePage', () => {
  let component: ChatMePage;
  let fixture: ComponentFixture<ChatMePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChatMePage],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatMePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
