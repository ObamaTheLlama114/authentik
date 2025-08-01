import "./ak-locale-context.js";

import { EVENT_LOCALE_REQUEST } from "#common/constants";

import { customEvent } from "#elements/utils/customEvents";

import { localized, msg } from "@lit/localize";
import { html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";

export default {
    title: "Elements / Shell / Locale Context",
};

@localized()
@customElement("ak-locale-demo-component")
export class AKLocaleDemoComponent extends LitElement {
    render() {
        return html`<span>${msg("Everything is ok.")}</span>`;
    }
}

@localized()
@customElement("ak-locale-sensitive-demo-component")
export class AKLocaleSensitiveDemoComponent extends LitElement {
    render() {
        return html`<p>${msg("Everything is ok.")}</p>`;
    }
}

export const InFrench = () =>
    html`<div style="padding: 4em">
        <ak-locale-context locale="fr"
            ><ak-locale-demo-component
                >Everything is not ok.</ak-locale-demo-component
            ></ak-locale-context
        >
    </div>`;

export const SwitchingBackAndForth = () => {
    let lang = "en";
    window.setInterval(() => {
        lang = lang === "en" ? "fr" : "en";
        window.dispatchEvent(customEvent(EVENT_LOCALE_REQUEST, { locale: lang }));
    }, 1000);

    return html`<div style="padding: 4em">
        <ak-locale-context locale="fr">
            <ak-locale-sensitive-demo-component></ak-locale-sensitive-demo-component
        ></ak-locale-context>
    </div>`;
};
