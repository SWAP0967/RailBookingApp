import React, { useState, useEffect } from "react";
import { Input, Button, Table, Modal } from "antd";
import { FaTrainSubway } from "react-icons/fa6";
import { CiSearch } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { setenteredtrainnum, setsearchtrain } from "../../Redux/Action_Creators/ActionCreators";
import { searchTrainUrl, apiHeaders } from "../../Api";
import { Link } from "react-router-dom";


function TrainSearch() {
  const dispatch = useDispatch();
  const search_train_details = useSelector((state) => state.Irctc.searchtraindetails);
  const userenterednumber = useSelector((state) => state.Irctc.enteredtrain_number);
  const [loading, setLoading] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [error, setError] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const loggedInUser = useSelector((state) => state.Irctc.user);
  const [showSignUpModal, setShowSignUpModal] = useState(false);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('searchTrainDetails')) || [];
    dispatch(setsearchtrain(storedData));
  }, [dispatch]);

  useEffect(() => {
    setButtonClicked(false); 
  }, [userenterednumber]);

  const handleButtonClick = async () => {
    try {
      setLoading(true);
      setError(null);

      if (!inputValue) {
        setError("Please enter a train number.");
        return;
      }

      const url = searchTrainUrl(userenterednumber);
      const options = {
        method: 'GET',
        headers: apiHeaders,
      };
      const response = await fetch(url, options);
      const responsedata = await response.json();

      if (response.ok) {
        if (responsedata && responsedata.data && Array.isArray(responsedata.data)) {
           // eslint-disable-next-line
          const filteredtrain = responsedata.data.filter(
            (train) => train.train_number === userenterednumber
          );
          dispatch(setsearchtrain(responsedata.data));
          setButtonClicked(true);
          localStorage.setItem('searchTrainDetails', JSON.stringify(responsedata.data));
        } else {
          setError("No data found for the entered train number.");
        }
      } else {
        setError("Error fetching data. Please try again.");
      }
    } catch (error) {
      setError("Error fetching data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    dispatch(setenteredtrainnum(value));
    setButtonClicked(!value); 
  };

  const handleSignUp = () => {
    setShowSignUpModal(true);
  };

  const columns = [
    {
      title: 'Train Name',
      dataIndex: 'train_name',
      key: 'train_name',
    },
    {
      title: 'Engine Train Name',
      dataIndex: 'eng_train_name',
      key: 'eng_train_name',
    },
    {
      title: 'New Train Number',
      dataIndex: 'new_train_number',
      key: 'new_train_number',
    },
  ];

  return (
    <div style={{ minHeight: '90vh', paddingTop: "50px", marginLeft: "200px" }}>
      <div style={{ padding: 80, display: "flex", justifyContent: "center" }}>
        <Input
          placeholder="Enter The Train Number"
          prefix={<FaTrainSubway style={{ fontSize: "1.2rem" }} />}
          value={inputValue}
          onChange={handleChange}
        />
        <Button 
          style={{
            height: "4.2rem",
            color: '#FFFFFF',
            fontSize: '2.5rem',
            borderWidth: "3px",
            borderRadius: "7px",
            backgroundColor: buttonClicked ? "#C33764" : loading ? "#C33764" : "green",
            fontWeight: 700
          }} 
          onClick={loggedInUser.username ? handleButtonClick : handleSignUp}
          disabled={!inputValue}
        >
          <CiSearch />
        </Button>
      </div>
      {error && <p style={{ color: "red", textAlign: "center",fontWeight:700,fontSize:"1rem" }}>{error}</p>}
      {buttonClicked && search_train_details.length > 0 ? (
        <div>
          <h2>TRAIN DETAILS</h2>
          <div className="table" style={{ display: "flex", justifyContent: "center", marginTop: "-7rem", marginLeft: "4rem" }}>
            <Table
              columns={columns}
              dataSource={search_train_details}
              pagination={{ pageSize: 5 }}
              style={{ width: "80%" }} 
            />
          </div>
        </div>
      ) : buttonClicked ? (
        <p>No Train Found</p>
      ) : null}

      <Modal
        title="Please sign up to access this feature"
        visible={showSignUpModal}
        onCancel={() => setShowSignUpModal(false)}
        footer={[
          <Button key="cancel" onClick={() => setShowSignUpModal(false)}>
            Cancel
          </Button>,
        ]}
      >
        <div>
          <p>Don't have an account? <Link to="/signup">Sign Up</Link> </p>
          <p>Already a user <Link to="/login">Login</Link></p>
        </div>
      </Modal>
    </div>
  );
}

export default TrainSearch;

