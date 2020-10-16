!function(){"use strict";
/**
     * @license
     * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
     * This code may only be used under the BSD style license found at
     * http://polymer.github.io/LICENSE.txt
     * The complete set of authors may be found at
     * http://polymer.github.io/AUTHORS.txt
     * The complete set of contributors may be found at
     * http://polymer.github.io/CONTRIBUTORS.txt
     * Code distributed by Google as part of the polymer project is also
     * subject to an additional IP rights grant found at
     * http://polymer.github.io/PATENTS.txt
     */const e="undefined"!=typeof window&&null!=window.customElements&&void 0!==window.customElements.polyfillWrapFlushCallback,t=(e,t,s=null)=>{for(;t!==s;){const s=t.nextSibling;e.removeChild(t),t=s}},s=`{{lit-${String(Math.random()).slice(2)}}}`,n=`\x3c!--${s}--\x3e`,r=new RegExp(`${s}|${n}`),i="$lit$";class o{constructor(e,t){this.parts=[],this.element=t;const n=[],o=[],l=document.createTreeWalker(t.content,133,null,!1);let h=0,p=-1,u=0;const{strings:m,values:{length:f}}=e;for(;u<f;){const e=l.nextNode();if(null!==e){if(p++,1===e.nodeType){if(e.hasAttributes()){const t=e.attributes,{length:s}=t;let n=0;for(let e=0;e<s;e++)a(t[e].name,i)&&n++;for(;n-- >0;){const t=m[u],s=d.exec(t)[2],n=s.toLowerCase()+i,o=e.getAttribute(n);e.removeAttribute(n);const a=o.split(r);this.parts.push({type:"attribute",index:p,name:s,strings:a}),u+=a.length-1}}"TEMPLATE"===e.tagName&&(o.push(e),l.currentNode=e.content)}else if(3===e.nodeType){const t=e.data;if(t.indexOf(s)>=0){const s=e.parentNode,o=t.split(r),l=o.length-1;for(let t=0;t<l;t++){let n,r=o[t];if(""===r)n=c();else{const e=d.exec(r);null!==e&&a(e[2],i)&&(r=r.slice(0,e.index)+e[1]+e[2].slice(0,-i.length)+e[3]),n=document.createTextNode(r)}s.insertBefore(n,e),this.parts.push({type:"node",index:++p})}""===o[l]?(s.insertBefore(c(),e),n.push(e)):e.data=o[l],u+=l}}else if(8===e.nodeType)if(e.data===s){const t=e.parentNode;null!==e.previousSibling&&p!==h||(p++,t.insertBefore(c(),e)),h=p,this.parts.push({type:"node",index:p}),null===e.nextSibling?e.data="":(n.push(e),p--),u++}else{let t=-1;for(;-1!==(t=e.data.indexOf(s,t+1));)this.parts.push({type:"node",index:-1}),u++}}else l.currentNode=o.pop()}for(const e of n)e.parentNode.removeChild(e)}}const a=(e,t)=>{const s=e.length-t.length;return s>=0&&e.slice(s)===t},l=e=>-1!==e.index,c=()=>document.createComment(""),d=/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;function h(e,t){const{element:{content:s},parts:n}=e,r=document.createTreeWalker(s,133,null,!1);let i=u(n),o=n[i],a=-1,l=0;const c=[];let d=null;for(;r.nextNode();){a++;const e=r.currentNode;for(e.previousSibling===d&&(d=null),t.has(e)&&(c.push(e),null===d&&(d=e)),null!==d&&l++;void 0!==o&&o.index===a;)o.index=null!==d?-1:o.index-l,i=u(n,i),o=n[i]}c.forEach((e=>e.parentNode.removeChild(e)))}const p=e=>{let t=11===e.nodeType?0:1;const s=document.createTreeWalker(e,133,null,!1);for(;s.nextNode();)t++;return t},u=(e,t=-1)=>{for(let s=t+1;s<e.length;s++){const t=e[s];if(l(t))return s}return-1};
/**
     * @license
     * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
     * This code may only be used under the BSD style license found at
     * http://polymer.github.io/LICENSE.txt
     * The complete set of authors may be found at
     * http://polymer.github.io/AUTHORS.txt
     * The complete set of contributors may be found at
     * http://polymer.github.io/CONTRIBUTORS.txt
     * Code distributed by Google as part of the polymer project is also
     * subject to an additional IP rights grant found at
     * http://polymer.github.io/PATENTS.txt
     */
const m=new WeakMap,f=e=>"function"==typeof e&&m.has(e),_={},g={};
/**
     * @license
     * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
     * This code may only be used under the BSD style license found at
     * http://polymer.github.io/LICENSE.txt
     * The complete set of authors may be found at
     * http://polymer.github.io/AUTHORS.txt
     * The complete set of contributors may be found at
     * http://polymer.github.io/CONTRIBUTORS.txt
     * Code distributed by Google as part of the polymer project is also
     * subject to an additional IP rights grant found at
     * http://polymer.github.io/PATENTS.txt
     */
class y{constructor(e,t,s){this.__parts=[],this.template=e,this.processor=t,this.options=s}update(e){let t=0;for(const s of this.__parts)void 0!==s&&s.setValue(e[t]),t++;for(const e of this.__parts)void 0!==e&&e.commit()}_clone(){const t=e?this.template.element.content.cloneNode(!0):document.importNode(this.template.element.content,!0),s=[],n=this.template.parts,r=document.createTreeWalker(t,133,null,!1);let i,o=0,a=0,c=r.nextNode();for(;o<n.length;)if(i=n[o],l(i)){for(;a<i.index;)a++,"TEMPLATE"===c.nodeName&&(s.push(c),r.currentNode=c.content),null===(c=r.nextNode())&&(r.currentNode=s.pop(),c=r.nextNode());if("node"===i.type){const e=this.processor.handleTextExpression(this.options);e.insertAfterNode(c.previousSibling),this.__parts.push(e)}else this.__parts.push(...this.processor.handleAttributeExpressions(c,i.name,i.strings,this.options));o++}else this.__parts.push(void 0),o++;return e&&(document.adoptNode(t),customElements.upgrade(t)),t}}
/**
     * @license
     * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
     * This code may only be used under the BSD style license found at
     * http://polymer.github.io/LICENSE.txt
     * The complete set of authors may be found at
     * http://polymer.github.io/AUTHORS.txt
     * The complete set of contributors may be found at
     * http://polymer.github.io/CONTRIBUTORS.txt
     * Code distributed by Google as part of the polymer project is also
     * subject to an additional IP rights grant found at
     * http://polymer.github.io/PATENTS.txt
     */const S=window.trustedTypes&&trustedTypes.createPolicy("lit-html",{createHTML:e=>e}),v=` ${s} `;class w{constructor(e,t,s,n){this.strings=e,this.values=t,this.type=s,this.processor=n}getHTML(){const e=this.strings.length-1;let t="",r=!1;for(let o=0;o<e;o++){const e=this.strings[o],a=e.lastIndexOf("\x3c!--");r=(a>-1||r)&&-1===e.indexOf("--\x3e",a+1);const l=d.exec(e);t+=null===l?e+(r?v:n):e.substr(0,l.index)+l[1]+l[2]+i+l[3]+s}return t+=this.strings[e],t}getTemplateElement(){const e=document.createElement("template");let t=this.getHTML();return void 0!==S&&(t=S.createHTML(t)),e.innerHTML=t,e}}
/**
     * @license
     * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
     * This code may only be used under the BSD style license found at
     * http://polymer.github.io/LICENSE.txt
     * The complete set of authors may be found at
     * http://polymer.github.io/AUTHORS.txt
     * The complete set of contributors may be found at
     * http://polymer.github.io/CONTRIBUTORS.txt
     * Code distributed by Google as part of the polymer project is also
     * subject to an additional IP rights grant found at
     * http://polymer.github.io/PATENTS.txt
     */const b=e=>null===e||!("object"==typeof e||"function"==typeof e),x=e=>Array.isArray(e)||!(!e||!e[Symbol.iterator]);class E{constructor(e,t,s){this.dirty=!0,this.element=e,this.name=t,this.strings=s,this.parts=[];for(let e=0;e<s.length-1;e++)this.parts[e]=this._createPart()}_createPart(){return new C(this)}_getValue(){const e=this.strings,t=e.length-1,s=this.parts;if(1===t&&""===e[0]&&""===e[1]){const e=s[0].value;if("symbol"==typeof e)return String(e);if("string"==typeof e||!x(e))return e}let n="";for(let r=0;r<t;r++){n+=e[r];const t=s[r];if(void 0!==t){const e=t.value;if(b(e)||!x(e))n+="string"==typeof e?e:String(e);else for(const t of e)n+="string"==typeof t?t:String(t)}}return n+=e[t],n}commit(){this.dirty&&(this.dirty=!1,this.element.setAttribute(this.name,this._getValue()))}}class C{constructor(e){this.value=void 0,this.committer=e}setValue(e){e===_||b(e)&&e===this.value||(this.value=e,f(e)||(this.committer.dirty=!0))}commit(){for(;f(this.value);){const e=this.value;this.value=_,e(this)}this.value!==_&&this.committer.commit()}}class A{constructor(e){this.value=void 0,this.__pendingValue=void 0,this.options=e}appendInto(e){this.startNode=e.appendChild(c()),this.endNode=e.appendChild(c())}insertAfterNode(e){this.startNode=e,this.endNode=e.nextSibling}appendIntoPart(e){e.__insert(this.startNode=c()),e.__insert(this.endNode=c())}insertAfterPart(e){e.__insert(this.startNode=c()),this.endNode=e.endNode,e.endNode=this.startNode}setValue(e){this.__pendingValue=e}commit(){if(null===this.startNode.parentNode)return;for(;f(this.__pendingValue);){const e=this.__pendingValue;this.__pendingValue=_,e(this)}const e=this.__pendingValue;e!==_&&(b(e)?e!==this.value&&this.__commitText(e):e instanceof w?this.__commitTemplateResult(e):e instanceof Node?this.__commitNode(e):x(e)?this.__commitIterable(e):e===g?(this.value=g,this.clear()):this.__commitText(e))}__insert(e){this.endNode.parentNode.insertBefore(e,this.endNode)}__commitNode(e){this.value!==e&&(this.clear(),this.__insert(e),this.value=e)}__commitText(e){const t=this.startNode.nextSibling,s="string"==typeof(e=null==e?"":e)?e:String(e);t===this.endNode.previousSibling&&3===t.nodeType?t.data=s:this.__commitNode(document.createTextNode(s)),this.value=e}__commitTemplateResult(e){const t=this.options.templateFactory(e);if(this.value instanceof y&&this.value.template===t)this.value.update(e.values);else{const s=new y(t,e.processor,this.options),n=s._clone();s.update(e.values),this.__commitNode(n),this.value=s}}__commitIterable(e){Array.isArray(this.value)||(this.value=[],this.clear());const t=this.value;let s,n=0;for(const r of e)s=t[n],void 0===s&&(s=new A(this.options),t.push(s),0===n?s.appendIntoPart(this):s.insertAfterPart(t[n-1])),s.setValue(r),s.commit(),n++;n<t.length&&(t.length=n,this.clear(s&&s.endNode))}clear(e=this.startNode){t(this.startNode.parentNode,e.nextSibling,this.endNode)}}class P{constructor(e,t,s){if(this.value=void 0,this.__pendingValue=void 0,2!==s.length||""!==s[0]||""!==s[1])throw new Error("Boolean attributes can only contain a single expression");this.element=e,this.name=t,this.strings=s}setValue(e){this.__pendingValue=e}commit(){for(;f(this.__pendingValue);){const e=this.__pendingValue;this.__pendingValue=_,e(this)}if(this.__pendingValue===_)return;const e=!!this.__pendingValue;this.value!==e&&(e?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name),this.value=e),this.__pendingValue=_}}class N extends E{constructor(e,t,s){super(e,t,s),this.single=2===s.length&&""===s[0]&&""===s[1]}_createPart(){return new T(this)}_getValue(){return this.single?this.parts[0].value:super._getValue()}commit(){this.dirty&&(this.dirty=!1,this.element[this.name]=this._getValue())}}class T extends C{}let k=!1;(()=>{try{const e={get capture(){return k=!0,!1}};window.addEventListener("test",e,e),window.removeEventListener("test",e,e)}catch(e){}})();class U{constructor(e,t,s){this.value=void 0,this.__pendingValue=void 0,this.element=e,this.eventName=t,this.eventContext=s,this.__boundHandleEvent=e=>this.handleEvent(e)}setValue(e){this.__pendingValue=e}commit(){for(;f(this.__pendingValue);){const e=this.__pendingValue;this.__pendingValue=_,e(this)}if(this.__pendingValue===_)return;const e=this.__pendingValue,t=this.value,s=null==e||null!=t&&(e.capture!==t.capture||e.once!==t.once||e.passive!==t.passive),n=null!=e&&(null==t||s);s&&this.element.removeEventListener(this.eventName,this.__boundHandleEvent,this.__options),n&&(this.__options=q(e),this.element.addEventListener(this.eventName,this.__boundHandleEvent,this.__options)),this.value=e,this.__pendingValue=_}handleEvent(e){"function"==typeof this.value?this.value.call(this.eventContext||this.element,e):this.value.handleEvent(e)}}const q=e=>e&&(k?{capture:e.capture,passive:e.passive,once:e.once}:e.capture)
