import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatFriendsPage } from './chat-friends.component';

describe('ChatFriendsPage', () => {
  let component: ChatFriendsPage;
  let fixture: ComponentFixture<ChatFriendsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChatFriendsPage],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatFriendsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
