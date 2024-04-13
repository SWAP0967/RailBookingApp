import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, Col } from "antd";
import { useNavigate, Link } from "react-router-dom";
import { signuppage } from "../../Redux/Action_Creators/ActionCreators";
function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [signupSuccess] = useState(false);

  const dispatch = useDispatch();
  const loggedInUser = useSelector((state) => state.Irctc.user);

  const validateInputs = () => {
    let isValid = true;

    if (!username) {
      setUsernameError("Username is required");
      isValid = false;
    } else {
      setUsernameError("");
    }

    if (!email) {
      setEmailError("Email is required");
      isValid = false;
    } else {
      setEmailError("");
    }

    if (!password) {
      setPasswordError("Password is required");
      isValid = false;
    } else {
      setPasswordError("");
    }

    if (!phoneNumber) {
      setPhoneNumberError("Phone Number is required");
      isValid = false;
    } else {
      setPhoneNumberError("");
    }

    return isValid;
  };

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateInputs()) {
      dispatch(
        signuppage({
          username,
          email,
          password,
          phoneNumber,
        })
      );
      const user = {
        username,
        email,
        password,
        phoneNumber,
      };

      localStorage.setItem("loggedInUser", JSON.stringify(user));

      navigate("/home");
    }
  };

  return (
    <div className="validationbg">
      {loggedInUser.username ? (
        <div>
          <h1>Welcome, {loggedInUser.username}!</h1>
        </div>
      ) : (
        <Col
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div style={{ paddingTop: "5rem" }}>
            <Card span={10} className="transparent-card ">
              <form onSubmit={(e) => handleSubmit(e)}>
                <h1
                  style={{
                    fontFamily: "serif",
                    fontWeight: 700,
                    fontSize: "3rem",
                  }}
                >
                  SIGN UP{" "}
                </h1>
                <div>
                  <input
                    className="userinput"
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <span className="inputerr">{usernameError}</span>
                </div>

                <div>
                  <input
                    className="userinput"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <span className="inputerr">{emailError}</span>
                </div>

                <div>
                  <input
                    className="userinput"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <span className="inputerr">{passwordError}</span>
                </div>

                <div>
                  <input
                    className="userinput"
                    type="text"
                    placeholder="Phone Number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                  <span className="inputerr">{phoneNumberError}</span>
                </div>

                <button type="submit" className="submitbtn">
                  SUBMIT
                </button>
                <div className="signupdecor">
                  Already a user? <Link to="/login">login</Link>
                </div>
              </form>
              {signupSuccess && (
                <p style={{ color: "green", marginTop: "10px" }}>
                  Account successfully created! Redirecting to home...
                </p>
              )}
            </Card>
          </div>
        </Col>
      )}
    </div>
  );
}

export default SignUp;
