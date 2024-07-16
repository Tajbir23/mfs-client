import DashboardLayout from "../../layout/Dashboard";


const Dashboard = () => {
  return (
    <DashboardLayout>
      <div className="p-4">
        <h2 className="text-2xl font-semibold">Welcome to your dashboard</h2>
        <p className="mt-4 text-gray-600">This is your dashboard content.</p>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
