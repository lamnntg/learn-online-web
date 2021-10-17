import React from "react";
import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div class="main-container">
      <nav className="navbar navbar-expand-lg navbar-light bg-light static-top header-a">
        <div className="container nav-container">
          <a className="navbar-brand brand" href="#">
            Learn Online
          </a>

          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div
            className="collapse navbar-collapse alink"
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav ml-auto">
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Courses
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <a className="dropdown-item" href="#">
                    Action
                  </a>
                  <a className="dropdown-item" href="#">
                    Another action
                  </a>
                  <div className="dropdown-divider"></div>
                  <a className="dropdown-item" href="#">
                    Something else here
                  </a>
                </div>
              </li>

              <li className="nav-item active">
                <a className="nav-link" href="#">
                  Why Us <span className="sr-only">(current)</span>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/login">
                  Support
                </a>
              </li>
              <a className="btn btn-outline-dark start" href="#">
                Get Started
              </a>
            </ul>
          </div>
        </div>
      </nav>
      {/* content */}
      <div className="content">
        <div>
          <div className="container content">
            <div className="row">
              <div className="col-sm-3 talk">
                <h1>Learn</h1>
                <h1>Online</h1>
                <br />
                <h6 className="bold-four">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet,
                  nesciunt molestiae ex inventore quibusdam id architecto quos
                  cupiditate nobis magnam eum voluptatem quas quis obcaecati
                  dolor vero veritatis similique alias.
                </h6>
                <br />
                <h6>
                <Link to="/sign-in" className="btn btn-dark start start-two">
                  <span>Get Started</span>
                </Link>
                </h6>
              </div>
              <div className="col-sm-9 showcase-img">
                {/* <div className="circle"></div> */}
              </div>
            </div>
          </div>

          <section class="features-icons bg-light text-center det-ails">
            <div class="container">
              <div class="row">
                <div class="col-lg-4">
                  <div class="features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3">
                    <div class="features-icons-icon d-flex  icon-bra-ails">
                      <i class="icon-screen-desktop m-auto text-primary icon-ails"></i>
                    </div>
                    <h5>Lorem Tag</h5>
                    <p class="lead mb-0">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    </p>
                  </div>
                </div>
                <div class="col-lg-4">
                  <div class="features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3">
                    <div class="features-icons-icon d-flex  icon-bra-ails">
                      <i class="icon-layers m-auto text-primary icon-ails"></i>
                    </div>
                    <h5>Morem Tag</h5>
                    <p class="lead mb-0">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    </p>
                  </div>
                </div>
                <div class="col-lg-4">
                  <div class="features-icons-item mx-auto mb-0 mb-lg-3">
                    <div class="features-icons-icon d-flex  icon-bra-ails">
                      <i class="icon-check m-auto text-primary icon-ails"></i>
                    </div>
                    <h5>Oorem Tag</h5>
                    <p class="lead mb-0">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
      <footer class="page-footer font-small blue footer">
        <div class="footer-copyright text-center py-3">
          Made with ❤ by
          <a
            href="https://github.com/lamnntg"
            target="_blank"
            rel="noopener noreferrer"
            className="author"
          >
            {" "}
            Lam Nguyen
          </a>
        </div>
      </footer>
    </div>
  );
}
