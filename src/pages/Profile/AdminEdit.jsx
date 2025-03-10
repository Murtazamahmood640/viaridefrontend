import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./AdminEdit.css";
import UserPic from "../../Assets/SidebarDropdownIcons/user.png";

const EditProfile = () => {
  const navigate = useNavigate();
  const [preview, setPreview] = useState(null);


  const [formData, setFormData] = useState({
    name: "Shaeroniya",
    role: "Admin",
    email: "shaeroniya@admin.com",
    phone: "+92 32X XXXXXXX",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
  if (file) {
    setFormData({ ...formData, image: file });
    const reader = new FileReader();
    reader.onload = () => {
      setPreview(reader.result);
      localStorage.setItem("uploadedImage", reader.result);
    };
    reader.readAsDataURL(file);
  }
  };


  const handleSave = () => {
    console.log("Saved Details:", formData);
  
    if (!preview) {
      alert("Please upload an image before saving!");
      return;
    }
  
    navigate("/Profile/AdminProfile", {
      state: { 
        updatedData: formData, // Pass form data only
      },
    });
  };;



  return (
   
    <div className="edit-container">
      <div className="edit-content">

        <main className="edit-main">
          <h3>Update Profile</h3>
          <div className="edit-card">
            <section className="edit-general-info">
              <div className="edit-info-line">
                <label>
                  <strong>Name:</strong>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </label>
                <label>
                  <strong>Role:</strong>
                  <input
                    type="text"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                  />
                </label>
              </div>
             
              <label>
                <strong>
                  Email:</strong>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  style={{
                    border: '1px solid #ccc',
                    borderRadius:'1.4%',
                    width: '30%',
                    marginBottom:'1%',
                  fontSize:'100%'}}
                />
              </label>
              <label>
                <strong >
                  Phone:</strong>
                <input
                  type="text"
                    name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  style={{
                    border: '1px solid #ccc',
                    borderRadius:'1.2%',
                    width: '30%',
                    marginBottom:'1%',
                  fontSize:'100%'}}
                />
              </label>
              
              <div className="edit-info-line">
                <label>
                  <strong>Password:</strong>
                  <input
                    type="text"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    style={{
                      marginBottom:'2%',
                    }}
                  />
                </label>
                <label>
                  <strong>Confirm Password:</strong>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    style={{
                      marginBottom:'20px',
                    }}
                  />
                </label>
              </div>
              <Link to="/Profile/AdminProfile" 
              state={{ updatedData: formData }}
              className="profile-save-button"
              onClick={handleSave}>
                Save
              </Link>

            </section>
            <section className="edit-image">
            <img
          src={preview || UserPic}
          alt="Profile Preview"
          style={{
            width: "100px",
            height: "100px",
            borderRadius: "50%",
            objectFit: "cover",
          }}
        />
        <input type="file"
            id="file-upload"
            accept="image/*"
            className="file-upload-input"
            onChange={handleImageChange}
            style={{ display: "none" }} 
          />
          <button
            type="button"
            className="upload-button"
            onClick={() => document.getElementById("file-upload").click()} 
            >
            Upload New
          </button>
              <p style={{color:'#254E58',}}>
                File Format: jpg, png, jpeg
                <br />
                Max Size: 5 MB
              </p>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
};

export default EditProfile;