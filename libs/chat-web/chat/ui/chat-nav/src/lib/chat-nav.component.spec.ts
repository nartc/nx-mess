import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatNavComponent } from './chat-nav.component';

describe('ChatNavComponent', () => {
  let component: ChatNavComponent;
  let fixture: ComponentFixture<ChatNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatNavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
