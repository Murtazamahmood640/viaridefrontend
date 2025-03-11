import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Createuser.css";

import {
  FaSearch,
  FaEye,
  FaEyeSlash,
  FaTimes,
  FaPencilAlt,
  FaTrash,
  FaChevronDown,
} from "react-icons/fa";
import UserPic from "../../Assets/Logo/profile.jpg";

const UserManagement = () => {
  const [users, setUsers] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState(""); // Added state for role filtering
  const [showPassword, setShowPassword] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editFormData, setEditFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  const [editShowPassword, setEditShowPassword] = useState(false);

  const entriesPerPage = 5; // Set the number of entries per page

  // Fetch users from the backend API

  useEffect(() => {
    axios

      .get("http://localhost:4000/api/viaRide/createuser")

      .then((response) => {
        setUsers(response.data);
      })

      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    if (file) {
      setImageFile(URL.createObjectURL(file)); // To show the uploaded image preview
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.name && formData.role && formData.email && formData.password) {
      const newUser = {
        ...formData,

        createdDate: new Date().toISOString().split("T")[0],
      };

      axios

        .post("http://localhost:4000/api/viaRide/createuser", newUser)

        .then((response) => {
          setUsers([...users, response.data]);

          setFormData({ name: "", email: "", password: "", role: "" });

          window.location.reload(); // Refresh page after creating user
        })

        .catch((error) => {
          console.error("Error creating user:", error);
        });
    }
  };

  const handleDelete = (id) => {
    setUsers(users.filter((user) => user._id !== id)); // Remove the user by id

    setShowDeleteModal(false); // Close the delete modal
  };

  const handleEditClick = (user) => {
    setSelectedUser(user);  // Store the selected user data
    setEditFormData({
      name: user.name,
      email: user.email,
      password: user.password,
      role: user.role,
    });
    setShowEditModal(true); // Open the Edit Modal
  };
  

  const handleModalClose = () => {
    setShowModal(false);

    setSelectedUser(null);
  };

  const handleModalDelete = (user) => {
    setUserToDelete(user); // Store the user that should be deleted

    setShowDeleteModal(true); // Show the delete confirmation modal
  };

  const handleDeleteConfirm = () => {
    if (userToDelete) {
      axios

        .delete(
          `http://localhost:4000/api/viaRide/createuser/${userToDelete._id}`
        )

        .then((response) => {
          if (response.status === 200) {
            setUsers(users.filter((user) => user._id !== userToDelete._id));

            setShowDeleteModal(false);

            setUserToDelete(null);

            window.location.reload(); // Refresh page after deleting user
          }
        })

        .catch((error) => {
          console.error("Error deleting user:", error);
        });
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);

    setUserToDelete(null);
  };

  const handleEditModalOpen = () => {
    if (selectedUser) {
      setEditFormData({
        name: selectedUser.name,

        email: selectedUser.email,

        password: selectedUser.password,

        role: selectedUser.role,
      });

      setEditShowPassword(false);

      setShowEditModal(true);
    }
  };

  const handleEditModalClose = () => {
    setShowEditModal(false);
  };

  const handleEditFormChange = (e) => {
    setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
  };

  const handleUpdateUser = () => {
    if (
      editFormData.name &&
      editFormData.email &&
      editFormData.password &&
      editFormData.role &&
      selectedUser
    ) {
      const updatedUser = {
        ...editFormData,
      };

      axios

        .put(
          `http://localhost:4000/api/viaRide/createuser/${selectedUser._id}`,

          updatedUser
        )

        .then((response) => {
          const updatedUsers = users.map((user) =>
            user._id === selectedUser._id ? response.data.user : user
          );

          setUsers(updatedUsers);

          setShowSuccessMessage(true);

          setTimeout(() => {
            setShowSuccessMessage(false);
          }, 3000);

          setShowEditModal(false);

          setShowModal(false);

          setSelectedUser(null);

          window.location.reload();
        })

        .catch((error) => {
          console.error("Error updating user:", error);
        });
    }
  };

  const resetFilters = () => {
    setSearchTerm("");

    setRoleFilter(""); // Reset role filter

    setCurrentPage(1);
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch = user.name
      ? user.name.toLowerCase().includes(searchTerm.toLowerCase()) // Safe check before calling toLowerCase
      : false;
  
    const matchesRole = roleFilter ? user.role === roleFilter : true;
  
    return matchesSearch && matchesRole;
  });
  

  const displayedUsers = filteredUsers.slice(
    (currentPage - 1) * entriesPerPage,

    currentPage * entriesPerPage
  );

  const totalEntries = filteredUsers.length;

  const startEntry = (currentPage - 1) * entriesPerPage + 1;

  const endEntry = Math.min(currentPage * entriesPerPage, totalEntries);

  return (
    <div className="CreateUser-container">
      <div className="form-container">
        <h2>Create User</h2>

        <form onSubmit={handleSubmit} className="user-formDesign" autoComplete="off">
          <div className="form-field">
            <label htmlFor="name">Full Name</label>

            <input
              id="name"
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-field">
            <label htmlFor="email">Email</label>

            <input
              id="email"
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              autoComplete="off"
              inputMode="none"
              required
            />
          </div>

          <div className="form-field password-field">
            <label htmlFor="password">Password</label>

            <input
              id="password"
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />

            <span
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <div className="form-field">
            <label htmlFor="role">Role</label>

            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Role</option>

              <option value="Admin">Admin</option>

              <option value="Accountant">Accountant</option>

              <option value="Dispatcher">Dispatcher</option>
            </select>
          </div>

          <button type="submit" className="create-user-button">
            Create User
          </button>
        </form>
      </div>

      <div className="table-container">
        <h2>Users</h2>

        <div className="user-filters">
          <div className="user-input">
            <input
              className="left-input"
              type="text"
              placeholder="Search by Name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            <FaSearch className="input-icon" />
          </div>

          <div className="user-select">
            <select
              className="left-select"
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
            >
              <option value="">Filter by Role</option>

              <option value="Admin">Admin</option>

              <option value="Accountant">Accountant</option>

              <option value="Dispatcher">Dispatcher</option>
            </select>

            <FaChevronDown className="select-icon" />
          </div>
        </div>

        <table className="user-table">
          <thead>
            <tr>
              <th>Sr.</th>

              <th>User</th>

              <th>Role</th>

              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {displayedUsers.map((user, index) => (
              <tr
                key={user._id}
                className={`user-table ${
                  index % 2 === 0 ? "even-row" : "odd-row"
                }`}
              >
                <td>{startEntry + index}</td>

                <td>{user.name}</td>

                <td>{user.role}</td>

                <td>
                  <button
                    className="popupedit-btn"
                    onClick={() => handleEditClick(user)} // Correct the handler to open the modal
                  >
                    <FaPencilAlt />
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => handleModalDelete(user)}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="pagination">
          <div className="entries-info">
            Showing {startEntry} to {endEntry} of {totalEntries} entries
          </div>

          <div className="entry-buttons">
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>

            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage * entriesPerPage >= totalEntries}
            >
              Next
            </button>
          </div>
        </div>
      </div>
      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="modal-overlay">
          <div className="delete-modal-container">
            <div className="delete-icon-circle">🗑️</div>
            <h3 className="delete-title">Delete User</h3>
            <p className="delete-message">
              Are you sure you want to permanently delete this user?
            </p>
            <div className="delete-modal-footer">
              <button className="cancel-button" onClick={handleDeleteCancel}>
                Cancel
              </button>
              <button
                className="confirm-delete-button"
                onClick={handleDeleteConfirm}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Edit User Modal */}
      {showEditModal && (
        <div className="modal-overlay">
          <div className="edit-modal-container">
            <div className="modal-header">
              <h3>Edit User</h3>
              <span className="close-icon" onClick={handleEditModalClose}>
                <FaTimes />
              </span>
            </div>
            <hr />
            <div className="edit-modal-content">
              <div className="image-upload">
                <img src={UserPic} alt="User Upload" className="upload-image" />
                <button type="button" className="upload-button">
                  Upload New
                </button>
              </div>
              <form className="popup-formDesign">
                <div className="form-field">
                  <label htmlFor="editName">Full Name</label>
                  <input
                    id="editName"
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={editFormData.name}
                    onChange={handleEditFormChange}
                    required
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="editEmail">Email</label>
                  <input
                    id="editEmail"
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={editFormData.email}
                    onChange={handleEditFormChange}
                    required
                  />
                </div>

                <div className="form-field">
                  <label htmlFor="editRole">Role</label>
                  <select
                    id="editRole"
                    name="role"
                    value={editFormData.role}
                    onChange={handleEditFormChange}
                    required
                  >
                    <option value="">Select Role</option>
                    <option value="Admin">Admin</option>
                    <option value="Accountant">Accountant</option>
                    <option value="Dispatcher">Dispatcher</option>
                  </select>
                </div>
                <button
                  type="button"
                  className="save-edit-button"
                  onClick={handleUpdateUser}
                >
                  Save Changes
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
