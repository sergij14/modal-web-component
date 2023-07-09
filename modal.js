class Modal extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });

    this.shadowRoot.innerHTML = `
      <style>
        * {
          margin:0;
          box-sizing: border-box;
        }

        #backdrop {
          position: fixed;
          top:0;
          left:0;
          width:100%;
          height:100%;
          background: rgba(0,0,0,0.2);
        }

        #modal {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: white;
          padding: 10px;
          border-radius:8px;
        }
      </style>

      <div id="backdrop"></div>
      <div id="modal">
        <slot>default</slot>
      </div>
    `;
  }
}

customElements.define("web-modal", Modal);
