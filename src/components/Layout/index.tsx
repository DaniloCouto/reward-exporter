import { Outlet } from "react-router-dom";

function Layout() {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <Outlet />
      </div>
    );
  }

export default Layout;