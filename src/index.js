import './index.css';
import { init_tabs } from "./components/tabs.js";
import { init_enclosure } from "./components/enclosure.js";
import * as utils from './utils.js';

const COMPONENT_REGISTRY = {
  "data-base-tabs": init_tabs,
  'data-base-enclosure': init_enclosure,
}

export const base = {

  utils: utils,
  init_all(root = document) {
    Object.entries(COMPONENT_REGISTRY).forEach(([selector, init_function]) => {
      root.querySelectorAll(`[${selector}]`).forEach(el => {
        if (el.dataset.baseEnhanced === 'true') return;

        try {
          init_function(el);
          el.dataset.baseEnhanced = 'true';
        } catch (e) {
          console.error(e);
        }
      })
    })
  }
};

if (typeof window !== 'undefined') {
  window.base = base;
}