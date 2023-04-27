import { render } from "@testing-library/svelte";
import Input from "./Input.svelte";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";

it("has invalid class when help is set", () => {
  const { container } = render();
});
