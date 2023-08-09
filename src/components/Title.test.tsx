// tests/components/Title.test.tsx
import React from "react";
import { render } from "@testing-library/react";
import Title from "./Title";

describe("Title", () => {
  it("可以正确渲染大字", () => {
    // render 方法返回一个对象，其中包含了组件的 DOM 对象
    const { baseElement } = render(<Title type="large" title="大字" />);
    // 通过render获得的对象和我们预期的DOM对象（快照）进行对比
    expect(baseElement).toMatchSnapshot();
  });

  it("可以正确渲染小字", () => {
    const { baseElement } = render(<Title type="small" title="小字" />);
    expect(baseElement).toMatchSnapshot();
  });
});