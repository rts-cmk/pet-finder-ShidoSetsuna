import { Link } from "react-router";
import "./error.scss";

function Error() {
  return (
    <>
      <main className="error-page">
        <h1 className="error-page__code">404</h1>
        <p className="error-page__message">Page Not Found :(</p>
        <button className="error-page__button">
          <Link to="/">Go Home</Link>
        </button>
      </main>
    </>
  );
}

export default Error;
