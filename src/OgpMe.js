const template = document.createElement("template");
template.innerHTML = `
  <style>
      .card {
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
        transition: 0.3s;
        width: 512px;
      }
      .card:hover {
        box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
      }
      .container {
        padding: 2px 16px;
        background-color: #f2f3f5;
      }
      .img {
        width: 100%;
        height: auto;
      }
      .site {
        color: #606770;
        font-size: 12px;
        text-transform: uppercase;
      }
      .title {
        font-weight: 600;
      }
      .description {
        color: #606770;
        font-size: 14px;
        line-height: 20px;
      }
  </style>
  <div class="card">
    <a class="link" href="#" target="_blank"><img class="img" /></a>
    <div class="container">
      <p class="site"></p>
      <p class="title"></p>
      <p class="description"></p>
    </div>
  </div>
  `;
class OgpMe extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
  connectedCallback() {
    this._render();
  }
  _render() {
    const proxy = this.getAttribute("proxy");
    const src = this.getAttribute("src");
    fetch(`${proxy}/${src}`).then((res) => {
      res.text().then((txt) => {
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
        this.shadowRoot.querySelector(".img").setAttribute("src", image);
        this.shadowRoot.querySelector(".site").innerHTML = site;
        this.shadowRoot.querySelector(".title").innerHTML = title;
        this.shadowRoot.querySelector(".description").innerHTML = description;
        this.shadowRoot.querySelector(".link").setAttribute("href", src);
      });
    });
  }
}

export { OgpMe };
