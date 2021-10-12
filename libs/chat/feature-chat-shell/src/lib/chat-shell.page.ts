import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ChatShellStore } from '@nx-mess/chat/data-access-chat-shell';

@Component({
  selector: 'nxc-chat-shell',
  template: `
    <ion-tabs (ionTabsDidChange)="onIonTabsDidChanged($event)">
      <ion-tab-bar slot="bottom">
        <ng-container *ngrxLet="vm$; let vm">
          <ion-tab-button tab="general">
            <ion-icon name="chatbubble-ellipses-outline"></ion-icon>
            <ion-label>General</ion-label>
            <ng-container
              *ngIf="vm.hasGeneralBadge"
              [ngTemplateOutlet]="badge"
              [ngTemplateOutletContext]="{ $implicit: vm.generalBadgeCount }"
            ></ng-container>
          </ion-tab-button>

          <ion-tab-button tab="friends">
            <ion-icon name="people-outline"></ion-icon>
            <ion-label>Friends</ion-label>
            <ng-container
              *ngIf="vm.hasFriendsBadge"
              [ngTemplateOutlet]="badge"
              [ngTemplateOutletContext]="{ $implicit: vm.friendsBadgeCount }"
            ></ng-container>
          </ion-tab-button>

          <ion-tab-button tab="me">
            <ion-icon name="person-outline"></ion-icon>
            <ion-label>Me</ion-label>
          </ion-tab-button>

          <ng-template #badge let-badgeCount>
            <ion-badge>{{ badgeCount }}</ion-badge>
          </ng-template>
        </ng-container>
      </ion-tab-bar>
    </ion-tabs>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ChatShellStore],
})
export class ChatShellPage implements OnInit {
  readonly vm$ = this.chatShellStore.vm$;

  constructor(private chatShellStore: ChatShellStore) {}

  ngOnInit() {
    this.chatShellStore.initEffect();
  }

  onIonTabsDidChanged({ tab }: { tab: string }) {
    this.chatShellStore.updateSelectedTabEffect(tab);
  }
}
