import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import App from "../App";
import userEvent from "@testing-library/user-event";

test("search address and add it to the address book", async () => {
  render(<App />);
  expect(screen.getByRole("button")).toHaveTextContent("+ Add");
  const addBtn = screen.getByRole("button", { name: "+ Add" });
  userEvent.click(addBtn);
  const postCodeInput = screen.getByPlaceholderText("Postcode");
  fireEvent.change(postCodeInput, { target: { value: "SW11 2RU" } });
  const searchBtn = screen.getByRole("button", { name: "Search" });
  userEvent.click(searchBtn);
  await waitFor(() => {
    expect(screen.getByTestId("search-line1")).toHaveTextContent(
      "1 Rochelle Close"
    );
  });
  const saveBtn = screen.getByRole("button", { name: "Save" });
  userEvent.click(saveBtn);
  await waitFor(() => {
    expect(screen.getByTestId("saved-addresses-list")).toBeVisible();
  });
});
