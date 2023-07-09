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
          position: fixed;
          z-index: 99;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: white;
          padding: 10px;
          border-radius:8px;

          height: 30rem;
          width:50%;
          display: flex;
          flex-direction: column;
        }

        #modal-actions{
          margin-top: auto;
          padding-top: 1rem;
          border-top: 1px gray solid;

          display:flex;
          gap:0.5rem;
          justify-content: flex-end;
        }
      </style>

      <div id="backdrop"></div>
      <div id="modal">
        <h1>Please Confirm</h1>
        <section id="modal-content">
          <slot>default</slot>
        </section>

        <section id="modal-actions">
          <button>Cancel</button>
          <button>Okay</button>
        </section>
      </div>
    `;
  }
}

customElements.define("web-modal", Modal);
