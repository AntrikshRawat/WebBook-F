import React, { useContext, useState } from 'react';
import './Home.css';
import notecontext from '../context/notes/noteContext';
import { useNavigate } from 'react-router-dom';

export default function ResetPass() {
  const navigate = useNavigate();
  const { Otp, resetPassword } = useContext(notecontext);
  const [uotp, setUotp] = useState('');
  const [validate, isValidate] = useState(false); // Tracks whether OTP is validated
  const [load, setLoad] = useState(false); // Tracks the loading state
  const [pass, setPass] = useState({ pass: '', confirmpass: '' });

  const handleOtpChange = (e) => {
    setUotp(e.target.value);
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    if (parseInt(uotp) === Otp) {
      isValidate(true); // Switch to password reset form
    } else {
      alert('Wrong OTP');
    }
  };

  const handlePasswordChange = (e) => {
    setPass({ ...pass, [e.target.name]: e.target.value });
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (pass.pass !== pass.confirmpass) {
      alert("Confirm Password Didn't Match!");
      return;
    }
    setLoad(true);
    const res = await resetPassword(pass.pass);
    setLoad(false);
    alert(res);
    navigate('/mynotes');
  };

  return (
    <>
      {!validate ? (
        // OTP Validation Form
        <form className="container h-25 mt-5 w-75" onSubmit={handleOtpSubmit}>
          <h3 className="w-100 text-center mb-3">Enter 6 Digit OTP:</h3>
          <div className="otp d-flex flex-wrap justify-content-center">
            <input
              type="text"
              placeholder="******"
              onChange={handleOtpChange}
              maxLength={6}
              className="num w-100 text-light"
              autoFocus
            />
            <button
              disabled={uotp.length !== 6}
              className="btn btn-dark w-50 mt-4 mw-auto"
            >
              Submit
            </button>
          </div>
        </form>
      ) : (
        // Password Reset Form
        <form className="container h-25 mt-5 w-75" onSubmit={handlePasswordSubmit}>
          <div className="pass w-100">
            <h3 className="text-start text-dark font-monospace mx-3">New Password:</h3>
            <input
              className="num w-75 px-1"
              type="password"
              name="pass"
              minLength={8}
              maxLength={32}
              onChange={handlePasswordChange}
              autoComplete="true"
              required
            />
          </div>
          <div className="pass w-100 my-2">
            <h3 className="text-start text-dark font-monospace mx-3">Confirm Password:</h3>
            <input
              onChange={handlePasswordChange}
              className="num w-75 px-1"
              type="password"
              name="confirmpass"
              minLength={8}
              maxLength={32}
              autoComplete="true"
              required
            />
          </div>
          <div className="pass w-100">
            <button disabled={load} className="btn btn-success mt-4 w-50">
              {load && (
                <span
                  className="spinner-border spinner-border-sm"
                  aria-hidden="true"
                ></span>
              )}
              <span className="mx-2 font-monospace text-center" role="status">
                Submit
              </span>
            </button>
          </div>
        </form>
      )}
    </>
  );
}
