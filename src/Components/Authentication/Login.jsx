import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, Col } from "antd";
import { useNavigate, Link } from "react-router-dom";
import { loginpage } from "../../Redux/Action_Creators/ActionCreators";

function Login() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [nameError, setNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loginError, setLoginError] = useState("");

  const dispatch = useDispatch();
  const loggedInUser = useSelector((state) => state.Irctc.user);

  const validateInputs = () => {
    let isValid = true;

    if (!name) {
      setNameError("Name is required");
      isValid = false;
    } else {
      setNameError("");
    }

    if (!password) {
      setPasswordError("Password is required");
      isValid = false;
    } else {
      setPasswordError("");
    }

    return isValid;
  };

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateInputs()) {
      const storedUser = localStorage.getItem("loggedInUser");
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);

        if (parsedUser.username === name && parsedUser.password === password) {
          dispatch(loginpage(parsedUser));
          navigate("/home");
          return;
        }
      }
      setLoginError("Invalid login credentials");
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
          <div style={{ paddingTop: "10rem" }}>
            <Card span={10} className="transparent-card">
              <form onSubmit={(e) => handleSubmit(e)}>
                <h1
                  style={{
                    fontFamily: "serif",
                    fontWeight: 700,
                    fontSize: "3rem",
                  }}
                >
                  LOGIN{" "}
                </h1>

                <input
                  className="userinput"
                  type="name"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <span className="inputerr">{nameError}</span>

                <input
                  className="userinput"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <span className="inputerr">{passwordError}</span>

                <button type="submit" className="submitbtn">
                  SUBMIT
                </button>
                {loginError && (
                  <div style={{ color: "red", marginTop: "10px" }}>
                    {loginError}
                  </div>
                )}
                <div className="signupdecor">
                  Are you New? <Link to="/signup">Signup</Link>
                </div>
              </form>
            </Card>
          </div>
        </Col>
      )}
    </div>
  );
}

export default Login;
