import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="w-64 min-h-screen bg-gray-900 text-white p-5">
      <h2 className="text-2xl font-bold mb-8">UniformSync</h2>

      <div className="flex flex-col gap-4">
        <Link to="/dashboard" className="hover:bg-gray-700 p-2 rounded">
          Dashboard
        </Link>

        <Link to="/schools" className="hover:bg-gray-700 p-2 rounded">
          Schools
        </Link>

        <Link to="/uniforms" className="hover:bg-gray-700 p-2 rounded">
          Uniforms
        </Link>

        <Link to="/sales" className="hover:bg-gray-700 p-2 rounded">
          Sales
        </Link>
      </div>
    </div>
  );
}

export default Sidebar;
