import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import App from "../App";
import userEvent from "@testing-library/user-event";

test("enter a manual address and add it to the address book", async () => {
  render(<App />);
  expect(screen.getByRole("button")).toHaveTextContent("+ Add");
  const addBtn = screen.getByRole("button", { name: "+ Add" });
  userEvent.click(addBtn);
  const manualBtn = screen.getByRole("button", { name: "Enter manually" });
  userEvent.click(manualBtn);
  const line1Input = screen.getByPlaceholderText("Line 1 *");
  fireEvent.change(line1Input, {
    target: { value: "1 rue Charles Lamoureux" },
  });
  const townInput = screen.getByPlaceholderText("Town *");
  fireEvent.change(townInput, { target: { value: "Paris" } });
  const postCodeInput = screen.getByPlaceholderText("Postcode *");
  fireEvent.change(postCodeInput, { target: { value: "75116" } });
  const countryInput = screen.getByPlaceholderText("Search for a country *");
  fireEvent.change(countryInput, { target: { value: "France" } });
  const saveBtn = screen.getByRole("button", { name: "Save" });
  userEvent.click(saveBtn);
  await waitFor(() => {
    expect(screen.getByTestId("saved-addresses-list")).toBeVisible();
  });
});
