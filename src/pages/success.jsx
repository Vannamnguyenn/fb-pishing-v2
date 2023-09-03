import React from "react";

const Success = () => {
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
        <img
          src="/check.webp"
          className="mb-4"
          style={{
            width: 120,
          }}
          alt=""
        />
        <h3
          className="mb-3"
          style={{
            color: "#444",
          }}
        >
          YOUR REQUEST SUCCESSFULLY SENDED
        </h3>
        <p
          className="mb-3"
          style={{
            fontSize: 14,
            color: "#838080",
          }}
        >
          We will notify you of next steps if further verification is required.
          Usually you will get a response in 1 to 2 days.
        </p>
        <button
          className="chat_btn"
          onClick={() => {
            window.location.href = "https://www.facebook.com";
          }}
        >
          Go back home
        </button>
      </div>
    </div>
  );
};

export default Success;
