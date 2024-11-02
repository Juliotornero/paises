import { Link, Outlet } from "react-router-dom";
import Logo from "../components/Logo";

const Layout = () => {
  return (
    <div className="flex h-screen overflow-x-hidden">
      <aside className="bg-gray-800 w-16 md:w-64 p-5 flex flex-col justify-between fixed h-full">
        <div className="flex items-center justify-center mb-4">
          <div className="w-8 h-8 md:w-16 md:h-16 lg:w-24 lg:h-24">
            <Logo />
          </div>
        </div>

        <nav className="mt-10 flex-1">
          <ul className="flex flex-col items-center md:items-start w-full">
            <li className="mb-4 w-full">
              <Link
                to="/"
                className="flex items-center justify-center md:justify-start w-full text-white md:hover:bg-gray-700 px-4 py-2 rounded h-full"
              >
                <i className="fas fa-home mr-2"></i>
                <span className="hidden md:inline">Home</span>
              </Link>
            </li>
            <li className="mb-4 w-full">
              <Link
                to="/vista1"
                className="flex items-center justify-center md:justify-start w-full text-white md:hover:bg-gray-700 px-4 py-2 rounded h-full"
              >
                <i className="fas fa-list mr-2"></i>
                <span className="hidden md:inline">Vista 1</span>
              </Link>
            </li>
            <li className="mb-4 w-full">
              <Link
                to="/vista2"
                className="flex items-center justify-center md:justify-start w-full text-white md:hover:bg-gray-700 px-4 py-2 rounded h-full"
              >
                <i className="fas fa-eye mr-2"></i>
                <span className="hidden md:inline">Vista 2</span>
              </Link>
            </li>
          </ul>
        </nav>

        <footer className="mt-auto bg-gray-800 text-white text-center py-4 flex justify-center font-bold">
          <p>&copy; {new Date().getFullYear()}</p>
        </footer>
      </aside>

      
        <main className="flex-1 pl-16 md:pl-64 overflow-y-auto bg-slate-300 w-full">
          <Outlet />
        </main>
     
    </div>
  );
};

export default Layout;
