import React, { Component } from "react";
import styles from "./SocialLogin.scss";
import classNames from "classnames/bind";
import { GOOGLE_AUTH_URL, FACEBOOK_AUTH_URL } from "commonConstants";
import fbLogo from "img/fb-logo.png";
import googleLogo from "img/google-logo.png";

const cx = classNames.bind(styles);

class SocialLogin extends Component {
  render() {
    let baseUrl;
    let redirectUri;
    if (process.env.NODE_ENV === 'development') {
      baseUrl = 'https://localhost:8080';
      redirectUri = 'http://localhost:3000/oauth2/redirect';
    } else {
      baseUrl = 'http://ec2-13-209-124-199.ap-northeast-2.compute.amazonaws.com';
      redirectUri = 'http://bucket-community-front-deploy.s3-website.ap-northeast-2.amazonaws.com/oauth2/redirect';
    }

    return (
      <div className={cx("login-container")}>
        <div className={cx("login-content")}>
          <h1 className={cx("login-title")}>Login to SpringSocial</h1>
          <div className="social-login">
            <a
              className={cx("btn", "block", "social-btn", "google")}
              href={baseUrl + GOOGLE_AUTH_URL + redirectUri}
            >
              <img src={googleLogo} alt="Google" /> Google
            </a>
            <a
              className={cx("btn", "block", "social-btn", "facebook")}
              href={baseUrl + FACEBOOK_AUTH_URL + redirectUri}
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
