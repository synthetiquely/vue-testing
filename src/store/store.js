import uuidV4 from "uuidv4";

export default {
  state: {
    items: []
  },
  mutations: {
    record: (state, payload) => {
      state.items.push(payload);
    },
    completed: (state, payload) => {
      const index = state.items.indexOf(payload);
      state.items[index].done = true;
    }
  },
  actions: {
    record: ({ commit }, text) => {
      commit("record", { text, done: false, uuid: uuidV4() });
    },
    delayedRecord: ({ commit }, text) => {
      setTimeout(() => {
        commit("record", { text, done: false, uuid: uuidV4() }, 5000);
      });
    }
  }
};
