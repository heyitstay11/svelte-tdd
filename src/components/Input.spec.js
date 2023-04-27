import { render } from "@testing-library/svelte";
import Input from "./Input.svelte";
import "@testing-library/jest-dom";

it("has invalid class when help is set", () => {
  const { container } = render(Input, { help: "Error Message" });
  const input = container.querySelector("input");
  expect(input.classList).toContain("is-invalid");
});

it("does not have invalid class when help is set", () => {
  const { container } = render(Input);
  const input = container.querySelector("input");
  expect(input.classList).not.toContain("is-invalid");
});

it("show spans when help is set", () => {
  const { container } = render(Input, { help: "Error Message" });
  const span = container.querySelector("[role='alert']");
  expect(span).toBeInTheDocument();
});

it("does not show span when help is set", () => {
  const { container } = render(Input);
  const span = container.querySelector("[role='alert']");
  expect(span).not.toBeInTheDocument();
});
