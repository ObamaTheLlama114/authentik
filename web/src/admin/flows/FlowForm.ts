import "#components/ak-slug-input";
import "#elements/forms/FormGroup";
import "#elements/forms/HorizontalFormElement";
import "#elements/forms/Radio";

import { DEFAULT_CONFIG } from "#common/api/config";

import { ModelForm } from "#elements/forms/ModelForm";
import { CapabilitiesEnum, WithCapabilitiesConfig } from "#elements/mixins/capabilities";

import { DesignationToLabel, LayoutToLabel } from "#admin/flows/utils";
import { policyEngineModes } from "#admin/policies/PolicyEngineModes";

import {
    DeniedActionEnum,
    Flow,
    FlowDesignationEnum,
    FlowLayoutEnum,
    FlowsApi,
} from "@goauthentik/api";
import { AuthenticationEnum } from "@goauthentik/api/dist/models/AuthenticationEnum.js";

import { msg } from "@lit/localize";
import { html, TemplateResult } from "lit";
import { customElement, property } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";

@customElement("ak-flow-form")
export class FlowForm extends WithCapabilitiesConfig(ModelForm<Flow, string>) {
    async loadInstance(pk: string): Promise<Flow> {
        const flow = await new FlowsApi(DEFAULT_CONFIG).flowsInstancesRetrieve({
            slug: pk,
        });
        this.clearBackground = false;
        return flow;
    }

    getSuccessMessage(): string {
        return this.instance
            ? msg("Successfully updated flow.")
            : msg("Successfully created flow.");
    }

    @property({ type: Boolean })
    clearBackground = false;

    async send(data: Flow): Promise<void | Flow> {
        let flow: Flow;
        if (this.instance) {
            flow = await new FlowsApi(DEFAULT_CONFIG).flowsInstancesUpdate({
                slug: this.instance.slug,
                flowRequest: data,
            });
        } else {
            flow = await new FlowsApi(DEFAULT_CONFIG).flowsInstancesCreate({
                flowRequest: data,
            });
        }

        if (this.can(CapabilitiesEnum.CanSaveMedia)) {
            const icon = this.files().get("background");
            if (icon || this.clearBackground) {
                await new FlowsApi(DEFAULT_CONFIG).flowsInstancesSetBackgroundCreate({
                    slug: flow.slug,
                    file: icon,
                    clear: this.clearBackground,
                });
            }
        } else {
            await new FlowsApi(DEFAULT_CONFIG).flowsInstancesSetBackgroundUrlCreate({
                slug: flow.slug,
                filePathRequest: {
                    url: data.background || "",
                },
            });
        }
        return flow;
    }

