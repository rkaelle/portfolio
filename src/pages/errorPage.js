import React from 'react';
import { Link } from 'react-router-dom';
import "../styles/errorPage.css"; 

const ErrorPage = () => {
  return (
    <div className="error-page">
        <section>
            <div className="container">
                <h2>
                    <span className="sr-only">Error</span>404
                </h2>
                <p>Sorry, I haven't made this page yet.</p>
                <p>But don't worry, you can find plenty of other things on my homepage.</p>
                <Link to="/" className="px-8 py-3 font-semibold rounded">
                    &lt;&lt; Back to homepage
                </Link>
            </div>
        </section>
    </div>
  );
}

export default ErrorPage;