import { defineElement } from '@umbraco-ui/uui-base/lib/registration';
import { UUITextStyles } from '@umbraco-ui/uui-css/lib';
import { css, html, LitElement } from 'lit';
import { state } from 'lit/decorators.js';
import { Subscription, map } from 'rxjs';

import { UmbContextConsumerMixin } from '../core/context';
import {
  UmbExtensionRegistry,
  createExtensionElement,
  UmbExtensionManifest,
  UmbExtensionManifestSection,
} from '../core/extension';

@defineElement('umb-backoffice-main')
export class UmbBackofficeMain extends UmbContextConsumerMixin(LitElement) {
  static styles = [
    UUITextStyles,
    css`
      :host {
        display: block;
        width: 100%;
        height: 100%;
      }
    `,
  ];

  @state()
  private _routes: Array<any> = [];

  @state()
  private _sections: Array<UmbExtensionManifestSection> = [];

  private _extensionRegistry?: UmbExtensionRegistry;
  private _sectionSubscription?: Subscription;

  constructor() {
    super();

    this.consumeContext('umbExtensionRegistry', (_instance: UmbExtensionRegistry) => {
      this._extensionRegistry = _instance;
      this._useSections();
    });
  }

  private _useSections() {
    this._sectionSubscription?.unsubscribe();

    this._sectionSubscription = this._extensionRegistry?.extensions
      .pipe(
        map((extensions: Array<UmbExtensionManifest>) =>
          extensions
            .filter((extension) => extension.type === 'section')
            .sort((a: any, b: any) => b.meta.weight - a.meta.weight)
        )
      )
      .subscribe((sections) => {
        this._routes = [];
        this._sections = sections as Array<UmbExtensionManifestSection>;

        this._routes = this._sections.map((section) => {
          return {
            path: 'section/' + section.meta.pathname,
            component: () => createExtensionElement(section),
          };
        });

        this._routes.push({
          path: '**',
          redirectTo: 'section/' + this._sections[0].meta.pathname,
        });
      });
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this._sectionSubscription?.unsubscribe();
  }

  render() {
    return html`<router-slot .routes=${this._routes}></router-slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'umb-backoffice-main': UmbBackofficeMain;
  }
}
