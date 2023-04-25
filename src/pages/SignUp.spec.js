import SignUp from "./SignUp.svelte";
import { render, screen } from "@testing-library/svelte";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { setupServer } from "msw/node";
import { rest } from "msw";

describe("Sign Up Page", () => {
  //

  it("has Sign Up header", () => {
    render(SignUp);
    const header = screen.getByRole("heading", { name: "Sign Up" });
    expect(header).toBeInTheDocument();
  });

  it("has username input", () => {
    render(SignUp);
    const input = screen.getByLabelText("Username");
    expect(input).toBeInTheDocument();
  });

  it("has email input", () => {
    render(SignUp);
    const input = screen.getByLabelText("Email");
    expect(input).toBeInTheDocument();
  });

  it("has email input with email type", () => {
    render(SignUp);
    const input = screen.getByLabelText("Email");
    expect(input.type).toBe("email");
  });

  it("has password input", () => {
    render(SignUp);
    const input = screen.getByLabelText("Password");
    expect(input).toBeInTheDocument();
  });

  it("has password input with password type", () => {
    render(SignUp);
    const input = screen.getByLabelText("Password");
    expect(input.type).toBe("password");
  });

  it("has confirm password input", () => {
    render(SignUp);
    const input = screen.getByLabelText("Confirm Password");
    expect(input).toBeInTheDocument();
  });

  it("has password input with password type", () => {
    render(SignUp);
    const input = screen.getByLabelText("Confirm Password");
    expect(input.type).toBe("password");
  });

  it("has Sign Up button", () => {
    render(SignUp);
    const button = screen.getByRole("button", { name: "Sign Up" });
    expect(button).toBeInTheDocument();
  });

  it("has Sign Up button is disabled initially", () => {
    render(SignUp);
    const button = screen.getByRole("button", { name: "Sign Up" });
    expect(button).toBeDisabled();
  });

  //
});

//

describe("Interactions", () => {
  //

  it("enable the button when password and confirm password match", async () => {
    render(SignUp);
    const password = screen.getByLabelText("Password");
    const confirm_password = screen.getByLabelText("Confirm Password");
    await userEvent.type(password, "Secret");
    await userEvent.type(confirm_password, "Secret");
    const button = screen.getByRole("button", { name: "Sign Up" });
    expect(button).toBeEnabled();
  });

  it("posts username, email and password after submit", async () => {
    let reqBody;
    const server = setupServer(
      rest.post("/api/users", (req, res, ctx) => {
        reqBody = req.body;
        return res(ctx.status(200));
      })
    );

    server.listen();

    render(SignUp);
    const username = screen.getByLabelText("Username");
    const email = screen.getByLabelText("Email");
    const password = screen.getByLabelText("Password");
    const confirm_password = screen.getByLabelText("Confirm Password");

    await userEvent.type(username, "John");
    await userEvent.type(email, "john@mail.com");
    await userEvent.type(password, "Secret");
    await userEvent.type(confirm_password, "Secret");

    const button = screen.getByRole("button", { name: "Sign Up" });
    await userEvent.click(button);

    console.error(reqBody);
    expect(reqBody).toEqual({
      email: "john@mail.com",
      password: "Secret",
      username: "John",
    });
  });

  //
});
