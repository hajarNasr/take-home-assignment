import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import App from "./App";

const FORMATTED_TEXT =
  "This is a badly formatted file. This line is pretty long! It's way more than 80\ncharacters! I feel a line wrap coming on!\n\nThis is a second paragraph with extraneous whitespace.";

describe("App", () => {
  let app = render(<App />);
  let inputTextArea = app.container.querySelector(".input-textarea");
  let outputTextarea = app.container.querySelector("#result");
  let submitBtn = app.getByText("Submit");

  test("Output must be formatted on submitting for the first time", () => {
    submitBtn.click();
    expect(outputTextarea.textContent).toEqual(FORMATTED_TEXT);
  });

  test("badText1 must be formated after submitting", () => {
    const badText1 =
      "This is\na badly formatted file. This line is pretty long!\nIt's way more than 80\ncharacters! \nI feel \na line wrap coming on!\n\n\nThis \nis a second paragraph with extraneous whitespace.";

    inputTextArea.textContent = badText1;
    submitBtn.click();
    expect(outputTextarea.textContent).toEqual(FORMATTED_TEXT);
  });

  test("badText2 must be formated after submitting", () => {
    const badText2 =
      "This is a badly\n\n\n formatted file.\n\n This line is\n\n pretty long!\nIt's way more than 80\ncharacters! \nI feel \na line wrap coming on!\n\n\nThis \nis a\n second paragraph with extraneous whitespace.";

    inputTextArea.textContent = badText2;
    submitBtn.click();
    expect(outputTextarea.textContent).toEqual(FORMATTED_TEXT);
  });

  test("badText3 must be formated after submitting", () => {
    const badText3 =
      "This is\na badly formatted        file. This line is pretty        long!\nIt's way more than 80\ncharacters! \nI feel \na line wrap coming on!\n\n\nThis       \nis a second paragraph with        extraneous whitespace.";

    inputTextArea.textContent = badText3;
    submitBtn.click();
    expect(outputTextarea.textContent).toEqual(FORMATTED_TEXT);
  });
});
