const { getAnimations } = require("../getStyles");
const { flexLayout, encodeHTML } = require("../common/utils");

class Card {
  constructor({
    width = 100,
    height = 100,
    border_radius = 4.5,
    colors = {},
    customTitle,
    defaultTitle = "",
    titlePrefixIcon,
  }) {
    this.width = width;
    this.height = height;

    this.hideBorder = false;
    this.hideTitle = false;

    this.border_radius = border_radius;

    // returns theme based colors with proper overrides and defaults
    this.colors = colors;
    this.title =
      customTitle !== undefined
        ? encodeHTML(customTitle)
        : encodeHTML(defaultTitle);

    this.css = "";

    this.paddingX = 25;
    this.paddingY = 35;
    this.titlePrefixIcon = titlePrefixIcon;
    this.animations = true;
  }

  disableAnimations() {
    this.animations = false;
  }

  setCSS(value) {
    this.css = value;
  }

  setHideBorder(value) {
    this.hideBorder = value;
  }

  setHideTitle(value) {
    this.hideTitle = value;
    if (value) {
      this.height -= 30;
    }
  }

  setTitle(text) {
    this.title = text;
  }

  renderTitle() {
    const titleText = `
      <text
        x="0"
        y="0"
        class="header"
        data-testid="header"
      >${this.title}</text>
    `;

    const prefixIcon = `
      <svg
        class="icon"
        x="0"
        y="-13"
        viewBox="0 0 16 16"
        version="1.1"
        width="16"
        height="16"
      >
        ${this.titlePrefixIcon}
      </svg>
    `;
    return `
      <g
        data-testid="card-title"
        transform="translate(${this.paddingX}, ${this.paddingY})"
      >
        ${flexLayout({
          items: [this.titlePrefixIcon && prefixIcon, titleText],
          gap: 25,
        }).join("")}
      </g>
    `;
  }

  renderGradient() {
    if (typeof this.colors.bgColor !== "object") return "";

    const gradients = this.colors.bgColor.slice(1);
    return typeof this.colors.bgColor === "object"
      ? `
        <defs>
          <linearGradient
            id="gradient" 
            gradientTransform="rotate(${this.colors.bgColor[0]})"
          >
            ${gradients.map((grad, index) => {
              let offset = (index * 100) / (gradients.length - 1);
              return `<stop offset="${offset}%" stop-color="#${grad}" />`;
            })}
          </linearGradient>
        </defs>
        `
      : "";
  }

  render(body) {
    return `
      <svg
        width="${this.width}"
        height="${this.height}"
        viewBox="0 0 ${this.width} ${this.height}"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <style>
          .header {
            font: 200 18px Chilanka, 'Segoe Print', Ubuntu, Sans-Serif;
            fill: ${this.colors.titleColor};
            animation: fadeInAnimation 0.8s ease-in-out forwards;
          }
          ${this.css}

          ${process.env.NODE_ENV === "test" ? "" : getAnimations()}
          ${
            this.animations === false
              ? `* { animation-duration: 0s !important; animation-delay: 0s !important; }`
              : ""
          }
        </style>
        <style>
          @font-face {
            font-family: 'Chilanka';
            font-style: normal;
            font-weight: 400;
            font-display: swap;
            src: url(data:font/woff2;base64,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) format('woff2');
            unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
          }
        </style>

        ${this.renderGradient()}

        <rect
          class="card-bg"
          data-testid="card-bg"
          x="0.5"
          y="0.5"
          rx="${this.border_radius}"
          height="99%"
          stroke="${this.colors.borderColor}"
          width="${this.width - 1}"
          fill="${
            typeof this.colors.bgColor === "object"
              ? "url(#gradient)"
              : this.colors.bgColor
          }"
          stroke-opacity="${this.hideBorder ? 0 : 1}"
        />

        ${this.hideTitle ? "" : this.renderTitle()}

        <g
          data-testid="main-card-body"
          transform="translate(0, ${
            this.hideTitle ? this.paddingX : this.paddingY + 20
          })"
        >
          ${body}
        </g>
      </svg>
    `;
  }
}

module.exports = Card;
