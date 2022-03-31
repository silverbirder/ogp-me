(() => {
  const containerTemplate = document.createElement("template");
  containerTemplate.innerHTML = `<div id="container"></div>`;
  const loadingTemplate = document.createElement("template");
  loadingTemplate.innerHTML = `<div id="loading">loading...</div>`;
  const startTemplate = document.createElement("template");
  startTemplate.innerHTML = `<div id="started">started!</div>`;

  window.customElements.define(
    "ogp-me",
    class extends HTMLElement {
      constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(containerTemplate.content.cloneNode(true));
      }
      connectedCallback() {
        this._render();
      }
      async _render() {
        const proxy = this.getAttribute("proxy");
        const src = this.getAttribute("src");
        const res = await (await fetch(`${proxy}/${src}`)).text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(res, "text/html");
        console.log(doc.querySelector("title").innerText);

        this.shadowRoot
          .querySelector("#container")
          .appendChild(loadingTemplate.content.cloneNode(true));
        setTimeout(() => {
          const parent = this.shadowRoot.querySelector("#container");
          const loading = this.shadowRoot.querySelector("#loading");
          parent.replaceChild(startTemplate.content.cloneNode(true), loading);
        }, 500);
      }
      _fetch() {}
    }
  );
})();
