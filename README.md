# Eka

Common patterns for custom elements

## Patterns

### Define a custom element

```js
customElements.define(
  "x-hello-world",
  class extends HTMLElement {
    static template = document.createElement("template");
    static {
      this.template.innerHTML = `Hello, world!`;
    }

    constructor() {
      super();
      this.attachShadow({ mode: "open" });
      this.shadowRoot.append(this.constructor.template.content.cloneNode(true));
    }
  }
);
```

### With `html`

```js
import { html } from "eka";

customElements.define(
  "x-hello-world",
  class extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
      this.shadowRoot.append(html`Hello, world!`);
    }
  }
);
```

### Get/Set data

```js
customElements.define(
  "x-hello-world",
  class extends HTMLElement {
    static template = document.createElement("template");
    static {
      this.template.innerHTML = `Hello, <span id="name"></span>!`;
    }

    constructor() {
      super();
      this.attachShadow({ mode: "open" });
      this.shadowRoot.append(this.constructor.template.content.cloneNode(true));
    }

    get name() {
      return this.shadowRoot.querySelector("#name").textContent;
    }

    set name(name) {
      this.shadowRoot.querySelector("#name").textContent = name;
    }
  }
);
```

### Get/Set an item in a list

```js
customElements.define(
  "x-hello-world",
  class extends HTMLElement {
    static template = document.createElement("template");
    static {
      this.template.innerHTML = `<ul id="pets"></ul>`;
    }

    constructor() {
      super();
      this.attachShadow({ mode: "open" });
      this.shadowRoot.append(this.constructor.template.content.cloneNode(true));
    }

    static petTemplate = document.createElement("template");
    static {
      this.petTemplate.innerHTML = `
      <li>
        <span class="name"></span>, <span class="age"></span>
      </li>`;
    }

    addPet(pet) {
      let petElement = this.shadowRoot
        .querySelector("#pets")
        .appendChild(
          this.constructor.petTemplate.content.cloneNode(true).firstElementChild
        );
      petElement.querySelector(".name").textContent = pet.name;
      petElement.querySelector(".age").textContent = pet.age;
    }

    getPet(i) {
      return this.shadowRoot.querySelector(`#pets > :nth-child(${i + 1})`);
    }
  }
);
```
