export function init_tabs(component) {

  const tab_list = Array.from(component.querySelectorAll('[role="tab"]'));

  tab_list.forEach(tab => {
    tab.addEventListener("click", e => show_panel_of(tab_list, tab));
    tab.addEventListener("keydown", e => {
      const tab_nav_keys = ["ArrowRight", "ArrowLeft", "Home", "End"];
      const panel_show_keys = [" ", "Enter"]; 

      if (panel_show_keys.includes(e.key)) {
        e.preventDefault();
        e.stopPropagation();

        show_panel_of(tab_list, tab);
      } else if (tab_nav_keys.includes(e.key)) {
        navigate_tabs(e, tab_list, tab);
      }
    });
  });
}

function navigate_tabs(e, tab_list, tab) {
  const current_tab_index = tab_list.indexOf(tab);
  
  if (current_tab_index === -1) return;
  
  let new_tab_index = 0;

  switch (e.key) {
    case "ArrowRight":
      new_tab_index = (current_tab_index + 1) % tab_list.length;
      break;
    case "ArrowLeft":
      new_tab_index = (current_tab_index - 1 + tab_list.length) % tab_list.length;
      break;
    case "Home":
      new_tab_index = 0;
      break;
    case "End":
      new_tab_index = tab_list.length - 1;
      break;
    default:
      return;
  }

  tab_list[new_tab_index].focus();

  e.preventDefault();
  e.stopPropagation();
}

function show_panel_of(tab_list, tab) {

  for (const item of tab_list) {
    if (item === tab) {
      item.setAttribute("aria-selected", true);
      item.tabIndex = 0;
    } else {
      item.setAttribute("aria-selected", false);
      item.tabIndex = -1;
    }
  }

  const panel = document.getElementById(tab.getAttribute("aria-controls"));
  const panel_list = panel.parentNode.children;

  for (const item of panel_list) {
    if (item === panel) {
      item.hidden = false;
    } else {
      item.hidden = true;
    }
  }

} 