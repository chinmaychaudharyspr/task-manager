import React, { useState } from "react";

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
  const [editingField, setEditingField] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditableTask({ ...editableTask, [name]: value });
  };

  const handleSave = () => {
    onSave(editableTask);
    setEditingField(null);
  };

  const renderField = (fieldName, fieldValue, inputType = "text") => {
    return editingField === fieldName ? (
      inputType === "select" ? (
        <select
          name={fieldName}
          value={fieldValue}
          onChange={handleChange}
          onBlur={handleSave}
          onMouseLeave={() => setEditingField(undefined)}
          className="mt-1 block w-full border rounded px-2 py-1"
        >
          {fieldName === "status"
            ? statuses.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))
            : users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
        </select>
      ) : (
        <input
          type={inputType}
          name={fieldName}
          value={fieldValue}
          onChange={handleChange}
          onBlur={handleSave}
          onMouseLeave={() => setEditingField(undefined)}
          className="mt-1 block w-full border rounded px-2 py-1"
        />
      )
    ) : (
      <p
        className="mt-1 text-gray-900"
        onMouseEnter={() => setEditingField(fieldName)}
      >
        {fieldValue}
      </p>
    );
  };

  return (
    <div
      className="p-4 border rounded relative"
      data-entity-type="task-card"
      data-entity-id={editableTask.id}
    >
      <button
        onClick={onClose}
        className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded"
      >
        Close
      </button>
      <div
        className="grid justify-items-start items-center"
        style={{
          gridTemplateColumns: "100px 1fr",
          gridTemplateRows: `repeat(${properties.length}, 50px)`,
        }}
      >
        {properties.map((pt) => (
          <>
            <label className="block text-sm font-medium text-gray-700 flex-none">
              {pt.label}
            </label>
            {pt.editable ? (
              renderField(pt.property, editableTask[pt.property], pt.type)
            ) : (
              <p className="text-gray-900">{editableTask.id}</p>
            )}
          </>
        ))}
      </div>
    </div>
  );
};

export default TaskCard;
