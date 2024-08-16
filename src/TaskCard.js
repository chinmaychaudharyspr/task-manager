import React, {Fragment, useState} from "react";
import CloseButton from "./CloseButton";

const properties = [
  { property: "id", label: "ID", editable: false, type: "text" },
  { property: "title", label: "Title", editable: true, type: "text" },
  { property: "status", label: "Status", editable: true, type: "select" },
  {
    property: "assignee",
    label: "Assignee",
    editable: true,
    type: "select",
  },
  {
    property: "dueDate",
    label: "Due Date",
    editable: true,
    type: "date",
  },
];

const TaskCard = ({ task, statuses, users, onSave, onClose }) => {
  const [editableTask, setEditableTask] = useState(task);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditableTask({ ...editableTask, [name]: value });
  };

  const renderField = (fieldName, fieldValue, inputType, editable) => {
    if(inputType !== "select") {
      return <input
        disabled={!editable}
        id={fieldName}
        type={inputType}
        name={fieldName}
        value={fieldValue}
        onChange={handleChange}
        className="mt-1 block w-full border rounded px-2 py-1"
      />
    }

    return <select
      disabled={!editable}
      id={fieldName}
      name={fieldName}
      value={fieldValue}
      data-value={fieldValue}
      onChange={handleChange}
      className="mt-1 block w-full border rounded px-2 py-1"
    >
      {fieldName === "status"
        ? statuses.map((status) => (
          <option key={status} value={status}>
            {status}
          </option>
        ))
        : users.map((user) => (
          <option key={user} value={user}>
            {user}
          </option>
        ))}
    </select>;
  };

  return (
    <div
      className="p-4 border rounded relative"
      data-testid="task-card"
      data-entity-type="task-card"
      data-entity-id={editableTask.id}
      data-task-status={editableTask.status}
    >
      <CloseButton onClose={onClose} />
      <div
        className="grid justify-items-start items-center"
        style={{
          gridTemplateColumns: "100px 1fr",
          gridTemplateRows: `repeat(${properties.length}, 50px)`,
        }}
      >
        {properties.map((pt) => (
          <Fragment key={pt.property}>
            <label className="block text-sm font-medium text-gray-700 flex-none" htmlFor={pt.property}>
              {pt.label}
            </label>
            {renderField(pt.property, editableTask[pt.property], pt.type, pt.editable)}
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export default TaskCard;
