import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import DeetoxSign from "./components/DeetoxSign";

import InstagramLogo from "./assets/ig.png";
import YtLogo from "./assets/yt.png";
import HoverLink from "./components/HoverLink";
import axios from "axios";

const Homepage = lazy(() => import("./pages/Home"));
const Splashpage = lazy(() => import("./pages/Splash"));
const Testpage = lazy(() => import("./pages/test"));
const Dashboard_home = lazy(() => import("./dashboard/homepage"));
// const Ads = lazy(() => import('./components/GoogleAd') );
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
// const renderLoader = () => <p>Loading</p>;

const PrivateRoute = (props) => {
  const token = localStorage.getItem("aop_token");
  if (token) {
    return <Route exact={true} path={props.path} component={props.component} />;
  } else {
    return <Homepage {...props} />;
  }
};

function App() {
  React.useEffect(() => {
    const redirectAsPerTime = () => {
      const currentTime = new Date();
      const timezoneOffsetMinutes = currentTime.getTimezoneOffset();
      const timezoneOffsetHours = timezoneOffsetMinutes / 60;
      const currentUrl = window.location.href;
      const currentDomain = window.location.origin;
      let newDomain = process.env.REACT_APP_OTHER_COUNTRY_URL;

      if (timezoneOffsetHours === -5.5) {
        newDomain = process.env.REACT_APP_INDIAN_URL;
      }

      if (!currentUrl.includes(newDomain)) {
        const redirectUrl = currentUrl.replace(
          new RegExp(currentDomain, "g"),
          newDomain
        );

        window.location.replace(redirectUrl);
      }
    };

    // Redirect as per Time (utc)
    redirectAsPerTime();
  }, []);

  return (
    <React.Fragment
      style={{
        position: "relative",
        innerHeight: "100vh",
        innerWidth: "100vw",
      }}
    >
    {/*<div className="linkLogo1">
        <HoverLink
          link="https://www.instagram.com/appopener_"
          imgUrl={InstagramLogo}
        />
      </div>/*}
      {/* <DeetoxSign /> */}
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route exact path="/" component={Homepage}></Route>
            <Route
              exact
              path="/:apptype/:shorturl"
              component={Splashpage}
            ></Route>
            <Route exact path="/user" component={Testpage}></Route>
            <Route
              exact
              path="/privacypolicy"
              component={PrivacyPolicy}
            ></Route>
            {/* <Route exact path='/ads.txt' component={Ads}></Route> */}
            <PrivateRoute
              path="/dashboard"
              component={Dashboard_home}
            ></PrivateRoute>
            {/* this if for error page 404 */}
            <Route component={Homepage}></Route>
          </Switch>
        </Suspense>
      </Router>
    </React.Fragment>
  );
}

export default App;
