import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import SignUp from "./SignUp.svelte";
import LanguageSelector from "../components/LanguageSelector.svelte";
import { setupServer } from "msw/node";
import { rest } from "msw";
import "../../locale/i18n";
import en from "../../locale/en.json";
import tr from "../../locale/tr.json";

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

describe("Interactions", () => {
  //

  const setUpInteractions = async () => {
    render(SignUp);
    const username = screen.getByLabelText("Username");
    const email = screen.getByLabelText("Email");
    const password = screen.getByLabelText("Password");
    const confirm_password = screen.getByLabelText("Confirm Password");

    await userEvent.type(username, "John");
    await userEvent.type(email, "john@mail.com");
    await userEvent.type(password, "Secret");
    await userEvent.type(confirm_password, "Secret");
  };

  it("enable the button when password and confirm password match", async () => {
    await setUpInteractions();
    const button = screen.getByRole("button", { name: "Sign Up" });
    expect(button).toBeEnabled();
  });

  it("posts username, email and password after submit", async () => {
    let reqBody;
    const server = setupServer(
      rest.post("/api/1.0/users", (req, res, ctx) => {
        reqBody = req.body;
        return res(ctx.status(200));
      })
    );

    server.listen();

    await setUpInteractions();

    const button = screen.getByRole("button", { name: "Sign Up" });
    await userEvent.click(button);

    server.close();

    expect(reqBody).toEqual({
      email: "john@mail.com",
      password: "Secret",
      username: "John",
    });
  });

  it("disable button while processing", async () => {
    let counter = 0;
    const server = setupServer(
      rest.post("/api/1.0/users", (req, res, ctx) => {
        counter++;
        return res(ctx.status(200));
      })
    );

    server.listen();

    await setUpInteractions();

    const button = screen.getByRole("button", { name: "Sign Up" });
    await userEvent.click(button);
    await userEvent.click(button);

    server.close();

    expect(counter).toBe(1);
  });

  it("does'nt display loading spinner initially", async () => {
    await setUpInteractions();

    const loader = screen.queryByRole("status");

    expect(loader).not.toBeInTheDocument();
  });

  it("display loading spinner while processing", async () => {
    const server = setupServer(
      rest.post("/api/1.0/users", (req, res, ctx) => {
        return res(ctx.status(200));
      })
    );

    server.listen();

    await setUpInteractions();

    const button = screen.getByRole("button", { name: "Sign Up" });
    await userEvent.click(button);
    const loader = screen.getByRole("status");
    server.close();

    expect(loader).toBeInTheDocument();
  });

  it("display account acivation after success request", async () => {
    const server = setupServer(
      rest.post("/api/1.0/users", (req, res, ctx) => {
        return res(ctx.status(200));
      })
    );
    server.listen();

    await setUpInteractions();

    const button = screen.getByRole("button", { name: "Sign Up" });
    await userEvent.click(button);

    server.close();

    const text = await screen.findByText("Check account for activation id");

    expect(text).toBeInTheDocument();
  });

  it("displays validation error for email", async () => {
    const server = setupServer(
      rest.post("/api/1.0/users", (req, res, ctx) => {
        return res(
          ctx.status(400),
          ctx.json({
            validationErrors: {
              username: "email cannot be empty",
            },
          })
        );
      })
    );
    server.listen();
    await setUpInteractions();

    const button = screen.getByRole("button", { name: "Sign Up" });
    await userEvent.click(button);

    server.close();
    const error = await screen.findByText("Email cannot be empty");

    expect(error).toBeInTheDocument();
  });

  it("Initially, doesnt displays validation error for username", async () => {
    await setUpInteractions();

    const error = await screen.queryByRole("alert", {
      name: "Email cannot be empty",
    });

    expect(error).not.toBeInTheDocument();
  });

  //
});

describe("Internationalization", () => {
  it("default language english", () => {
    render(SignUp);
    render(LanguageSelector);
    expect(
      screen.queryByRole("heading", { name: en.signUp })
    ).toBeInTheDocument();

    expect(
      screen.queryByRole("button", { name: en.signUp })
    ).toBeInTheDocument();

    expect(screen.queryByLabelText(en.username)).toBeInTheDocument();
    expect(screen.queryByLabelText(en.email)).toBeInTheDocument();
    expect(screen.queryByLabelText(en.password)).toBeInTheDocument();
    expect(screen.queryByLabelText(en.passwordRepeat)).toBeInTheDocument();
  });

  it("showing turkish when switched", async () => {
    render(SignUp);
    render(LanguageSelector);
    const toggler = screen.getByTitle("Turkish");
    await userEvent.click(toggler);
    expect(
      screen.queryByRole("heading", { name: tr.signUp })
    ).toBeInTheDocument();

    expect(
      screen.queryByRole("button", { name: tr.signUp })
    ).toBeInTheDocument();

    expect(screen.queryByLabelText(tr.username)).toBeInTheDocument();
    expect(screen.queryByLabelText(tr.email)).toBeInTheDocument();
    expect(screen.queryByLabelText(tr.password)).toBeInTheDocument();
    expect(screen.queryByLabelText(tr.passwordRepeat)).toBeInTheDocument();
  });

  it("showing english when switched", async () => {
    render(SignUp);
    render(LanguageSelector);
    const toggler = screen.getByTitle("English");
    await userEvent.click(toggler);
    expect(
      screen.queryByRole("heading", { name: en.signUp })
    ).toBeInTheDocument();

    expect(
      screen.queryByRole("button", { name: en.signUp })
    ).toBeInTheDocument();

    expect(screen.queryByLabelText(en.username)).toBeInTheDocument();
    expect(screen.queryByLabelText(en.email)).toBeInTheDocument();
    expect(screen.queryByLabelText(en.password)).toBeInTheDocument();
    expect(screen.queryByLabelText(en.passwordRepeat)).toBeInTheDocument();
  });
});
