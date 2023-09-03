import Form from "../Components/Form/Form";

const ConfirmAccount = () => {
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
          paddingTop: "1rem",
          borderRadius:
            "max(0px, min(8px, ((100vw - 4px) - 100%) * 9999)) / 8px",
          backgroundColor: "#fff",
          boxShadow: "0 1px 2px rgba(0, 0, 0, 0.2)",
          width: "100%",
          maxWidth: "600px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <h1
          style={{
            fontWeight: "600",
            fontSize: "1.5rem",
            maxWidth: "90%",
            marginBottom: ".75rem",
          }}
        >
          Confirm this is your account
        </h1>

        <h5
          style={{
            fontWeight: 300,
            fontSize: 17,
          }}
        >
          This helps us to prove this account really belongs to you.
        </h5>

        <div
          style={{
            marginTop: "1rem",
          }}
        >
          <Form />
        </div>
      </div>
    </div>
  );
};

export default ConfirmAccount;
