import React, { useState } from "react";
import { PieChart, Pie, Legend, Tooltip, Cell } from "recharts";
import "./VehicleMaintenance.css";

const data = [
  { name: "Due This Month", value: 163, fill: "#C64269" },
  { name: "Up-to-Date", value: 57, fill: "#10A3A8" },
  { name: "Overdue", value: 42, fill: "#FFE100" },
];

const taskDetails = [
  {
    id: "AB34E6789",
    name: "Martin Sanders",
    task: "Engine > Oil Change",
    status: "Scheduled",
    dueIn: "In 2 months",
    event: "93,858 km",
    recurrence: "Every 10,000 km thereafter",
    notify: "jmike@gmail.com",
    licensePlate: "AB34E6789",
    category: "Suv",
  },
  {
    id: "AB34E6789",
    name: "Martin Sanders",
    task: "Engine > Oil Change",
    status: "Done",
    dueIn: "View Invoice",
    event: "93,858 km",
    recurrence: "Every 10,000 km thereafter",
    notify: "jmike@gmail.com",
    licensePlate: "AB34E6789",
    category: "Economy",
  },
  {
    id: "AB34E6789",
    name: "Martin Sanders",
    task: "Engine > Oil Change",
    status: "Due Soon",
    dueIn: "In 2 days",
    event: "93,858 km",
    recurrence: "Every 10,000 km thereafter",
    notify: "jmike@gmail.com",
    licensePlate: "AB34E6789",
    category: "Mini",
  },
  {
    id: "AB34E6789",
    name: "Martin Sanders",
    task: "Engine > Oil Change",
    status: "Overdue",
    dueIn: "1 week ago",
    event: "93,858 km",
    recurrence: "Every 10,000 km thereafter",
    notify: "jmike@gmail.com",
    licensePlate: "AB34E6789",
    category: "Suv",
  },
  {
    id: "AB34E6789",
    name: "Martin Sanders",
    task: "Engine > Oil Change",
    status: "Today",
    dueIn: "16 hours left",
    event: "93,858 km",
    recurrence: "Every 10,000 km thereafter",
    notify: "jmike@gmail.com",
    licensePlate: "AB34E6789",
    category: "Economy",
  },
];

const VehicleMaintenance = () => {
  const [categoryFilter, setCategoryFilter] = useState(""); // Vehicle Category Filter
  const [taskFilter, setTaskFilter] = useState(""); // Task Filter
  const [statusFilter, setStatusFilter] = useState(""); // Status Filter
  const [scheduledFilter, setScheduledFilter] = useState(""); // Scheduled Filter

  // Filter tasks based on selected filters
  const filteredTasks = taskDetails.filter((task) => {
    return (
      (categoryFilter ? task.category === categoryFilter : true) &&
      (taskFilter ? task.task.includes(taskFilter) : true) &&
      (statusFilter ? task.status === statusFilter : true) &&
      (scheduledFilter ? task.status === "Scheduled" : true)
    );
  });

  // Function to reset filters
  const resetFilters = () => {
    setCategoryFilter("");
    setTaskFilter("");
    setStatusFilter("");
    setScheduledFilter("");
  };

  return (
    <div style={{ padding: "20px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "flex-start",
          paddingTop: "10px",
        }}
      >
        <PieChart width={400} height={300}>
          <Pie
            dataKey="value"
            isAnimationActive={false}
            data={data}
            cx={200}
            cy={150}
            outerRadius={100}
            fill="#8884d8"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
        <div className="task-details-container">
          <div className="filter-container">
            <h3 className="filter-heading">Filter task relate to:</h3>
            <div className="filter-buttons">
              <select
                className="filter-select"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                <option value="">Vehicle Category</option>
                <option value="Suv">Suv</option>
                <option value="Economy">Economy</option>
                <option value="Mini">Mini</option>
              </select>
              <select
                className="filter-select"
                value={taskFilter}
                onChange={(e) => setTaskFilter(e.target.value)}
              >
                <option value="">Task</option>
                <option value="Oil Change">Oil Change</option>
                <option value="Tyre Change">Tyre Change</option>
                <option value="Service">Service</option>
              </select>
              <select
                className="filter-select"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="">Status</option>
                <option value="Done">Done</option>
                <option value="Due Soon">Due Soon</option>
                <option value="Overdue">Overdue</option>
                <option value="Today">Today</option>
                <option value="Scheduled">Scheduled</option>
              </select>
              {/* <select
                className="filter-select"
                value={scheduledFilter}
                onChange={(e) => setScheduledFilter(e.target.value)}
              >
                <option value="">Scheduled</option>
                <option value="Scheduled">Scheduled</option>
              </select> */}
              {/* Reset Filters Button */}
              <button className="reset-btn" onClick={resetFilters}>
                Reset Filters
              </button>
            </div>
          </div>
          {filteredTasks.map((task, index) => (
            <div key={index} className="task-detail">
              <div className="task-info">
                <div className="license-plate">{task.licensePlate}</div>
                <div className="owner-name">{task.name}</div>
                <div className="task-details-column">
                  <div className="task-event">
                    <span className="title-red">Task:</span> {task.task}
                  </div>
                  <div className="event-details">
                    <span className="title-blue">Event:</span> {task.event}
                  </div>
                  <div className="recurrence-info">
                    <span className="title-yellow">Recurrence:</span>{" "}
                    {task.recurrence}
                  </div>
                  <div className="notify-email">
                    <span className="title-green">Notify:</span> {task.notify}
                  </div>
                </div>
              </div>
              <div className="status-section">
                <div
                  className={`status-badge ${task.status
                    .toLowerCase()
                    .replace(" ", "-")}`}
                >
                  {task.status}
                </div>
                <p className="due-in">{task.dueIn}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VehicleMaintenance;
