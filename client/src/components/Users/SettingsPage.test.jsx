import React from "react";
import { render, fireEvent, wait, screen } from "@testing-library/react";
import SettingsPage from "./SettingsPage";

jest.mock("react-router-dom", () => ({
  useHistory: jest.fn(),
}));

afterEach(() => {
  jest.resetAllMocks();
  fetch.resetMocks();
});

test("shows form inputs for password", async () => {
  const { getByPlaceholderText } = render(<SettingsPage history={[]} />);

  expect(getByPlaceholderText("Password")).toBeInTheDocument();
  await wait();
});

test("displays error message when password field is set to empty", async () => {
  render(<SettingsPage />);

  const submit = screen.getByRole("button");
  const password = screen.getByPlaceholderText("Password");

  fireEvent.change(password, {
    target: {
      value: "",
    },
  });
  fireEvent.click(submit);

  const successMessage = await screen.findByText(/please enter password./i);
  expect(successMessage).toBeInTheDocument();
});
