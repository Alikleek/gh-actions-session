import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App.jsx";

describe("App", () => {
  it("renders the heading", () => {
    render(<App />);
    expect(
      screen.getByRole("heading", { name: /wf3 frontend/i }),
    ).toBeInTheDocument();
  });

  it("adds a task when typing and clicking Add", () => {
    render(<App />);
    const input = screen.getByLabelText("new-task");
    fireEvent.change(input, { target: { value: "Ship it" } });
    fireEvent.click(screen.getByRole("button", { name: /add/i }));
    expect(screen.getByText("Ship it")).toBeInTheDocument();
  });

  it("ignores empty input", () => {
    render(<App />);
    fireEvent.click(screen.getByRole("button", { name: /add/i }));
    // Only the seeded task remains.
    expect(screen.getAllByRole("listitem")).toHaveLength(1);
  });
});
