import NavbarAdmin from "./NavbarAdmin.tsx";
import "./layout.css";
type LayoutProps = {
  children: React.ReactNode;
};

const AdminLayout = ({ children }: LayoutProps) => {
  return (
    <div className="app-layout">
      <header className="nav-header">
        <NavbarAdmin />
      </header>
      <main className="page-content">{children}</main>
    </div>
  );
};

export default AdminLayout;
