import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import App from "./App.svelte";
import "../locale/i18n";

describe("Routing", () => {
  //

  it("displays home page at /", () => {
    render(App);
    const homePage = screen.queryByRole("heading", { name: "Home Page" });
    expect(homePage).toBeInTheDocument();
  });

  it("doesnt displays signup page at /", () => {
    render(App);
    const homePage = screen.queryByTestId("signup-page");
    expect(homePage).not.toBeInTheDocument();
  });

  it("display signup page at /singup", () => {
    render(App);
    const homePage = screen.queryByTestId("signup-page");
    expect(homePage).toBeInTheDocument();
  });

  //
});
//
