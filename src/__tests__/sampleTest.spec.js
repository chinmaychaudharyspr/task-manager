import {render, screen, waitFor} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import TaskManager from "../TaskManager";

describe("1. The refresh icon should spin only when the refresh is in progress.", () => {
  let tasks = [
    {
      id: 1,
      title: "Task 1",
      status: "In Progress",
      assignee: "Alice",
      dueDate: "2024-08-20",
    },
  ];

  const loadTasks = () =>
    new Promise((res) => {
      setTimeout(() => {
        res(tasks);
      }, 100)
    });

  test("should not spin initially", async () => {
    // jest.useFakeTimers();

    render(<TaskManager loadTasks={loadTasks}/>);

    // jest.runAllTimers();

    await screen.findByText("Task 1");

    const iconEl = screen.getByTestId("refresh-icon");
    expect(iconEl.classList.contains("animate-spin")).toBe(false);

    // jest.useRealTimers()
  });
  test("should spin when clicked", async () => {
    // jest.useFakeTimers();

    const user = userEvent.setup();

    render(<TaskManager loadTasks={loadTasks}/>);

    // jest.runAllTimers();

    await screen.findByText("Task 1");

    const el = screen.getByTestId("refresh-button");

    await user.click(el);

    const iconEl = screen.getByTestId("refresh-icon");
    expect(iconEl.classList.contains("animate-spin")).toBe(true);

    // jest.runAllTimers();

    await waitFor(() => {
      expect(iconEl.classList.contains("animate-spin")).toBe(false);
    }, {timeout: 200})

    // jest.useRealTimers()
  });
});

describe("2. When data is refreshed in the table, it should be reflected in the card view too.", () => {
  let tasks = [
    {
      id: 1,
      title: "Task 1",
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

  test("test", async () => {
    // jest.useFakeTimers();
    const user = userEvent.setup();

    render(<TaskManager loadTasks={loadTasks}/>);

    const cellEl = await screen.findByText("Task 1");

    screen.getByText("In Progress");

    await user.click(cellEl);

    let taskCardEl = screen.getByTestId("task-card");
    expect(taskCardEl.querySelector("#status").dataset.value).toBe("In Progress");

    const refreshButtonEl = screen.getByTestId("refresh-button");
    await user.click(refreshButtonEl);

    const taskRowEl = screen.getByTestId(`task-row-${tasks[0].id}`);

    await waitFor(() => {
      expect(taskRowEl.querySelector('[data-cell-type="status"]').textContent).toBe("Pending");
    }, {timeout: 200});

    expect(taskCardEl.querySelector("#status").dataset.value).toBe("Pending");
  });
});

describe("3. Editing a task in the card view should also update the task in the table view.", () => {
  let tasks = [
    {
      id: 1,
      title: "Task 1",
      status: "In Progress",
      assignee: "Alice",
      dueDate: "2024-08-20",
    },
  ];

  const loadTasks = () =>
    new Promise((res) => {
      setTimeout(() => {
        res(tasks);
      }, 100)
    });

  test("test", async () => {
    const user = userEvent.setup();

    render(<TaskManager loadTasks={loadTasks}/>);

    const cellEl = await screen.findByText("Task 1");
    await user.click(cellEl);

    await screen.findByTestId("task-card");

    await user.type(screen.getByLabelText('Title'), "hello world", {
      initialSelectionStart: 0,
      initialSelectionEnd: screen.getByLabelText('Title').value.length,
    });
    await user.tab();

    expect(screen.getByLabelText('Title').value).toBe("hello world");

    const taskRowEl = await screen.findByTestId(`task-row-${tasks[0].id}`);
    expect(taskRowEl.querySelector('[data-cell-type="title"]').textContent).toBe("hello world");
  });
});

describe("4. Clicking on a task in the table should update the task card view", () => {
  let tasks = [
    {
      id: 1,
      title: "Task 1",
      status: "In Progress",
      assignee: "Alice",
      dueDate: "2024-08-20",
    },
    {
      id: 2,
      title: "Task 2",
      status: "Pending",
      assignee: "Bob",
      dueDate: "2024-08-22",
    },
  ];

  const loadTasks = () =>
    new Promise((res) => {
      setTimeout(() => {
        res(tasks);
      }, 100)
    });

  test("test", async () => {
    const user = userEvent.setup();

    render(<TaskManager loadTasks={loadTasks}/>);

    await user.click(await screen.findByText("Task 1"));

    await screen.findByTestId("task-card");

    expect(screen.getByLabelText('Title').value).toBe("Task 1");

    await user.click(await screen.findByText("Task 2"));

    expect(screen.getByLabelText('Title').value).toBe("Task 2");
  });
});

