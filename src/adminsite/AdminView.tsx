import React from "react";
// import NavbarAdmin from "./NavbarAdmin";
// import AdminLayout from "./AdminLayout";

const AdminView: React.FC = () => {
  return (
    <div>
      <h1>Admin View</h1>
      <nav>
        <ul>
          <li>
            <a href="#movies">Film</a>
          </li>
          <li>
            <a href="#upcomming">Kommende Film</a>
          </li>
          <li>
            <a href="#events">Events</a>
          </li>
        </ul>
      </nav>
      {/*Admin stuff her!*/}
    </div>
  );
};

export default AdminView;
