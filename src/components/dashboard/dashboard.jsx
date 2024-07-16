import { Outlet } from "react-router-dom";
import DashboardLayout from "../../layout/Dashboard";


const Dashboard = () => {
  return (
    <DashboardLayout>
      <div className="p-4">
        <Outlet />
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