/**
     * @license
     * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
     * This code may only be used under the BSD style license found at
     * http://polymer.github.io/LICENSE.txt
     * The complete set of authors may be found at
     * http://polymer.github.io/AUTHORS.txt
     * The complete set of contributors may be found at
     * http://polymer.github.io/CONTRIBUTORS.txt
     * Code distributed by Google as part of the polymer project is also
     * subject to an additional IP rights grant found at
     * http://polymer.github.io/PATENTS.txt
     */;function L(e){let t=V.get(e.type);void 0===t&&(t={stringsArray:new WeakMap,keyString:new Map},V.set(e.type,t));let n=t.stringsArray.get(e.strings);if(void 0!==n)return n;const r=e.strings.join(s);return n=t.keyString.get(r),void 0===n&&(n=new o(e,e.getTemplateElement()),t.keyString.set(r,n)),t.stringsArray.set(e.strings,n),n}const V=new Map,R=new WeakMap;
/**
     * @license
     * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
     * This code may only be used under the BSD style license found at
     * http://polymer.github.io/LICENSE.txt
     * The complete set of authors may be found at
     * http://polymer.github.io/AUTHORS.txt
     * The complete set of contributors may be found at
     * http://polymer.github.io/CONTRIBUTORS.txt
     * Code distributed by Google as part of the polymer project is also
     * subject to an additional IP rights grant found at
     * http://polymer.github.io/PATENTS.txt
     */const O=new
