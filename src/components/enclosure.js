import { matchContainer } from "../utils/match-container.js";

export function init_enclosure(component) {
  const container = document.body;
  
  matchContainer(container, component.dataset.media, e => {
    const alt_btn_list = component.querySelectorAll('[data-is="base-enclosure-button"]');

    alt_btn_list.forEach(alt_btn => {
      const target_id = alt_btn.dataset.for;
      const target = document.getElementById(target_id);

      if (!target) return;
      
      const target_attrs = {
        "role": "button",
        "tabindex": 0,
        "aria-controls": target_id,
        "aria-expanded": alt_btn.dataset.expanded.trim().toLowerCase() === "true",
      }

      if (e.matches) {

        // set default state
        target.hidden = !target_attrs['aria-expanded'];

        // Add properties
        Object.keys(target_attrs).forEach(attr => {
          alt_btn.setAttribute(attr, target_attrs[attr]);
        });

        // Add listeners
        alt_btn.addEventListener("click", toggle_enclosure);
        alt_btn.addEventListener("keydown", toggle_enclosure);
      } else {

        // Remove button properties
        Object.keys(target_attrs).forEach(attr => {
          alt_btn.removeAttribute(attr);
        });

        // Remove listeners
        alt_btn.removeEventListener("click", toggle_enclosure);
        alt_btn.removeEventListener("keyboard", toggle_enclosure);

        // Expand target permanently
        target.hidden = false;
      }
    });
  })
}

function toggle_enclosure(e) {

  // if keydown event, allow only spacebar and enter key
  if (e.type === 'keydown' && ![' ', 'Enter'].includes(e.key)) return;

  // Stop spacebar scrolling
  if (e.key === ' ') e.preventDefault();

  const alt_btn = e.currentTarget;
  const target_id = alt_btn.dataset.for;
  const target = document.querySelector(`#${target_id}:not([hidden] *)`);

  if (!target) return;

  const is_expanded = alt_btn.getAttribute('aria-expanded') === 'false';

  if (is_expanded) {
    target.hidden = false;
    alt_btn.setAttribute("aria-expanded", true);
  } else {
    target.hidden = true;
    alt_btn.setAttribute("aria-expanded", false);
  }
}