import React, {useEffect, useState} from "react";
import "./AdminProfile.css";
import { Link } from 'react-router-dom';
import { useLocation } from "react-router-dom";
/*import profile from "../../Assets/SidebarDropdownIcons/user.png"*/
const Profile  = () => {
  
  const location = useLocation();
  const [preview, setPreview] = useState(null);
  
  const updatedData = location.state?.updatedData || {
    // Default data if nothing is passed
    name: "Default Name",
    role: "Default Role",
    email: "default@domain.com",
    phone: "000-0000000",
    password: "********",
    preview:""
  };
  

  useEffect(() => {
    const image = localStorage.getItem("uploadedImage"); 
    if (image) {
      setPreview(image);
    }
  }, []);

  return (
    <div className="profile-container">

      <div className="profile-content">

        <main className="profile-main">
          <h3>Profile</h3>
          <div className="profile-card">

            <section className="profile-general-info">
              <h1>General Information</h1>

              <div className="profile-info-line">
              <p className="profile-updated-name">
                <strong>Name:</strong> 
                <span>{updatedData.name}</span>
              </p>
              <p className="profile-updated-role">
                <strong>Role:</strong> 
                <span>{updatedData.role}</span>
              </p>

              </div>

              <div className="profile-more-info">
              <p className="profile-updated-email"><strong>Email:</strong><span>{updatedData.email}</span></p>  
              <p className="profile-updated-phone"><strong>Phone:</strong><span>{updatedData.phone}</span></p>  
              <p className="profile-updated-password"><strong>Password:</strong><span>{updatedData.password}</span></p>
              </div>

              <Link to="/Profile/editprofile">
              <button className="profile-edit-style">Edit</button>
              </Link>
              
            </section>
            
            <section className="edit-image">
             
              {preview ? (
                <img
                src={preview}
                alt="Profile Preview"
                style={{ width: "140px", height: "140px", margin:"30px",borderRadius: "50%" }}/>
              ) : (
              <p>No image selected</p>
              )}
            </section>
          </div>
        </main>
      </div>
    </div>
    
  );
};

export default Profile;