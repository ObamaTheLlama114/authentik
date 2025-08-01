import "#admin/rbac/ObjectPermissionModal";
import "#admin/tokens/TokenForm";
import "#components/ak-status-label";
import "#elements/buttons/Dropdown";
import "#elements/buttons/TokenCopyButton/index";
import "#elements/forms/DeleteBulkForm";
import "#elements/forms/ModalForm";
import "@patternfly/elements/pf-tooltip/pf-tooltip.js";

import { DEFAULT_CONFIG } from "#common/api/config";
import { intentToLabel } from "#common/labels";
import { formatElapsedTime } from "#common/temporal";

import { PaginatedResponse, TableColumn } from "#elements/table/Table";
import { TablePage } from "#elements/table/TablePage";

import {
    CoreApi,
    IntentEnum,
    RbacPermissionsAssignedByUsersListModelEnum,
    Token,
} from "@goauthentik/api";

import { msg } from "@lit/localize";
import { html, TemplateResult } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("ak-token-list")
export class TokenListPage extends TablePage<Token> {
    searchEnabled(): boolean {
        return true;
    }
    pageTitle(): string {
        return msg("Tokens");
    }
    pageDescription(): string {
        return msg(
            "Tokens are used throughout authentik for Email validation stages, Recovery keys and API access.",
        );
    }
    pageIcon(): string {
        return "pf-icon pf-icon-security";
    }

    checkbox = true;
    clearOnRefresh = true;

    @property()
    order = "expires";

    async apiEndpoint(): Promise<PaginatedResponse<Token>> {
        return new CoreApi(DEFAULT_CONFIG).coreTokensList(await this.defaultEndpointConfig());
    }

    columns(): TableColumn[] {
        return [
            new TableColumn(msg("Identifier"), "identifier"),
            new TableColumn(msg("User"), "user"),
            new TableColumn(msg("Expires?"), "expiring"),
            new TableColumn(msg("Expiry date"), "expires"),
            new TableColumn(msg("Intent"), "intent"),
            new TableColumn(msg("Actions")),
        ];
    }

    renderToolbarSelected(): TemplateResult {
        const disabled = this.selectedElements.length < 1;
        return html`<ak-forms-delete-bulk
            objectLabel=${msg("Token(s)")}
            .objects=${this.selectedElements}
            .metadata=${(item: Token) => {
                return [{ key: msg("Identifier"), value: item.identifier }];
            }}
            .usedBy=${(item: Token) => {
                return new CoreApi(DEFAULT_CONFIG).coreTokensUsedByList({
                    identifier: item.identifier,
                });
            }}
            .delete=${(item: Token) => {
                return new CoreApi(DEFAULT_CONFIG).coreTokensDestroy({
                    identifier: item.identifier,
                });
            }}
        >
            <button ?disabled=${disabled} slot="trigger" class="pf-c-button pf-m-danger">
                ${msg("Delete")}
            </button>
        </ak-forms-delete-bulk>`;
    }

    renderObjectCreate(): TemplateResult {
        return html`
            <ak-forms-modal>
                <span slot="submit"> ${msg("Create")} </span>
                <span slot="header"> ${msg("Create Token")} </span>
                <ak-token-form slot="form"> </ak-token-form>
                <button slot="trigger" class="pf-c-button pf-m-primary">${msg("Create")}</button>
            </ak-forms-modal>
        `;
    }

    row(item: Token): TemplateResult[] {
        return [
            html`<div>${item.identifier}</div>
                ${item.managed
                    ? html`<small>${msg("Token is managed by authentik.")}</small>`
                    : html``}`,
            html`<a href="#/identity/users/${item.userObj?.pk}">${item.userObj?.username}</a>`,
            html`<ak-status-label type="warning" ?good=${item.expiring}></ak-status-label>`,
            html`${item.expires && item.expiring
                ? html`<div>${formatElapsedTime(item.expires)}</div>
                      <small>${item.expires.toLocaleString()}</small>`
                : msg("-")}`,
            html`${intentToLabel(item.intent ?? IntentEnum.Api)}`,
            html`
                ${!item.managed
                    ? html`<ak-forms-modal>
                          <span slot="submit"> ${msg("Update")} </span>
                          <span slot="header"> ${msg("Update Token")} </span>
                          <ak-token-form slot="form" .instancePk=${item.identifier}></ak-token-form>
                          <button slot="trigger" class="pf-c-button pf-m-plain">
                              <pf-tooltip position="top" content=${msg("Edit")}>
                                  <i class="fas fa-edit"></i>
                              </pf-tooltip>
                          </button>
                      </ak-forms-modal>`
                    : html` <button class="pf-c-button pf-m-plain" disabled>
                          <pf-tooltip
                              position="top"
                              content=${msg("Editing is disabled for managed tokens")}
                          >
                              <i class="fas fa-edit"></i>
                          </pf-tooltip>
                      </button>`}
                <ak-rbac-object-permission-modal
                    model=${RbacPermissionsAssignedByUsersListModelEnum.AuthentikCoreToken}
                    objectPk=${item.pk}
                >
                </ak-rbac-object-permission-modal>
                <ak-token-copy-button
                    class="pf-c-button pf-m-plain"
                    identifier="${item.identifier}"
                >
                    <pf-tooltip position="top" content=${msg("Copy token")}>
                        <i class="fas fa-copy"></i>
                    </pf-tooltip>
                </ak-token-copy-button>
            `,
        ];
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "ak-token-list": TokenListPage;
    }
}
