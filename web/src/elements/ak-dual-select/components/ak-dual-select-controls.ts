import { DualSelectEventType } from "../types.js";

import { AKElement } from "#elements/Base";
import { CustomEmitterElement } from "#elements/utils/eventEmitter";

import { msg } from "@lit/localize";
import { css, html, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";

import PFButton from "@patternfly/patternfly/components/Button/button.css";
import PFBase from "@patternfly/patternfly/patternfly-base.css";

/**
 * @element ak-dual-select-controls
 *
 * The "control box" for a dual-list multi-select. It's controlled by the parent orchestrator as to
 * whether or not any of its controls are enabled. It sends a variety of messages to the parent
 * orchestrator which will then reconcile the "available" and "selected" panes at need.
 */
@customElement("ak-dual-select-controls")
export class AkDualSelectControls extends CustomEmitterElement<DualSelectEventType>(AKElement) {
    static styles = [
        PFBase,
        PFButton,
        css`
            :host {
                align-self: center;
                padding-right: var(--pf-c-dual-list-selector__controls--PaddingRight);
                padding-left: var(--pf-c-dual-list-selector__controls--PaddingLeft);
            }
            .pf-c-dual-list-selector {
                max-width: calc(var(--pf-global--spacer-md, 1rem) * 4);
            }
            .ak-dual-list-selector__controls {
                display: grid;
                justify-content: center;
                align-content: center;
                height: 100%;
            }
        `,
    ];

    /**
     * Set to true if any *visible* elements can be added to the selected list.
     */
    @property({ attribute: "add-active", type: Boolean })
    addActive = false;

    /**
     * Set to true if any elements can be removed from the selected list (essentially,
     * if the selected list is not empty)
     */
    @property({ attribute: "remove-active", type: Boolean })
    removeActive = false;

    /**
     * Set to true if *all* the currently visible elements can be moved
     * into the selected list (essentially, if any visible elements are
     * not currently selected).
     */
    @property({ attribute: "add-all-active", type: Boolean })
    addAllActive = false;

    /**
     * Set to true if *any* of the elements currently visible in the available
     * pane are available to be moved to the selected list, enabling that
     * all of those specific elements be moved out of the selected list.
     */
    @property({ attribute: "remove-all-active", type: Boolean })
    removeAllActive = false;

    /**
     * if deleteAll is enabled, set to true to show that there are elements in the
     * selected list that can be deleted.
     */
    @property({ attribute: "delete-all-active", type: Boolean })
    enableDeleteAll = false;

    /**
     * Set to true if you want the `...AllActive` buttons made available.
     */
    @property({ attribute: "enable-select-all", type: Boolean })
    selectAll = false;

    /**
     * Set to true if you want the `ClearAllSelected` button made available
     */
    @property({ attribute: "enable-delete-all", type: Boolean })
    deleteAll = false;

    renderButton(
        label: string,
        eventType: DualSelectEventType,
        active: boolean,
        direction: string,
    ) {
        return html`
            <div class="pf-c-dual-list-selector__controls-item">
                <button
                    ?aria-disabled=${!active}
                    ?disabled=${!active}
                    aria-label=${label}
                    class="pf-c-button pf-m-plain"
                    type="button"
                    @click=${() => this.dispatchCustomEvent(eventType)}
                    data-ouia-component-type="AK/Button"
                >
                    <i class="fa ${direction}"></i>
                </button>
            </div>
        </div>`;
    }

    render() {
        return html`
            <div class="ak-dual-list-selector__controls">
                ${this.renderButton(
                    msg("Add"),
                    DualSelectEventType.AddSelected,
                    this.addActive,
                    "fa-angle-right",
                )}
                ${this.selectAll
                    ? html`
                          ${this.renderButton(
                              msg("Add All Available"),
                              DualSelectEventType.AddAll,
                              this.addAllActive,
                              "fa-angle-double-right",
                          )}
                          ${this.renderButton(
                              msg("Remove All Available"),
                              DualSelectEventType.RemoveAll,
                              this.removeAllActive,
                              "fa-angle-double-left",
                          )}
                      `
                    : nothing}
                ${this.renderButton(
                    msg("Remove"),
                    DualSelectEventType.RemoveSelected,
                    this.removeActive,
                    "fa-angle-left",
                )}
                ${this.deleteAll
                    ? html`${this.renderButton(
                          msg("Remove All"),
                          DualSelectEventType.DeleteAll,
                          this.enableDeleteAll,
                          "fa-times",
                      )}`
                    : nothing}
            </div>
        `;
    }
}

export default AkDualSelectControls;

declare global {
    interface HTMLElementTagNameMap {
        "ak-dual-select-controls": AkDualSelectControls;
    }
}
