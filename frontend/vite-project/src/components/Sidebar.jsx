import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="w-60 min-h-screen border-r p-4">
      <h2 className="text-xl font-bold mb-5">UniformSync</h2>

      <div className="flex flex-col gap-3">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/schools">Schools</Link>
        <Link to="/uniforms">Uniforms</Link>
        <Link to="/sales">Sales</Link>
      </div>
    </div>
  );
}

export default Sidebar;
