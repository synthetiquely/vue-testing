import Vue from "vue";
import Vuex from "vuex";
import store from "@/store/store";
import uuidV4 from "uuidv4";

jest.mock("uuidv4");
jest.useFakeTimers();

describe("Store", () => {
  let $store;

  beforeAll(() => {
    Vue.use(Vuex);
    $store = new Vuex.Store(store);
  });

  afterEach(() => {
    $store.state.items = [];
  });

  it("has a default state", () => {
    expect(store.state.items).toEqual([]);
  });

  it("should add a passed value to items", () => {
    let mockEntry = {
      text: "Milk",
      done: false
    };
    let state = {
      items: []
    };

    store.mutations.record(state, mockEntry);

    expect(state.items).toEqual([mockEntry]);
  });

  it("should update `done` for a passed item", () => {
    let mockEntry = {
      text: "Milk",
      done: false
    };
    let state = {
      items: [mockEntry]
    };

    store.mutations.completed(state, mockEntry);

    expect(state.items[0].done).toBeTruthy();
  });

  it("should prepare an object to add it as item", () => {
    uuidV4.mockImplementation(() => 23);

    $store.dispatch("record", "Hello world");

    expect(uuidV4).toHaveBeenCalled();
    expect($store.state.items[0]).toEqual({
      text: "Hello world",
      done: false,
      uuid: 23
    });
  });

  it("should prepare an object to add it as item after 5s", () => {
    uuidV4.mockImplementation(() => 24);

    $store.dispatch("record", "Hello from delay");

    jest.runAllTimers();

    expect(uuidV4).toHaveBeenCalled();
    expect($store.state.items[0]).toEqual({
      text: "Hello from delay",
      done: false,
      uuid: 24
    });
  });
});
