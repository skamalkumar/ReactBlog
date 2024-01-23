import { useGoogleLogin } from "@react-oauth/google";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FcGoogle, FcLike } from "react-icons/fc";
import axios from "axios";

import {
  selectSignedIn,
  setSignedIn,
  setUserData,
} from "../features/userSlice";

import "../styling/home.css";

const Homepage = () => {
  const isSignedIn = useSelector(selectSignedIn);
  const dispatch = useDispatch();
  const [user, setUser] = useState([]);
  const [profile, setProfile] = useState([]);
  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      setUser(codeResponse);
      console.log(codeResponse);
      dispatch(setSignedIn(true));
      dispatch(setUserData(codeResponse.profileObj));
    },
    onError: (error) => console.log("Login Failed:", error),
  });

  useEffect(() => {
    if (user) {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
              Accept: "application/json",
            },
          }
        )
        .then((res) => {
          setProfile(res.data);
          console.log(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [user]);

  // const login = (response) => {
  //   console.log(response);
  //   dispatch(setSignedIn(true));
  //   dispatch(setUserData(response.profileObj));
  // };

  return (
    <div className="home__page">
      {!isSignedIn ? (
        <div className="login__message">
          <h2>📗</h2>
          <h1>
            Reader's Delight{" "}
            <span className="heart">
              <FcLike className="heart1" />
            </span>
          </h1>
          <p>
            We provide high quality online resource for reading blogs. Just sign
            up and start reading some quality blogs.
          </p>
          <div>
            <button type="button" onClick={() => login()}>
              <FcGoogle />
              SignIn With Google
            </button>
          </div>

          {/* <GoogleLogin
            clientId="1084334404054-jch76dh3eqbj787ostatku2t93h61muv.apps.googleusercontent.com"
            render={(renderProps) => (
              <button
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
              >
                Login with Google
              </button>
            )}
            onSuccess={login}
            onFailure={login}
            isSignedIn={true}
            cookiePolicy={"single_host_origin"}
          /> */}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Homepage;
