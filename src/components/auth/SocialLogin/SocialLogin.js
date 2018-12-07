import React, { Component } from "react";
import styles from "./SocialLogin.scss";
import classNames from "classnames/bind";
import { GOOGLE_AUTH_URL, FACEBOOK_AUTH_URL } from "commonConstants";
import fbLogo from "img/fb-logo.png";
import googleLogo from "img/google-logo.png";

const cx = classNames.bind(styles);

class SocialLogin extends Component {
  render() {
    return (
      <div className={cx("login-container")}>
        <div className={cx("login-content")}>
          <h1 className={cx("login-title")}>Login to SpringSocial</h1>
          <div className="social-login">
            <a
              className={cx("btn", "block", "social-btn", "google")}
              href={GOOGLE_AUTH_URL}
            >
              <img src={googleLogo} alt="Google" /> Google
            </a>
            <a
              className={cx("btn", "block", "social-btn", "facebook")}
              href={FACEBOOK_AUTH_URL}
            >
              <img src={fbLogo} alt="Facebook" /> Facebook
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default SocialLogin;
