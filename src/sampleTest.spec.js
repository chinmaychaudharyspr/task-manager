import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import TaskManager from "./TaskManager";

describe("1. The refresh icon should spin only when the refresh is in progress.", () => {
  let tasks = [
    {
      id: 1,
      title: "Implement user authentication",
      status: "In Progress",
      assignee: "Alice",
      dueDate: "2024-08-20",
    },
  ];

  const loadTasks = () =>
    new Promise((res) => {
      setTimeout(() => {
        res(tasks);
        tasks = [
          {
            ...tasks[0],
            status: tasks[0].status === "In Progress" ? "Pending" : "In Progress",
          },
          ...tasks.slice(1),
        ];
      }, 100)
    });

  test("should not spin initially", async () => {
    render(<TaskManager loadTasks={loadTasks} />);

    await screen.findByText("Implement user authentication");

    const iconEl = screen.getByTestId("refresh-icon");
    expect(iconEl.classList.contains("animate-spin")).toBe(false);
  });
  test("should spin when clicked", async () => {
    const user = userEvent.setup();

    render(<TaskManager loadTasks={loadTasks} />);

    await screen.findByText("Implement user authentication");

    const el = screen.getByTestId("refresh-button");

    await user.click(el);

    const iconEl = screen.getByTestId("refresh-icon");
    expect(iconEl.classList.contains("animate-spin")).toBe(true);

    await waitFor(() => {
      expect(iconEl.classList.contains("animate-spin")).toBe(false);
    })
  });
});
