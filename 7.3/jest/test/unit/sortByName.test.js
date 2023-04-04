const sorting = require("../../app");

describe("Books names test suit", () => {
  it("Books names should be sorted in ascending order", () => {
    expect(
      sorting.sortByName([
        "Гарри Поттер",
        "Властелин Колец",
        "Волшебник изумрудного города",
      ])
    ).toEqual([
      "Властелин Колец",
      "Волшебник изумрудного города",
      "Гарри Поттер",
    ]);
  });
  test("Function should throw exception if give array of numbers", () => {
    const numbers = [10, 5, 0];
    expect(() => sorting.sortByName(numbers)).toThrow(TypeError);
  });
  test("Function should throw exception when use it without args", () => {
    expect(() => sorting.sortByName()).toThrow(TypeError);
  });
  test("Function should not sort equals elements", () => {
    const input = ["Гарри Поттер", "Властелин Колец", "Властелин Колец"];
    const expected = ["Властелин Колец", "Властелин Колец", "Гарри Поттер"];
    const result = sorting.sortByName(input);
    expect(result).toEqual(expected);
  });
});