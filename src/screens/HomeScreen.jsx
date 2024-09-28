import { Outlet, Link } from "react-router-dom";

const HomeScreen = () => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">HomeScreen</Link>
          </li>
          <li>
            <Link to="/EventScreen">EventScreen</Link>
          </li>
          <li>
            <Link to="/UpdateScreen">UpdateScreen</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  )
};

export default HomeScreen;