import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatGeneralPage } from './chat-general.component';

describe('ChatGeneralPage', () => {
  let component: ChatGeneralPage;
  let fixture: ComponentFixture<ChatGeneralPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChatGeneralPage],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatGeneralPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
