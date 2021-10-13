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

    addPet(petData) {
      let pet = this.constructor.petTemplate.content.cloneNode(true);
      pet.querySelector(".name").textContent = petData.name;
      pet.querySelector(".age").textContent = petData.age;
      this.shadowRoot.querySelector("#pets").append(pet);
    }

    getPet(index) {
      return this.shadowRoot.querySelector(`#pets > :nth-child(${index + 1})`);
    }
  }
);
```

## Helpers

### <code>html``</code>

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

### `light()` and `shadow()`

```js
this.querySelector(".foo");
this.querySelectorAll(".foo");
this.shadowRoot.querySelector(".foo");
this.shadowRoot.querySelectorAll(".foo");
```

is equivalent to:

```js
light(this, ".foo");
lightAll(this, ".foo");
shadow(this, ".foo");
shadowAll(this, ".foo");
```
