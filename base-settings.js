class BaseSettings extends HTMLElement {
  constructor() {
    super();
  }
  
  connectedCallback() {
    this.innerHTML = `
      <dialog class="_bs">
        <main>
          <form id="base-form" method="dialog" novalidate>
            <p>
              <button type="submit">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"></polygon><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>
              </button>
            </p>
            <p class="modes">
              <label>
                <input type="checkbox" id="base-mode-doc">
                <span>Doc Mode</span>
              </label>
              <label>
                <input type="checkbox" id="base-mode-indent">
                <span>Indent Mode</span>
              </label>
            </p>
            <p class="fields">
              <label>
                <span>Font Family</span>
                <input type="text" id="base-font-family" list="typefaces">
                <datalist id="typefaces">
                  <option value="serif">Serif</option>
                  <option value="cursive">Cursive</option>
                  <option value="sans-serif">Sans Serif</option>
                  <option value="system-ui">System UI</option>
                  <option value="monospace">Monospace</option>
                </datalist>

              </label>
              <label>
                <span>Font Size</span>
                <input type="number" id="base-font-size" step=".0625">
              </label>
              <label>
                <span>Font Scale</span>
                <select id="base-font-scale">
                  <option value="1.067">Minor Second</option>
                  <option value="1.125">Major Second</option>
                  <option value="1.2">Minor Third</option>
                  <option value="1.25">Major Third</option>
                  <option value="1.333">Perfect Fourth</option>
                  <option value="1.414">Augmented Fourth</option>
                  <option value="1.5">Perfect Fifth</option>
                  <option value="1.618">Golden Ratio</option>
                </select>
              </label>
            </p>
            <p class="fields">
              <label>
                <span>Line Height</span>
                <input type="number" id="base-line-height" step=".0625">
              </label>
              <label>
                <span>Line Length</span>
                <input type="number" id="base-line-length">
              </label>
              <label>
                <span>Block Gap</span>
                <input type="number" id="base-block-gap" step=".0625">
              </label>
            </p>
            <p class="fields">
              <label>
                <span>Color Scheme</span>
                <select id="base-color-scheme">
                  <option value="">Browser</option>
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                </select>
              </label>
              <label>
                <span>Color Hue</span>
                <input type="number" id="base-color-hue" min="0" max="360" step="1">
              </label>
            </p>
          </form>
        </main>
      </dialog>
      <style>
        ._bs {
          box-shadow: 
            -0px -0px 1px oklch(from currentColor l c h / .01),
            -2px -2px 3px oklch(from currentColor l c h / .03),
            -4px -4px 7px oklch(from currentColor l c h / .05)
          ;
          margin: auto 0 0 auto;
          max-width: 20em;
          border: 1px solid;
          border-color: oklch(from currentColor l c h / .5);
          inset-block-end: 16px;
          inset-inline-end: 16px;
          border-radius: 1em;
        }
        
        @supports 
        (color: oklch(0 0 0)) and 
        (color: light-dark(#000, #fff)) 
        { 
          ._bs {
            background-color: light-dark(
              oklch(1 0.003 var(--base-color-hue)),
              oklch(0.22 .03 var(--base-color-hue))
            );
          }
        }
    
        dialog::backdrop {
          background: transparent;
        }
    
        ._bs button[type=submit] {
          display: flex;
          justify-content: center;
          border: 0;
          margin: auto;
          padding: .25em;
        }
    
        ._bs form {
          display: grid;
          width: 100%;
          gap: calc(.5 * var(--bbg));
        }
    
        ._bs p {
          width: 100%;
          display: flex;
          flex-flow: row wrap;
          justify-content: space-between;
          gap: calc(.25 * var(--bbg)) calc(.75 * var(--bbg));
        }

        ._bs .modes {
          margin-top: var(--bbg);
        }
    
        ._bs .fields label:not([hidden]) {
          display: grid;
          gap: .25em;
          flex: 1 1 calc(50% - calc(.75 * var(--bbg)));
        }
    
        ._bs .fields span {
          font-size: calc(var(--bfs-075) * 1rem);
        }
    
        ._bs .fields input, 
        ._bs .fields select 
        {
          width: 100%;
        }
      </style>
  
    `;

    document.addEventListener("click", e => {
      if (e.target.closest(".base-settings")) {
        this.querySelector("dialog").showModal();
      }
    })

    const doc_sheets = Array.from(document.styleSheets).filter(sheet => {
      if (sheet.ownerNode.closest(this.nodeName)) {
        return false;
      } else {
        return true;
      }
    })

    
    // onLoad
    {
      
      // Doc Mode
      {
        const has_base_sheet = doc_sheets.some(sheet => sheet.title?.toLowerCase()?.trim() == "base");
        const label_mode_doc = this.querySelector("#base-mode-doc").closest("label");
        
        if (has_base_sheet) {
          label_mode_doc.hidden = false;
          const has_other_sheet = doc_sheets.some(sheet => sheet.title?.toLowerCase()?.trim() != "base");
          const mode_doc = this.querySelector("#base-mode-doc");

          if (has_other_sheet) {
            mode_doc.checked = false;
            mode_doc.disabled = false;
          } else {
            mode_doc.checked = true;
            mode_doc.disabled = true;
          }
        } else {
          label_mode_doc.hidden = true;
        }
      }
      

      const root_styles = getComputedStyle(document.documentElement);

      // Indent Mode
      {
        const mode_indent = root_styles.getPropertyValue("--base-mode-indent").trim();
        const label_mode_indent = this.querySelector("#base-mode-indent").closest("label");
        
        if (mode_indent) {
          label_mode_indent.hidden = false;
          this.querySelector("#base-mode-indent").checked = parseInt(mode_indent) === 1;
        } else {
          label_mode_indent.hidden = true;
        }
      }
      
      // Font Family
      {
        const font_family = root_styles.getPropertyValue("--base-font-family").trim();
        const label_font_family = this.querySelector("#base-font-family").closest("label");

        if (font_family) {
          label_font_family.hidden = false;

          const def_typefaces = ["serif", "sans-serif", "cursive", "system-ui", "monospace"];

          if (def_typefaces.includes(font_family.toLowerCase())) {
          } else {
            const option = document.createElement("option");

            option.value = font_family;
            option.textContent = font_family;
            this.querySelector("#base-font-family").append(option);
          }
          
          this.querySelector("#base-font-family").value = font_family;
        } else {
          label_font_family.hidden = true;
        }

      }

      // Font Size
      {
        const font_size = root_styles.getPropertyValue("--base-font-size").trim();
        const label_font_size = this.querySelector("#base-font-size").closest("label");
        const positive_numbers = /^\d+\.?\d*$/;

        if (positive_numbers.test(font_size)) {
          label_font_size.hidden = false;
          this.querySelector("#base-font-size").value = font_size;
        } else {
          label_font_size.hidden = true;
        }
      }

      // Font Scale
      {
        const font_scale = root_styles.getPropertyValue("--base-font-scale").trim();
        const label_font_scale = this.querySelector("#base-font-scale").closest("label");

        if (font_scale) {
          label_font_scale.hidden = false;

          const scale_set = [1.067, 1.125, 1.2, 1.25, 1.333, 1.414, 1.5, 1.618];

          if (scale_set.includes(parseFloat(font_scale))) {
          } else {
            const option = document.createElement("option");

            option.value = font_scale;
            option.textContent = font_scale;
            this.querySelector("#base-font-scale").append(option);
          }
          
          this.querySelector("#base-font-scale").value = font_scale;
        } else {
          label_font_scale.hidden = true;
        }

      }

      // Line Height
      {
        const line_height = root_styles.getPropertyValue("--base-line-height").trim();
        const label_line_height = this.querySelector("#base-line-height").closest("label");
        const positive_numbers = /^\d*\.?\d*$/;

        if (positive_numbers.test(line_height)) {
          label_line_height.hidden = false;
          this.querySelector("#base-line-height").value = line_height;
        } else {
          label_line_height.hidden = true;
        }
      }

      // Line Length
      {
        const line_length = root_styles.getPropertyValue("--base-line-length").trim();
        const label_line_length = this.querySelector("#base-line-length").closest("label");

        if (parseFloat(line_length)) {
          label_line_length.hidden = false;
          this.querySelector("#base-line-length").value = parseFloat(line_length);
        } else {
          label_line_length.hidden = true;
        }
      }
      
      // Block Gap
      {
        const block_gap = root_styles.getPropertyValue("--base-block-gap").trim();
        const label_block_gap = this.querySelector("#base-block-gap").closest("label");
        const positive_numbers = /^\d*\.?\d*$/;

        if (positive_numbers.test(block_gap)) {
          label_block_gap.hidden = false;
          this.querySelector("#base-block-gap").value = block_gap;
        } else {
          label_block_gap.hidden = true;
        }
      }
      
      // Color Hue
      {
        const supports = CSS.supports('color', 'oklch(0 0 0)');
        const color_hue = root_styles.getPropertyValue("--base-color-hue").trim();
        const label_color_hue = this.querySelector("#base-color-hue").closest("label");
        const positive_numbers = /^\d+\.?\d*$/;

        if (supports && positive_numbers.test(color_hue)) {
          label_color_hue.hidden = false;
          this.querySelector("#base-color-hue").value = color_hue;
        } else {
          label_color_hue.hidden = true;
        }
      }
      
      // Color Scheme
      {
        const color_scheme = document.querySelector("meta[name=color-scheme]");
        const label_color_scheme = this.querySelector("#base-color-scheme").closest("label");

        if (color_scheme) {
          const content = color_scheme.content.split(" ");
          const node_color_scheme = this.querySelector("#base-color-scheme");
          const has_light = content.includes("light");
          const has_dark = content.includes("dark");

          if (has_light && has_dark) {
            node_color_scheme.value = "";
            label_color_scheme.hidden = false;
          } else {
            label_color_scheme.hidden = true;
          }
        } else {
          label_color_scheme.hidden = true;
        }

      }
    }

    // onChange
    {
      this.addEventListener("change", e => {
        const form = e.target;
        const root_style = document.documentElement.style;

        switch (form.id) {

          case "base-mode-doc":

            if (form.checked) {

              doc_sheets.forEach(sheet => {
                if (sheet.title?.toLowerCase().trim() == "base") {
                  sheet.disabled = false;
                } else {
                  
                  // Store disabled to remember later
                  if (sheet.disabled === true) {
                    sheet.dataset.disabled = true;
                  }

                  sheet.disabled = true;
                }
              })

            } else {
              doc_sheets.forEach(sheet => {
                if (sheet.ownerNode.dataset.disabled) {
                  sheet.removeAttribute("data-disabled");
                  sheet.disabled = true;
                } else {
                  sheet.disabled = false;
                }
              })
            }

            break;

          case "base-mode-indent":
            root_style.setProperty("--base-mode-indent", form.checked * 1);
            break;

          case "base-font-family":
            root_style.setProperty("--base-font-family", form.value);
            break;

          case "base-font-size":
            root_style.setProperty("--base-font-size", form.value);
            break;

          case "base-font-scale":
            root_style.setProperty("--base-font-scale", form.value);
            break;

          case "base-line-height":
            root_style.setProperty("--base-line-height", form.value);
            break;

          case "base-line-length":
            root_style.setProperty("--base-line-length", form.value + "rem");
            break;

          case "base-block-gap":
            root_style.setProperty("--base-block-gap", form.value);
            break;

          case "base-color-scheme":
            document.querySelector("meta[name=color-scheme]").content = form.value;
            break;

          case "base-color-hue":
            root_style.setProperty("--base-color-hue", form.value);
            break;
  
        }
      })
    }
  }
}

customElements.define("base-settings", BaseSettings);