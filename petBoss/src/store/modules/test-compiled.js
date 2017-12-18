var state = {
  count: 0
};
var mutations = {
  addNumber: function addNumber(_ref, price) {
    var state = _ref.state;

    console.log(state);
    state.count += price;
  },
  subtract: function subtract(_ref2, price) {
    var state = _ref2.state;

    state.count -= price;
  }
};
var actions = {
  test: function test(_ref3, price) {
    var commit = _ref3.commit;

    commit('addNumber', price);
  },
  text: function text(_ref4, price) {
    var commit = _ref4.commit;

    commit('subtract', price);
  }
};

//# sourceMappingURL=test-compiled.js.map