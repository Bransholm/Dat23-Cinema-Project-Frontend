
// import NavHeader from "./NavHeader.tsx";

import Navigation from "./Navigation";

// import "./layout.css";

import NavHeader from "./NavHeader";
import "./layout.css";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (

    <div className="app-layout">
      <header className="nav-header">
          <Navigation />

    <div className="app-layout ">
      <header className="nav-header ">
        <NavHeader />

      </header>
      <main className="page-content">{children}</main>
    </div>
  );
};

export default Layout;



// import NavHeader from "./NavHeader";
// import "./layout.css";
// type LayoutProps = {
//   children: React.ReactNode;
// };

// const Layout = ({ children }: LayoutProps) => {
//   return (
//     <div className="app-layout">
//       <header className="nav-header">
//         <NavHeader />
//       </header>
//       <main className="page-content">{children}</main>
//     </div>
//   );
// };

// export default Layout;

