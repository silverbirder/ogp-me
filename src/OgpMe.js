const template = document.createElement("template");
template.innerHTML = `
  <style>
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
  </style>
  <div class="card">
    <div class="container">
      <a class="link" href="#" target="_blank"><img class="img" /></a>
      <p class="site"></p>
      <p class="title"></p>
      <p class="description"></p>
    </div>
  </div>
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
  async _render() {
    const url = this.proxy ? `${this.proxy}/${this.src}` : this.src;
    const txt = await (await fetch(url)).text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(txt, "text/html");
    const image = doc
      .querySelector("meta[property='og:image']")
      .getAttribute("content");
    const site = doc
      .querySelector("meta[property='og:site_name']")
      .getAttribute("content");
    const title = doc
      .querySelector("meta[property='og:title']")
      .getAttribute("content");
    const description = doc
      .querySelector("meta[property='og:description']")
      .getAttribute("content");
    this.shadowRoot
      .querySelector(".card")
      .setAttribute("style", `width: ${this.width}`);
    this.shadowRoot.querySelector(".img").setAttribute("src", image);
    this.shadowRoot.querySelector(".site").innerHTML = site;
    this.shadowRoot.querySelector(".title").innerHTML = title;
    this.shadowRoot.querySelector(".description").innerHTML = description;
    this.shadowRoot.querySelector(".link").setAttribute("href", this.src);
  }
}

export { OgpMe };
