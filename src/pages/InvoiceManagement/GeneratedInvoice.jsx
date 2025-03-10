import React from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import "./GeneratedInvoice.css";
import Download from "../../Assets/SidebarDropdownIcons/download.png";
import Logo from "../../Assets/Logo/Via-Logo-004.png";
import Address from "../../Assets/SidebarDropdownIcons/location.png";
import Navigation from "../../Assets/SidebarDropdownIcons/navigation.png";

const GeneratedInvoice = () => {
  const downloadInvoice = () => {
    const content = document.querySelector(".generate-invoice-main-container");
    html2canvas(content).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4"); // Portrait, millimeters, A4
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = pageWidth; // Fit to page width
      const imgHeight = (canvas.height * pageWidth) / canvas.width; // Maintain aspect ratio

      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);

      // Save the PDF
      pdf.save("Invoice.pdf");
    });
  };

  return (
    <div className="generate-invoice-main-container">
      {/* Top heading row */}
      <div className="invoice-header">
        <h4 className="trip-id">Trip ID#100032</h4>
        <div className="invoice-logo">
          <img src={Logo} alt="Company Logo" className="logo-image" />
        </div>
        <div className="invoice-right">
        <div className="download-container">
  <img src={Download} alt="Download Icon" className="download-icon" />
  <button
    className="download-link"
    onClick={(e) => {
      e.preventDefault();
      downloadInvoice();
    }}
  >
    Invoice Download
  </button>
</div>

          <div className="invoice-date">Date: 19/12/2024</div>
        </div>
      </div>

      {/* Content Box */}
      <div className="content-box-generate-invoice">
        <h5 className="trip-distance-title">TRIP DISTANCE</h5>

        <div className="content-box-generate-invoice-rows">
          <div className="content-box-generate-invoice-rows-left">
            <img src={Address} alt="address_png" className="address-icon" />
            <p>4/1001 KDA Rote, Shah Fasal Colony Block 4 Karachi</p>
          </div>
          <div className="content-box-generate-invoice-rows-right">
            <p>
              <strong>16.3 Kilometers</strong>
            </p>
            <p>00 hours 00 mins 12 sec</p>
          </div>
        </div>
        <div className="content-box-generate-invoice-rows-left">
          <img src={Navigation} alt="address_png" className="address-icon" />
          <p>Malir Cantonment, Karachi, City, Sindh</p>
        </div>

        <div className="payment-info-invocie">
          <p>Payment Info</p>
          <hr className="separator-line" /> {/* Separator Line */}
          <div className="content-box-generate-invoice-rows">
            <div className="content-box-generate-invoice-rows-left">
              <p>A.C Name : Jhon Jack</p>
            </div>
            <div className="content-box-generate-invoice-rows-right">
              <p>Payment : Cash</p>
            </div>
          </div>
          <div className="content-box-generate-invoice-rows">
            <div className="content-box-generate-invoice-rows-left">
              <p>Phone : +92 312 1234567</p>
            </div>
            <div className="content-box-generate-invoice-rows-right">
              <p>Payment Status : Paid</p>
            </div>
          </div>
          <hr className="separator-line" /> {/* Separator Line */}
        </div>

        <div className="invoice-bottom-table">
          
          <div className="invoice-bottom-row-heading">
            <p className="left-text-heading">SL</p>
            <p className="center-text-heading">Cost Description</p>
            <p className="right-text-heading">Price</p>
          </div>
          <div className="invoice-bottom-row">
            <p className="left-text">1</p>
            <p className="center-text">Trip Cost</p>
            <p className="right-text">PKR 1,731.00</p>
          </div>


          <div className="invoice-bottom-row">
            <p className="left-text">2</p>
            <p className="center-text">Discount Amount</p>
            <p className="right-text">PKR -865.50</p>
          </div>

          <div className="invoice-bottom-row">
            <p className="left-text">3</p>
            <p className="center-text">Coupon Discount</p>
            <p className="right-text">PKR -259.85</p>
          </div>

          <div className="invoice-bottom-row">
            <p className="left-text">4</p>
            <p className="center-text">VAT/Tax(10%)</p>
            <p className="right-text">PKR +60.59</p>
          </div>
        </div>

        <div className="invoice-calculated">
        <div className="invoice-bottom-row">
            <p className="left-text">Thankyou for choosing Via. Please contact us for any queries</p>
            <p className="right-text">Total PKR 666.44</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneratedInvoice;