/**
     * @license
     * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
     * This code may only be used under the BSD style license found at
     * http://polymer.github.io/LICENSE.txt
     * The complete set of authors may be found at
     * http://polymer.github.io/AUTHORS.txt
     * The complete set of contributors may be found at
     * http://polymer.github.io/CONTRIBUTORS.txt
     * Code distributed by Google as part of the polymer project is also
     * subject to an additional IP rights grant found at
     * http://polymer.github.io/PATENTS.txt
     */
class{handleAttributeExpressions(e,t,s,n){const r=t[0];if("."===r){return new N(e,t.slice(1),s).parts}if("@"===r)return[new U(e,t.slice(1),n.eventContext)];if("?"===r)return[new P(e,t.slice(1),s)];return new E(e,t,s).parts}handleTextExpression(e){return new A(e)}};
/**
     * @license
     * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
     * This code may only be used under the BSD style license found at
     * http://polymer.github.io/LICENSE.txt
     * The complete set of authors may be found at
     * http://polymer.github.io/AUTHORS.txt
     * The complete set of contributors may be found at
     * http://polymer.github.io/CONTRIBUTORS.txt
     * Code distributed by Google as part of the polymer project is also
     * subject to an additional IP rights grant found at
     * http://polymer.github.io/PATENTS.txt
     */"undefined"!=typeof window&&(window.litHtmlVersions||(window.litHtmlVersions=[])).push("1.3.0");const M=(e,...t)=>new w(e,t,"html",O)
