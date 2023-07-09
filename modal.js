class Modal extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });
    this.isOpened = false;

    this.shadowRoot.innerHTML = `
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        :host([opened]) #modal {
          display: flex;
        }

        :host([opened]) #backdrop {
          display: block;
        }

        ::slotted(h1) {
          font-size: 2rem;
        }

        #backdrop {
          position: fixed;
          top:0;
          left:0;
          width:100%;
          height:100%;
          background: rgba(0,0,0,0.2);

          display: none;
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
          flex-direction: column;

          display: none;
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
        <h1>
          <slot name="modal-title"></slot>
        </h1>
        <section id="modal-content">
          <slot></slot>
        </section>

        <section id="modal-actions">
          <button data-id="cancel-button">Cancel</button>
          <button data-id="confirm-button">Okay</button>
        </section>
      </div>
    `;

    const $modalActions = this.shadowRoot.querySelector("#modal-actions");

    $modalActions.addEventListener("click", this.handleModalAction.bind(this));
  }

  // attributeChangedCallback(name, oldValue, newValue) {
  //   if(name === 'opened'){
  //     if(this.hasAttribute('opened')) {
  //       this.shadowRoot.querySelector('#backdrop').style.display = 'block';
  //       this.shadowRoot.querySelector('#modal').style.display = 'flex';
  //     }
  //   }
  // }

  // static get observedAttributes(){
  //   return ['opened']
  // }

  handleModalAction({ target }) {
    if (
      target.dataset.id === "cancel-button" ||
      target.dataset.id === "confirm-button"
    ) {
      this.close();
    }
  }

  open() {
    this.isOpened = true;
    this.setAttribute("opened", "");
  }

  close() {
    if (this.hasAttribute("opened")) {
      this.removeAttribute("opened");
      this.isOpened = false;
    }
  }
}

customElements.define("web-modal", Modal);
