import Vue from "vue";
import ShoppingList from "@/components/ShoppingList.vue";

describe("Shopping List component", () => {
  let $mounted;

  beforeEach(() => {
    $mounted = new Vue(ShoppingList).$mount();
  });

  it("should match snapshot", () => {
    let $html = $mounted.$el.outerHTML;
    expect($html).toMatchSnapshot();

    $mounted.items[1].done = true;

    Vue.nextTick(() => {
      $html = $mounted.$el.outerHTML;
      expect($html).toMatchSnapshot();
    });
  });

  it("should handle `click` and update `done` attr for a given item", () => {
    let todos = $mounted.$el.querySelectorAll("li");
    let button = todos[1].querySelector("button");
    let customEvent = new Event("click");
    button.dispatchEvent(customEvent);

    expect($mounted.items[1].done).toBeTruthy();
  });
});
