(() => {
  const template = document.createElement("template");
  template.innerHTML = `
  <div>hello world</div>
    `;
  window.customElements.define(
    "ogp-me",
    class extends HTMLElement {
      constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
      }
    }
  );
})();