/**
     * @license
     * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
     * This code may only be used under the BSD style license found at
     * http://polymer.github.io/LICENSE.txt
     * The complete set of authors may be found at
     * http://polymer.github.io/AUTHORS.txt
     * The complete set of contributors may be found at
     * http://polymer.github.io/CONTRIBUTORS.txt
     * Code distributed by Google as part of the polymer project is also
     * subject to an additional IP rights grant found at
     * http://polymer.github.io/PATENTS.txt
     */,B=(e,t)=>`${e}--${t}`;let F=!0;void 0===window.ShadyCSS?F=!1:void 0===window.ShadyCSS.prepareTemplateDom&&(console.warn("Incompatible ShadyCSS version detected. Please update to at least @webcomponents/webcomponentsjs@2.0.2 and @webcomponents/shadycss@1.3.1."),F=!1);const j=e=>t=>{const n=B(t.type,e);let r=V.get(n);void 0===r&&(r={stringsArray:new WeakMap,keyString:new Map},V.set(n,r));let i=r.stringsArray.get(t.strings);if(void 0!==i)return i;const a=t.strings.join(s);if(i=r.keyString.get(a),void 0===i){const s=t.getTemplateElement();F&&window.ShadyCSS.prepareTemplateDom(s,e),i=new o(t,s),r.keyString.set(a,i)}return r.stringsArray.set(t.strings,i),i},I=["html","svg"],H=new Set,$=(e,t,s)=>{H.add(e);const n=s?s.element:document.createElement("template"),r=t.querySelectorAll("style"),{length:i}=r;if(0===i)return void window.ShadyCSS.prepareTemplateStyles(n,e);const o=document.createElement("style");for(let e=0;e<i;e++){const t=r[e];t.parentNode.removeChild(t),o.textContent+=t.textContent}(e=>{I.forEach((t=>{const s=V.get(B(t,e));void 0!==s&&s.keyString.forEach((e=>{const{element:{content:t}}=e,s=new Set;Array.from(t.querySelectorAll("style")).forEach((e=>{s.add(e)})),h(e,s)}))}))})(e);const a=n.content;s?function(e,t,s=null){const{element:{content:n},parts:r}=e;if(null==s)return void n.appendChild(t);const i=document.createTreeWalker(n,133,null,!1);let o=u(r),a=0,l=-1;for(;i.nextNode();)for(l++,i.currentNode===s&&(a=p(t),s.parentNode.insertBefore(t,s));-1!==o&&r[o].index===l;){if(a>0){for(;-1!==o;)r[o].index+=a,o=u(r,o);return}o=u(r,o)}}(s,o,a.firstChild):a.insertBefore(o,a.firstChild),window.ShadyCSS.prepareTemplateStyles(n,e);const l=a.querySelector("style");if(window.ShadyCSS.nativeShadow&&null!==l)t.insertBefore(l.cloneNode(!0),t.firstChild);else if(s){a.insertBefore(o,a.firstChild);const e=new Set;e.add(o),h(s,e)}};window.JSCompiler_renameProperty=(e,t)=>e;const z={toAttribute(e,t){switch(t){case Boolean:return e?"":null;case Object:case Array:return null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){switch(t){case Boolean:return null!==e;case Number:return null===e?null:Number(e);case Object:case Array:return JSON.parse(e)}return e}},D=(e,t)=>t!==e&&(t==t||e==e),W={attribute:!0,type:String,converter:z,reflect:!1,hasChanged:D},J="finalized";class K extends HTMLElement{constructor(){super(),this.initialize()}static get observedAttributes(){this.finalize();const e=[];return this._classProperties.forEach(((t,s)=>{const n=this._attributeNameForProperty(s,t);void 0!==n&&(this._attributeToPropertyMap.set(n,s),e.push(n))})),e}static _ensureClassProperties(){if(!this.hasOwnProperty(JSCompiler_renameProperty("_classProperties",this))){this._classProperties=new Map;const e=Object.getPrototypeOf(this)._classProperties;void 0!==e&&e.forEach(((e,t)=>this._classProperties.set(t,e)))}}static createProperty(e,t=W){if(this._ensureClassProperties(),this._classProperties.set(e,t),t.noAccessor||this.prototype.hasOwnProperty(e))return;const s="symbol"==typeof e?Symbol():"__"+e,n=this.getPropertyDescriptor(e,s,t);void 0!==n&&Object.defineProperty(this.prototype,e,n)}static getPropertyDescriptor(e,t,s){return{get(){return this[t]},set(n){const r=this[e];this[t]=n,this.requestUpdateInternal(e,r,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this._classProperties&&this._classProperties.get(e)||W}static finalize(){const e=Object.getPrototypeOf(this);if(e.hasOwnProperty(J)||e.finalize(),this.finalized=!0,this._ensureClassProperties(),this._attributeToPropertyMap=new Map,this.hasOwnProperty(JSCompiler_renameProperty("properties",this))){const e=this.properties,t=[...Object.getOwnPropertyNames(e),..."function"==typeof Object.getOwnPropertySymbols?Object.getOwnPropertySymbols(e):[]];for(const s of t)this.createProperty(s,e[s])}}static _attributeNameForProperty(e,t){const s=t.attribute;return!1===s?void 0:"string"==typeof s?s:"string"==typeof e?e.toLowerCase():void 0}static _valueHasChanged(e,t,s=D){return s(e,t)}static _propertyValueFromAttribute(e,t){const s=t.type,n=t.converter||z,r="function"==typeof n?n:n.fromAttribute;return r?r(e,s):e}static _propertyValueToAttribute(e,t){if(void 0===t.reflect)return;const s=t.type,n=t.converter;return(n&&n.toAttribute||z.toAttribute)(e,s)}initialize(){this._updateState=0,this._updatePromise=new Promise((e=>this._enableUpdatingResolver=e)),this._changedProperties=new Map,this._saveInstanceProperties(),this.requestUpdateInternal()}_saveInstanceProperties(){this.constructor._classProperties.forEach(((e,t)=>{if(this.hasOwnProperty(t)){const e=this[t];delete this[t],this._instanceProperties||(this._instanceProperties=new Map),this._instanceProperties.set(t,e)}}))}_applyInstanceProperties(){this._instanceProperties.forEach(((e,t)=>this[t]=e)),this._instanceProperties=void 0}connectedCallback(){this.enableUpdating()}enableUpdating(){void 0!==this._enableUpdatingResolver&&(this._enableUpdatingResolver(),this._enableUpdatingResolver=void 0)}disconnectedCallback(){}attributeChangedCallback(e,t,s){t!==s&&this._attributeToProperty(e,s)}_propertyToAttribute(e,t,s=W){const n=this.constructor,r=n._attributeNameForProperty(e,s);if(void 0!==r){const e=n._propertyValueToAttribute(t,s);if(void 0===e)return;this._updateState=8|this._updateState,null==e?this.removeAttribute(r):this.setAttribute(r,e),this._updateState=-9&this._updateState}}_attributeToProperty(e,t){if(8&this._updateState)return;const s=this.constructor,n=s._attributeToPropertyMap.get(e);if(void 0!==n){const e=s.getPropertyOptions(n);this._updateState=16|this._updateState,this[n]=s._propertyValueFromAttribute(t,e),this._updateState=-17&this._updateState}}requestUpdateInternal(e,t,s){let n=!0;if(void 0!==e){const r=this.constructor;s=s||r.getPropertyOptions(e),r._valueHasChanged(this[e],t,s.hasChanged)?(this._changedProperties.has(e)||this._changedProperties.set(e,t),!0!==s.reflect||16&this._updateState||(void 0===this._reflectingProperties&&(this._reflectingProperties=new Map),this._reflectingProperties.set(e,s))):n=!1}!this._hasRequestedUpdate&&n&&(this._updatePromise=this._enqueueUpdate())}requestUpdate(e,t){return this.requestUpdateInternal(e,t),this.updateComplete}async _enqueueUpdate(){this._updateState=4|this._updateState;try{await this._updatePromise}catch(e){}const e=this.performUpdate();return null!=e&&await e,!this._hasRequestedUpdate}get _hasRequestedUpdate(){return 4&this._updateState}get hasUpdated(){return 1&this._updateState}performUpdate(){if(!this._hasRequestedUpdate)return;this._instanceProperties&&this._applyInstanceProperties();let e=!1;const t=this._changedProperties;try{e=this.shouldUpdate(t),e?this.update(t):this._markUpdated()}catch(t){throw e=!1,this._markUpdated(),t}e&&(1&this._updateState||(this._updateState=1|this._updateState,this.firstUpdated(t)),this.updated(t))}_markUpdated(){this._changedProperties=new Map,this._updateState=-5&this._updateState}get updateComplete(){return this._getUpdateComplete()}_getUpdateComplete(){return this._updatePromise}shouldUpdate(e){return!0}update(e){void 0!==this._reflectingProperties&&this._reflectingProperties.size>0&&(this._reflectingProperties.forEach(((e,t)=>this._propertyToAttribute(t,this[t],e))),this._reflectingProperties=void 0),this._markUpdated()}updated(e){}firstUpdated(e){}}K.finalized=!0;
/**
    @license
    Copyright (c) 2019 The Polymer Project Authors. All rights reserved.
    This code may only be used under the BSD style license found at
    http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
    http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
    found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
    part of the polymer project is also subject to an additional IP rights grant
    found at http://polymer.github.io/PATENTS.txt
    */
const X=window.ShadowRoot&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,G=Symbol();class Q{constructor(e,t){if(t!==G)throw new Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e}get styleSheet(){return void 0===this._styleSheet&&(X?(this._styleSheet=new CSSStyleSheet,this._styleSheet.replaceSync(this.cssText)):this._styleSheet=null),this._styleSheet}toString(){return this.cssText}}
/**
     * @license
     * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
     * This code may only be used under the BSD style license found at
     * http://polymer.github.io/LICENSE.txt
     * The complete set of authors may be found at
     * http://polymer.github.io/AUTHORS.txt
     * The complete set of contributors may be found at
     * http://polymer.github.io/CONTRIBUTORS.txt
     * Code distributed by Google as part of the polymer project is also
     * subject to an additional IP rights grant found at
     * http://polymer.github.io/PATENTS.txt
     */
(window.litElementVersions||(window.litElementVersions=[])).push("2.4.0");const Y={};class Z extends K{static getStyles(){return this.styles}static _getUniqueStyles(){if(this.hasOwnProperty(JSCompiler_renameProperty("_styles",this)))return;const e=this.getStyles();if(Array.isArray(e)){const t=(e,s)=>e.reduceRight(((e,s)=>Array.isArray(s)?t(s,e):(e.add(s),e)),s),s=t(e,new Set),n=[];s.forEach((e=>n.unshift(e))),this._styles=n}else this._styles=void 0===e?[]:[e];this._styles=this._styles.map((e=>{if(e instanceof CSSStyleSheet&&!X){const t=Array.prototype.slice.call(e.cssRules).reduce(((e,t)=>e+t.cssText),"");return new Q(String(t),G)}return e}))}initialize(){super.initialize(),this.constructor._getUniqueStyles(),this.renderRoot=this.createRenderRoot(),window.ShadowRoot&&this.renderRoot instanceof window.ShadowRoot&&this.adoptStyles()}createRenderRoot(){return this.attachShadow({mode:"open"})}adoptStyles(){const e=this.constructor._styles;0!==e.length&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow?X?this.renderRoot.adoptedStyleSheets=e.map((e=>e instanceof CSSStyleSheet?e:e.styleSheet)):this._needsShimAdoptedStyleSheets=!0:window.ShadyCSS.ScopingShim.prepareAdoptedCssText(e.map((e=>e.cssText)),this.localName))}connectedCallback(){super.connectedCallback(),this.hasUpdated&&void 0!==window.ShadyCSS&&window.ShadyCSS.styleElement(this)}update(e){const t=this.render();super.update(e),t!==Y&&this.constructor.render(t,this.renderRoot,{scopeName:this.localName,eventContext:this}),this._needsShimAdoptedStyleSheets&&(this._needsShimAdoptedStyleSheets=!1,this.constructor._styles.forEach((e=>{const t=document.createElement("style");t.textContent=e.cssText,this.renderRoot.appendChild(t)})))}render(){return Y}}Z.finalized=!0,Z.render=(e,s,n)=>{if(!n||"object"!=typeof n||!n.scopeName)throw new Error("The `scopeName` option is required.");const r=n.scopeName,i=R.has(s),o=F&&11===s.nodeType&&!!s.host,a=o&&!H.has(r),l=a?document.createDocumentFragment():s;if(((e,s,n)=>{let r=R.get(s);void 0===r&&(t(s,s.firstChild),R.set(s,r=new A(Object.assign({templateFactory:L},n))),r.appendInto(s)),r.setValue(e),r.commit()})(e,l,Object.assign({templateFactory:j(r)},n)),a){const e=R.get(l);R.delete(l);const n=e.value instanceof y?e.value.template:void 0;$(r,l,n),t(s,s.firstChild),s.appendChild(l),R.set(s,e)}!i&&o&&window.ShadyCSS.styleElement(s.host)};customElements.define("fetch-fill-slot",class extends Z{static get properties(){return{url:{type:String},key:{type:String},value:{type:Number}}}comparison(e){var t={"<":function(e,t){return e<t},">":function(e,t){return e>t},">=":function(e,t){return e>=t},"<=":function(e,t){return e<=t},"==":function(e,t){return e==t},"!=":function(e,t){return e!=t},"===":function(e,t){return e===t},"!==":function(e,t){return e!==t}};const s=e.split(" ");if(s.length<3)throw new Error("nah");let n=s[0];n="value"===n?this.value:parseInt(n,10);let r=s[2];r="value"===r?this.value:parseInt(r,10);const i=s[1];if(!(i in t))throw new Error("Invalid comparison");return t[i](n,r)}firstUpdated(){fetch(this.url).then((e=>e.json())).then((e=>e[this.key])).then((e=>this.value=e))}render(){if(void 0===this.value)return M`<slot></slot>`;let e="";return this.querySelectorAll("[slot]").forEach((t=>{const s=t.getAttribute("slot");this.comparison(s)&&(e=s)})),this.querySelectorAll("[data-value]").forEach((e=>{e.textContent=this.value})),M`<slot name="${e}"></slot>`}});const ee={error:"fas fa-exclamation-circle",warning:"fas fa-exclamation-triangle",success:"fas fa-check-circle",info:"fas fa-info"};function te(){document.querySelector("pb-messages").setAttribute("touch",Date.now())}customElements.define("pb-messages",class extends Z{static get properties(){return{url:{type:String},messages:{type:Array},touch:{type:Object}}}set touch(e){this.firstUpdated()}createRenderRoot(){return this}firstUpdated(){return fetch(this.url).then((e=>e.json())).then((e=>this.messages=e)).then((e=>{const t=this.querySelector(".pf-c-alert-group");e.forEach((e=>{const s=this.renderMessage(e);t.appendChild(s)}))}))}renderMessage(e){const t="pb-message"+Math.random().toString(36).substr(2,9);const s=document.createElement("template");return s.innerHTML=`<li id=${t} class="pf-c-alert-group__item">\n            <div class="pf-c-alert pf-m-${e.level_tag} ${"error"===e.level_tag?"pf-m-danger":""}">\n                <div class="pf-c-alert__icon">\n                    <i class="${ee[e.level_tag]}"></i>\n                </div>\n                <p class="pf-c-alert__title">\n                    ${e.message}\n                </p>\n            </div>\n        </li>`,setTimeout((()=>{this.querySelector("#"+t).remove()}),1500),s.content.firstChild}render(){return M`<ul class="pf-c-alert-group pf-m-toast"></ul>`}});const se="pf-m-primary",ne=["pf-m-progress","pf-m-in-progress"];class re extends HTMLButtonElement{constructor(){super(),this.addEventListener("click",(e=>this.callAction()))}isRunning=!1;oldBody="";setLoading(){this.classList.add(...ne),this.oldBody=this.innerText,this.innerHTML='<span class="pf-c-button__progress">\n            <span class="pf-c-spinner pf-m-md" role="progressbar" aria-valuetext="Loading...">\n                <span class="pf-c-spinner__clipper"></span>\n                <span class="pf-c-spinner__lead-ball"></span>\n                <span class="pf-c-spinner__tail-ball"></span>\n            </span>\n        </span>'+this.oldBody}setDone(e){this.isRunning=!1,this.classList.remove(...ne),this.innerText=this.oldBody,this.classList.replace(se,e),te(),setTimeout((()=>{this.classList.replace(e,se)}),1e3)}callAction(){if(!0===this.isRunning)return;this.setLoading();const e=function(e){let t=null;if(document.cookie&&""!==document.cookie){const s=document.cookie.split(";");for(let n=0;n<s.length;n++){const r=s[n].trim();if(r.substring(0,e.length+1)===e+"="){t=decodeURIComponent(r.substring(e.length+1));break}}}return t}("passbook_csrf"),t=new Request(this.attributes.url.value,{headers:{"X-CSRFToken":e}});fetch(t,{method:"POST",mode:"same-origin"}).then((e=>e.json())).then((e=>{this.setDone("pf-m-success")})).catch((()=>{this.setDone("pf-m-danger")}))}}customElements.define("action-button",re,{extends:"button"});customElements.define("flow-shell-card",class extends Z{static get properties(){return{flowBodyUrl:{type:String},flowBody:{type:String}}}createRenderRoot(){return this}firstUpdated(){fetch(this.flowBodyUrl).then((e=>e.json())).then((e=>this.updateCard(e)))}async updateCard(e){switch(e.type){case"redirect":window.location=e.to;break;case"template":this.flowBody=e.body,await this.requestUpdate(),this.checkAutofocus(),te(),this.loadFormCode(),this.setFormSubmitHandlers()}}loadFormCode(){this.querySelectorAll("script").forEach((e=>{let t=document.createElement("script");t.src=e.src,document.head.appendChild(t)}))}checkAutofocus(){const e=this.querySelector("[autofocus]");null!==e&&e.focus()}updateFormAction(e){for(let t=0;t<e.elements.length;t++){if(e.elements[t].value===e.action)return console.log("pb-flow: Found Form action URL in form elements, not changing form action."),!1}return e.action=this.flowBodyUrl,console.log("pb-flow: updated form.action "+this.flowBodyUrl),!0}checkAutosubmit(e){if("autosubmit"in e.attributes)return e.submit()}setFormSubmitHandlers(){this.querySelectorAll("form").forEach((e=>{console.log("pb-flow: Checking for autosubmit attribute "+e),this.checkAutosubmit(e),console.log("pb-flow: Setting action for form "+e),this.updateFormAction(e),console.log("pb-flow: Adding handler for form "+e),e.addEventListener("submit",(t=>{t.preventDefault();let s=new FormData(e);this.flowBody=void 0,fetch(this.flowBodyUrl,{method:"post",body:s}).then((e=>e.json())).then((e=>{this.updateCard(e)}))})),e.classList.add("pb-flow-wrapped")}))}loading(){return M`<div class="pf-c-login__main-body pb-loading"><span class="pf-c-spinner" role="progressbar" aria-valuetext="Loading..."><span class="pf-c-spinner__clipper"></span> <span class="pf-c-spinner__lead-ball"></span> <span class="pf-c-spinner__tail-ball"></span></span></div>`}render(){return void 0!==this.flowBody?M([this.flowBody]):this.loading()}}),document.querySelectorAll("button.pf-c-dropdown__toggle").forEach((e=>{e.addEventListener("click",(e=>{const t=e.target.closest(".pf-c-dropdown").querySelector(".pf-c-dropdown__menu");t.hidden=!t.hidden}))})),document.querySelectorAll("input[type=search]").forEach((e=>{e.addEventListener("search",(t=>{""===e.value&&e.parentElement.submit()}))})),document.querySelectorAll("[data-pb-fetch-fill]").forEach((e=>{const t=e.dataset.pbFetchFill,s=e.dataset.pbFetchKey;fetch(t).then((e=>e.json())).then((t=>{e.textContent=t[s],e.value=t[s]}))})),document.querySelectorAll("[data-target='modal']").forEach((e=>{e.addEventListener("click",(e=>{const t=e.target.closest('[data-target="modal"]').attributes["data-modal"].value;document.querySelector("#"+t).removeAttribute("hidden")}))})),document.querySelectorAll(".pf-c-modal-box [data-modal-close]").forEach((e=>{e.addEventListener("click",(e=>{e.target.closest(".pf-c-backdrop").setAttribute("hidden",!0)}))})),document.querySelectorAll(".pf-c-check__label").forEach((e=>{e.addEventListener("click",(e=>{const t=e.target.parentElement.querySelector("input[type=checkbox]");t.checked=!t.checked}))})),document.querySelectorAll(".codemirror").forEach((e=>{let t="xml";"data-cm-mode"in e.attributes&&(t=e.attributes["data-cm-mode"].value),e.removeAttribute("required"),CodeMirror.fromTextArea(e,{mode:t,theme:"monokai",lineNumbers:!1,readOnly:e.readOnly,autoRefresh:!0})}));document.querySelectorAll("input[name=name]").forEach((e=>{e.addEventListener("input",(e=>{const t=e.target.closest("form");if(null===t)return;t.querySelector("input[name=slug]").value=e.target.value.toLowerCase().replace(/ /g,"-").replace(/[^\w-]+/g,"")}))})),document.querySelectorAll(".pf-c-page__header-brand-toggle>button").forEach((e=>{e.addEventListener("click",(e=>{const t=document.querySelector(".pf-c-page__sidebar");t.classList.contains("pf-m-expanded")?(t.classList.remove("pf-m-expanded"),t.style.zIndex=0):(t.classList.add("pf-m-expanded"),t.style.zIndex=200)}))})),document.querySelectorAll(".pf-m-expandable>.pf-c-nav__link").forEach((e=>{e.addEventListener("click",(t=>{t.preventDefault(),e.parentElement.classList.toggle("pf-m-expanded")}))}))}();
//# sourceMappingURL=passbook.js.map
