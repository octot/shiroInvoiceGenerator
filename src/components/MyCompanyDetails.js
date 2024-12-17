import { useState } from "react";
import "../componentStyles/MyCompanyDetails.css";
import { URI } from "./CONSTANTS";
// import ImageUpload from "./imageUploader";
import { Button } from "@mui/material";
const CompanyDetailsForm = () => {
  const [formData, setFormData] = useState({
    companyName: "SHIRO Printing & Packaging",
    gstNumber: "32MTHPS2278G1Z8",
    address: "St. Andrews Bridge, Chittatimukku, Opposite Mini Industry",
    phone: "8714095116",
    email: "shithin.shiro@gmail.com",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${URI}/companies`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          updatedAt: new Date(),
        }),
      });

      const data = await response.json();
      if (data.success) {
        alert("Company details updated successfully!");
        // Optionally load the updated data back into the form
        setFormData(data.data);
      } else {
        alert("Error: " + data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error updating company details");
    }
    setFormData({
      companyName: "",
      gstNumber: "",
      address: "",
      phone: "",
      email: "",
    });
  };

  return (
    <div>
      <div className="form-container">
        <div className="form-wrapper">
          <div className="form-title-box">
            <h1 className="form-title">Company Details</h1>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="companyName">
                  Company Name<span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  id="companyName"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="gstNumber">
                  GST Number<span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  id="gstNumber"
                  name="gstNumber"
                  value={formData.gstNumber}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="address">
                  Company Address<span style={{ color: "red" }}>*</span>
                </label>
                <textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  rows="3"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">
                  Phone Number<span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">
                  Email Address<span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              {/*
              <div className="form-group image-position">
                <ImageUpload />
              </div>
              */}
            </div>
            <Button type="submit" className="submit-button">
              Save Company Details
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CompanyDetailsForm;
