const template = document.createElement("template");
template.innerHTML = `
  <div class="card">
    <div class="container">
      <a class="link" href="#" target="_blank"><img class="img" /></a>
      <p class="site"></p>
      <p class="title"></p>
      <p class="description"></p>
    </div>
  </div>
  `;
const style = document.createElement("style");
style.innerHTML = `
        p {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .card {
          max-width: 100%;
        }
        .container {
          width: 100%;
          background-color: #f2f3f5;
        }
        .container .img {
          width: 100%;
          height: auto;
        }
        .container .site {
          color: #606770;
          font-size: 12px;
          text-transform: uppercase;
        }
        .container .title {
          color: #000000;
          font-weight: 600;
        }
        .container .description {
          color: #606770;
          font-size: 14px;
          line-height: 28px;
        }
    `;

class OgpMe extends HTMLElement {
  proxy = "";
  src = "";
  width = "";

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
  connectedCallback() {
    this.proxy = this.getAttribute("proxy") || this.proxy;
    this.src = this.getAttribute("src") || this.src;
    this.width = this.getAttribute("width") || this.width;
    this._render();
  }
  _getContentAttribute(doc, selector) {
    const element = doc.querySelector(selector);
    return element === null ? "" : element.getAttribute("content");
  }
  async _render() {
    const url = this.proxy ? `${this.proxy}/${this.src}` : this.src;
    const txt = await (await fetch(url)).text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(txt, "text/html");
    const image = this._getContentAttribute(doc, "meta[property='og:image']");
    const site = this._getContentAttribute(
      doc,
      "meta[property='og:site_name']"
    );
    const title = this._getContentAttribute(doc, "meta[property='og:title']");
    const description = this._getContentAttribute(
      doc,
      "meta[property='og:description']"
    );
    if (image === "") {
      this.remove();
      return;
    }
    this.shadowRoot
      .querySelector(".card")
      .setAttribute("style", `width: ${this.width}`);
    this.shadowRoot.querySelector(".link").setAttribute("href", this.src);
    this.shadowRoot.querySelector(".img").setAttribute("src", image);
    this.shadowRoot.querySelector(".site").innerHTML = site;
    this.shadowRoot.querySelector(".title").innerHTML = title;
    this.shadowRoot.querySelector(".description").innerHTML = description;
    this.shadowRoot.appendChild(style);
  }
}

export { OgpMe };
