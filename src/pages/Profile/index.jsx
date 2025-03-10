import React, { useState } from "react";
import ViewProfile from "./AdminProfile";
import EditProfile from "./EditProfile"; 

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);

  // Handle the click on the "Edit" button
  const handleEdit = () => {
    console.log("Edit button clicked! Switching to EditProfile");
    setIsEditing(true); // Switch to EditProfile
  };

  // Handle the click on the "Save" button
  const handleSave = () => {
    console.log("Save button clicked! Switching back to ViewProfile");
    setIsEditing(false); // Switch back to ViewProfile
  };

  return (
    <div className="profile-page">
      {isEditing ? (
        <EditProfile onSave={handleSave} /> // Render EditProfile if editing
      ) : (
        <ViewProfile onEdit={handleEdit} /> // Pass handleEdit to ViewProfile
      )}
    </div>
  );
};

export default ProfilePage;
