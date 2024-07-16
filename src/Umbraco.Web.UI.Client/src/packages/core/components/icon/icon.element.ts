import { extractUmbColorVariable } from '../../resources/extractUmbColorVariable.function.js';
import { UmbTextStyles } from '@umbraco-cms/backoffice/style';
import { html, customElement, property, state, ifDefined, css } from '@umbraco-cms/backoffice/external/lit';
import { UmbLitElement } from '@umbraco-cms/backoffice/lit-element';

/**
 * @element umb-icon
 * @description A wrapper for the uui-icon component with color alias support
 * @extends {UmbLitElement}
 */
@customElement('umb-icon')
export class UmbIconElement extends UmbLitElement {
	@state()
	private _icon?: string;

	@state()
	private _color?: string;

	@state()
	private _fallbackColor?: string;

	/**
	 * Color alias or a color code directly.\
	 * If a color has been set via the name property, this property will override it.
	 * */
	@property({ type: String })
	public set color(value: string) {
		if (value) {
			this.#setColorStyle(value, true);
		} else {
			this._color = undefined;
		}
	}
	public get color(): string {
		return this._color ?? '';
	}

	#setColorStyle(value: string, dominant = false) {
		const alias = value.replace('color-', '');
		const variable = extractUmbColorVariable(alias);
		const color = alias ? (variable ? `--uui-icon-color: var(${variable})` : `--uui-icon-color: ${alias}`) : undefined;
		if (dominant) {
			this._color = color;
		} else {
			this._fallbackColor = color;
		}
	}

	/**
	 * The icon name. Can be appended with a color.\
	 * Example **icon-heart color-red**
	 */
	@property({ type: String })
	public set name(value: string | undefined) {
		const [icon, color] = value ? value.split(' ') : [];

		if (color) {
			this.#setColorStyle(color);
		} else {
			this._fallbackColor = undefined;
		}

		this._icon = icon;
	}
	public get name(): string | undefined {
		return this._icon;
	}

	override render() {
		return html`<uui-icon
			name=${ifDefined(this._icon)}
			style=${ifDefined(this._color ?? this._fallbackColor)}></uui-icon>`;
	}

	static override styles = [
		UmbTextStyles,
		css`
			:host {
				display: flex;
				justify-content: center;
				align-items: center;
			}
		`,
	];
}

declare global {
	interface HTMLElementTagNameMap {
		'umb-icon': UmbIconElement;
	}
}
