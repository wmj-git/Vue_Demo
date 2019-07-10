import { WIN_OPEN, WIN_CLOSE, DIALOG_OPEN, DIALOG_CLOSE, SET_WIN } from "../../mutation-types";

export default {


  [SET_WIN] (state, { win }) {
    state.win = win;
  },
  [WIN_OPEN] (state, { win_obj }) {
    state.win.forEach(function (el) {
      if (el.system_id === win_obj.system_id && el.show === false) {
        el.show = true;
      } else if (el.system_id === win_obj.system_id && el.show === true) {
        el.show = false;
      }
    })
  },
  [WIN_CLOSE] (state, { win_id }) {
    if (win_id === "all") {
      state.win.forEach(function (el) {
        if (el.show === true) {
          el.show = false;
        }
      })
    } else {
      state.win.forEach(function (el) {
        if (el.system_id === win_id) {
          el.show = false;
        }
      })
    }
  },
  [DIALOG_OPEN] (state, { obj }) {
    state.dialog.forEach(function (el) {
      if (el.id === obj.id && el.show === false) {
        el.show = true;
      } else if (el.id === obj.id && el.show === true) {
        el.show = false;
      }
    })
  },
  [DIALOG_CLOSE] (state, { id }) {
    if (id === "all") {
      state.dialog.forEach(function (el) {
        if (el.show === true) {
          el.show = false;
        }
      })
    } else {
      state.dialog.forEach(function (el) {
        if (el.id === id) {
          el.show = false;
        }
      })
    }
  }
};
