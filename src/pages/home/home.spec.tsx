import "@testing-library/jest-dom";
import { render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import { act } from "react-dom/test-utils";
import { IToast, ToastContext } from "../../context/toast";
import Home from "./index";

jest.mock("axios");

describe("Home Component", () => {
  it("should format cep on user input", async () => {
    const { getByPlaceholderText } = render(<Home />);

    const cepInput = getByPlaceholderText("00000-000") as HTMLInputElement;

    await act(async () => {
      userEvent.paste(cepInput, "38302302");
    });

    expect(cepInput.value).toBe("38302-302");
  });

  it("should limit cep input to eight digits on user input", async () => {
    const { getByPlaceholderText } = render(<Home />);

    const cepInput = getByPlaceholderText("00000-000") as HTMLInputElement;

    await act(async () => {
      userEvent.paste(cepInput, "383023022");
    });

    expect(cepInput.value).toBe("38302-302");
  });

  it("should enable search button on cep input fill", async () => {
    const { getByPlaceholderText, getByText } = render(<Home />);
    const cepInput = getByPlaceholderText("00000-000") as HTMLInputElement;
    const searchButton = getByText("Pesquisar") as HTMLButtonElement;

    expect(searchButton.disabled).toBe(true);

    await act(async () => {
      userEvent.paste(cepInput, "38302302");
    });

    expect(searchButton.disabled).toBe(false);
  });
});
