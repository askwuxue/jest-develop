import time from "./time";

describe("time", () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  it("可以在 1000ms 后自动执行函数", () => {
    jest.spyOn(global, "setTimeout");
    const callback = jest.fn();
    
    expect(callback).not.toHaveBeenCalled();

    time(callback);

    jest.runAllTimers();

    expect(callback).toHaveBeenCalled();
    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), 1000);
  });
});