    renderForm(): TemplateResult {
        return html` <ak-form-element-horizontal label=${msg("Name")} required name="name">
                <input
                    type="text"
                    value="${ifDefined(this.instance?.name)}"
                    class="pf-c-form-control"
                    required
                />
            </ak-form-element-horizontal>
            <ak-form-element-horizontal label=${msg("Title")} required name="title">
                <input
                    type="text"
                    value="${ifDefined(this.instance?.title)}"
                    class="pf-c-form-control"
                    required
                />
                <p class="pf-c-form__helper-text">${msg("Shown as the Title in Flow pages.")}</p>
            </ak-form-element-horizontal>

            <ak-slug-input
                name="slug"
                value=${ifDefined(this.instance?.slug)}
                label=${msg("Slug")}
                required
                help=${msg("Visible in the URL.")}
                input-hint="code"
            ></ak-slug-input>

            <ak-form-element-horizontal label=${msg("Designation")} required name="designation">
                <select class="pf-c-form-control">
                    <option value="" ?selected=${this.instance?.designation === undefined}>
                        ---------
                    </option>
                    <option
                        value=${FlowDesignationEnum.Authentication}
                        ?selected=${this.instance?.designation ===
                        FlowDesignationEnum.Authentication}
                    >
                        ${DesignationToLabel(FlowDesignationEnum.Authentication)}
                    </option>
                    <option
                        value=${FlowDesignationEnum.Authorization}
                        ?selected=${this.instance?.designation ===
                        FlowDesignationEnum.Authorization}
                    >
                        ${DesignationToLabel(FlowDesignationEnum.Authorization)}
                    </option>
                    <option
                        value=${FlowDesignationEnum.Enrollment}
                        ?selected=${this.instance?.designation === FlowDesignationEnum.Enrollment}
                    >
                        ${DesignationToLabel(FlowDesignationEnum.Enrollment)}
                    </option>
                    <option
                        value=${FlowDesignationEnum.Invalidation}
                        ?selected=${this.instance?.designation === FlowDesignationEnum.Invalidation}
                    >
                        ${DesignationToLabel(FlowDesignationEnum.Invalidation)}
                    </option>
                    <option
                        value=${FlowDesignationEnum.Recovery}
                        ?selected=${this.instance?.designation === FlowDesignationEnum.Recovery}
                    >
                        ${DesignationToLabel(FlowDesignationEnum.Recovery)}
                    </option>
                    <option
                        value=${FlowDesignationEnum.StageConfiguration}
                        ?selected=${this.instance?.designation ===
                        FlowDesignationEnum.StageConfiguration}
                    >
                        ${DesignationToLabel(FlowDesignationEnum.StageConfiguration)}
                    </option>
                    <option
                        value=${FlowDesignationEnum.Unenrollment}
                        ?selected=${this.instance?.designation === FlowDesignationEnum.Unenrollment}
                    >
                        ${DesignationToLabel(FlowDesignationEnum.Unenrollment)}
                    </option>
                </select>
                <p class="pf-c-form__helper-text">
                    ${msg(
                        "Decides what this Flow is used for. For example, the Authentication flow is redirect to when an un-authenticated user visits authentik.",
                    )}
                </p>
            </ak-form-element-horizontal>
            <ak-form-element-horizontal
                label=${msg("Authentication")}
                required
                name="authentication"
            >
                <select class="pf-c-form-control">
                    <option
                        value=${AuthenticationEnum.None}
                        ?selected=${this.instance?.authentication === AuthenticationEnum.None}
                    >
                        ${msg("No requirement")}
                    </option>
                    <option
                        value=${AuthenticationEnum.RequireAuthenticated}
                        ?selected=${this.instance?.authentication ===
                        AuthenticationEnum.RequireAuthenticated}
                    >
                        ${msg("Require authentication")}
                    </option>
                    <option
                        value=${AuthenticationEnum.RequireUnauthenticated}
                        ?selected=${this.instance?.authentication ===
                        AuthenticationEnum.RequireUnauthenticated}
                    >
                        ${msg("Require no authentication")}
                    </option>
                    <option
                        value=${AuthenticationEnum.RequireSuperuser}
                        ?selected=${this.instance?.authentication ===
                        AuthenticationEnum.RequireSuperuser}
                    >
                        ${msg("Require superuser")}
                    </option>
                    <option
                        value=${AuthenticationEnum.RequireRedirect}
                        ?selected=${this.instance?.authentication ===
                        AuthenticationEnum.RequireRedirect}
                    >
                        ${msg("Require being redirected from another flow")}
                    </option>
                    <option
                        value=${AuthenticationEnum.RequireOutpost}
                        ?selected=${this.instance?.authentication ===
                        AuthenticationEnum.RequireOutpost}
                    >
                        ${msg("Require Outpost (flow can only be executed from an outpost)")}
                    </option>
                </select>
                <p class="pf-c-form__helper-text">
                    ${msg("Required authentication level for this flow.")}
                </p>
            </ak-form-element-horizontal>
            <ak-form-group>
                <span slot="header"> ${msg("Behavior settings")} </span>
                <div slot="body" class="pf-c-form">
                    <ak-form-element-horizontal name="compatibilityMode">
                        <label class="pf-c-switch">
                            <input
                                class="pf-c-switch__input"
                                type="checkbox"
                                ?checked=${this.instance?.compatibilityMode ?? false}
                            />
                            <span class="pf-c-switch__toggle">
                                <span class="pf-c-switch__toggle-icon">
                                    <i class="fas fa-check" aria-hidden="true"></i>
                                </span>
                            </span>
                            <span class="pf-c-switch__label">${msg("Compatibility mode")}</span>
                        </label>
                        <p class="pf-c-form__helper-text">
                            ${msg(
                                "Increases compatibility with password managers and mobile devices.",
                            )}
                        </p>
                    </ak-form-element-horizontal>
                    <ak-form-element-horizontal
                        label=${msg("Denied action")}
                        required
                        name="deniedAction"
                    >
                        <ak-radio
                            .options=${[
                                {
                                    label: "MESSAGE_CONTINUE",
                                    value: DeniedActionEnum.MessageContinue,
                                    default: true,
                                    description: html`${msg(
                                        "Will follow the ?next parameter if set, otherwise show a message",
                                    )}`,
                                },
                                {
                                    label: "CONTINUE",
                                    value: DeniedActionEnum.Continue,
                                    description: html`${msg(
                                        "Will either follow the ?next parameter or redirect to the default interface",
                                    )}`,
                                },
                                {
                                    label: "MESSAGE",
                                    value: DeniedActionEnum.Message,
                                    description: html`${msg(
                                        "Will notify the user the flow isn't applicable",
                                    )}`,
                                },
                            ]}
                            .value=${this.instance?.deniedAction}
                        >
                        </ak-radio>
                        <p class="pf-c-form__helper-text">
                            ${msg(
                                "Decides the response when a policy denies access to this flow for a user.",
                            )}
                        </p>
                    </ak-form-element-horizontal>
                    <ak-form-element-horizontal
                        label=${msg("Policy engine mode")}
                        required
                        name="policyEngineMode"
                    >
                        <ak-radio
                            .options=${policyEngineModes}
                            .value=${this.instance?.policyEngineMode}
                        >
                        </ak-radio>
                    </ak-form-element-horizontal>
                </div>
            </ak-form-group>
            <ak-form-group>
                <span slot="header"> ${msg("Appearance settings")} </span>
                <div slot="body" class="pf-c-form">
                    <ak-form-element-horizontal label=${msg("Layout")} required name="layout">
                        <select class="pf-c-form-control">
                            <option
                                value=${FlowLayoutEnum.Stacked}
                                ?selected=${this.instance?.layout === FlowLayoutEnum.Stacked}
                            >
                                ${LayoutToLabel(FlowLayoutEnum.Stacked)}
                            </option>
                            <option
                                value=${FlowLayoutEnum.ContentLeft}
                                ?selected=${this.instance?.layout === FlowLayoutEnum.ContentLeft}
                            >
                                ${LayoutToLabel(FlowLayoutEnum.ContentLeft)}
                            </option>
                            <option
                                value=${FlowLayoutEnum.ContentRight}
                                ?selected=${this.instance?.layout === FlowLayoutEnum.ContentRight}
                            >
                                ${LayoutToLabel(FlowLayoutEnum.ContentRight)}
                            </option>
                            <option
                                value=${FlowLayoutEnum.SidebarLeft}
                                ?selected=${this.instance?.layout === FlowLayoutEnum.SidebarLeft}
                            >
                                ${LayoutToLabel(FlowLayoutEnum.SidebarLeft)}
                            </option>
                            <option
                                value=${FlowLayoutEnum.SidebarRight}
                                ?selected=${this.instance?.layout === FlowLayoutEnum.SidebarRight}
                            >
                                ${LayoutToLabel(FlowLayoutEnum.SidebarRight)}
                            </option>
                        </select>
                    </ak-form-element-horizontal>
                    ${this.can(CapabilitiesEnum.CanSaveMedia)
                        ? html`<ak-form-element-horizontal
                                  label=${msg("Background")}
                                  name="background"
                              >
                                  <input type="file" value="" class="pf-c-form-control" />
                                  ${this.instance?.background
                                      ? html`
                                            <p class="pf-c-form__helper-text">
                                                ${msg("Currently set to:")}
                                                ${this.instance?.background}
                                            </p>
                                        `
                                      : html``}

                                  <p class="pf-c-form__helper-text">
                                      ${msg("Background shown during execution.")}
                                  </p>
                              </ak-form-element-horizontal>
                              ${this.instance?.background
                                  ? html`
                                        <ak-form-element-horizontal>
                                            <label class="pf-c-switch">
                                                <input
                                                    class="pf-c-switch__input"
                                                    type="checkbox"
                                                    @change=${(ev: Event) => {
                                                        const target =
                                                            ev.target as HTMLInputElement;
                                                        this.clearBackground = target.checked;
                                                    }}
                                                />
                                                <span class="pf-c-switch__toggle">
                                                    <span class="pf-c-switch__toggle-icon">
                                                        <i
                                                            class="fas fa-check"
                                                            aria-hidden="true"
                                                        ></i>
                                                    </span>
                                                </span>
                                                <span class="pf-c-switch__label">
                                                    ${msg("Clear background")}
                                                </span>
                                            </label>
                                            <p class="pf-c-form__helper-text">
                                                ${msg("Delete currently set background image.")}
                                            </p>
                                        </ak-form-element-horizontal>
                                    `
                                  : html``}`
                        : html`<ak-form-element-horizontal
                              label=${msg("Background")}
                              name="background"
                          >
                              <input
                                  type="text"
                                  value="${this.instance?.background ?? ""}"
                                  class="pf-c-form-control"
                              />
                              <p class="pf-c-form__helper-text">
                                  ${msg("Background shown during execution.")}
                              </p>
                          </ak-form-element-horizontal>`}
                </div>
            </ak-form-group>`;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "ak-flow-form": FlowForm;
    }
}
