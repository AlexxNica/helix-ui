import { HXElement } from './HXElement';
import shadowStyles from './_hx-modal.less';

const tagName = 'hx-modal';
const template = document.createElement('template');

template.innerHTML = `
  <style>${shadowStyles}</style>
  <div id="backdrop">
    <div id="container">
      <hx-icon type="times" id="close"></hx-icon>
      <div id="header">
        <slot name="header"></slot>
      </div>
      <slot></slot>
      <slot name="footer"><slot>
    </div>
  </div>
`;

export class HXModalElement extends HXElement {
    static get is () {
        return tagName;
    }

    static get observedAttributes () {
        return [ 'open' ];
    }

    constructor () {
        super(tagName, template);
        this._toggle = this._toggle.bind(this);
    }

    connectedCallback () {
        this.$upgradeProperty('open');
        this._target = this.shadowRoot.querySelector("#close");

        this._target.addEventListener('click', this._toggle);
    }

    disconnectedCallback () {
        this._target.removeEventListener('click', this._toggle);
    }

    attributeChangedCallback (attr, oldValue, newValue) {
        this.setAttribute('aria-hidden', newValue !== '');
    }

    _toggle () {
        this.open = !this.open;
    }

    set open (value) {
        if (value) {
            this.setAttribute('open', '');
            this.$emit('open');
        } else {
            this.removeAttribute('open');
            this.$emit('close');
        }
    }

    get open () {
        return this.hasAttribute('open');
    }
}
