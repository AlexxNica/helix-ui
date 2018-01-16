import { HXElement } from './HXElement';
import { KEYS } from '../util';
import shadowStyles from './_hx-modal.less';

const tagName = 'hx-modal';
const template = document.createElement('template');

template.innerHTML = `
  <style>${shadowStyles}</style>
  <div id="container">
    <button id="close">
      <hx-icon type="times"></hx-icon>
    </button>
    <slot></slot>
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
        this._keyUp = this._keyUp.bind(this);
    }

    connectedCallback () {
        this.$upgradeProperty('open');
        this._target = this.shadowRoot.querySelector("#close");

        this._target.addEventListener('click', this._toggle);
        document.addEventListener('keyup', this._keyUp);
    }

    disconnectedCallback () {
        this._target.removeEventListener('click', this._toggle);
        document.removeEventListener('keyup', this._keyUp);
    }

    attributeChangedCallback (attr, oldValue, newValue) {
        this.setAttribute('aria-hidden', newValue !== '');
    }

    _toggle () {
        this.open = !this.open;
    }

    _keyUp (event) {
        switch (event.keyCode) {
            case KEYS.Escape:
                this.open = false;
                break;
            default:
                break;
        }
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
