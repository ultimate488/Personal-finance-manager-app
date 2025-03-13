import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const LandingPage = () => {
  return (
    <div className="container text-center mt-5">
      <h1 className="display-4 fw-bold">Welcome to Fin Manager</h1>
      <p className="lead">Manage your finances efficiently with ease.</p>
      <div className="mt-4">
        <Link to="/signup" className="btn btn-primary btn-lg me-2">Get Started</Link>
        <Link to="/login" className="btn btn-outline-primary btn-lg">Login</Link>
      </div>
    </div>
  );
};

export default LandingPage;
