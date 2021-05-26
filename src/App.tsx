import React, { useReducer } from 'react';
import axios from 'axios';
import Input from 'utils/Input';
import './App.css';

const BASE_URL = 'http://localhost:3002/api';

interface State {
  phoneNumber: "";
  OTP: number,
  isOtpSent: boolean,
  isResendOTP: boolean
};

const App : React.FunctionComponent = () => {

  const initialState: State = {
    phoneNumber: "",
    OTP: 0,
    isOtpSent: false,
    isResendOTP: false
  }

  const [state, setState] = useReducer((state : any, newState: any) => ({ ...state, ...newState }), initialState);

  const { isOtpSent, phoneNumber, isResendOTP, OTP } = state;

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> =
  (event) => {
    const {name, value} = event.target;
    setState({
      [name]: value
    });
  };

  const sendOTP = async (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    if(phoneNumber != "") {
      try {
        const payload = {
          phone: phoneNumber
        };

        const response = await axios.post(`${BASE_URL}/authenticate`, payload);
        
        if(response.data.status) {
          const { result } = response.data;
          setState({
            isOtpSent: true,
            phoneNumber: result?.phone
          });

          alert(`OTP Generated: ${result?.otp}`);
        }
      } catch(e) {
          alert('Phone number already exist, Click on Resend OTP');
      }
    }
  }

  const resendOTP = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    setState({
      phoneNumber: "",
      isOtpSent: false,
      OTP: 0,
      isResendOTP: true
    });
  }

  const verifyOTP = async (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    setState({
      isOtpSent: true,
      isResendOTP: false
    })

    if(OTP != "" && phoneNumber != "") {
      try {
        const payload = {
          phone: phoneNumber,
          otp: OTP
        };

        const response = await axios.post(`${BASE_URL}/verify}`, payload);
        
        if(response.data.status) {
          alert('OTP verified successfully!');
        }
      } catch(e) {
          alert('Error occured while processing');
      }
    }
  }
  
  const sendNewOTPtoUser = async (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();

    if(phoneNumber != "") {
      try {
        const payload = {
          phone: phoneNumber
        };

        const response = await axios.patch(`${BASE_URL}/resend`, payload);
        
        if(response.data.status) {
          const { result } = response.data;
          setState({
            isOtpSent: true,
            isResendOTP: false
          });

          alert(`OTP Re-Generated: ${result?.otp}`);
        }
      } catch(e) {
          alert('An error occured, Please try ');
      }
    }    
  }

    return (
      <div className="container">
        <div className="form-container">
          <h1>OTP Validator</h1>
          <form>
            {
              !isOtpSent && (
                <>
                  <div className="form-group">
                      <label>Phone Number</label>
                      <Input type="text" name="phoneNumber" value={phoneNumber} autoComplete="off" onChange={handleInputChange} placeholder="Enter a valid OTP to get OTP" />
                  </div>

                  <div className="form-group">
                    {
                      isResendOTP ? <button type="button" className="btn" onClick={sendNewOTPtoUser}>Resend OTP</button> : <button type="button" className="btn" onClick={sendOTP}>Send OTP</button>
                    }
                   
                  </div>
                </>
              )
            }

            {
              isOtpSent && (
                <>
                  <div className="form-group">
                      <label>OTP</label>
                      <Input type="text" name="OTP" autoComplete="off" onChange={handleInputChange} placeholder="Enter the OTP generated" />
                  </div>

                  <div className="form-group">
                    <button type="button" className="btn" onClick={verifyOTP}>Verify OTP</button>
                  </div>
                </>
              )
            }

            <div className="mt-5">
              <button type="button" onClick={resendOTP} className="plain-btn">Resend OTP</button>
            </div>
          </form>
        </div>
      </div>
    )
}

export default App;
