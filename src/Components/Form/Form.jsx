/* eslint-disable react/jsx-key */
import { useEffect, useState } from "react";
import Modal from "../Modal/Modal";
import ButtonSoft from "../UI/ButtonSoft/ButtonSoft";
import InputText from "../UI/InputText/InputText";
import "./Form.scss";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";

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
  const [formData, setFormData] = useState({
    fullname: "",
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
    const { fullname, email, phone, day, month, year } = formData;
    return (
      fullname.trim() !== "" &&
      email.trim() !== "" &&
      phone.trim() !== "" &&
      day?.trim() !== "" &&
      month?.trim() !== "" &&
      year?.trim() !== ""
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

  const handleSubmit = () => {
    localStorage.setItem("form", JSON.stringify(formData));

    setIsModal(true);
  };

  useEffect(() => {
    handleUserIP();
  }, []);

  return (
    <form className="Form" onSubmit={(e) => e.preventDefault()}>
      <InputText name="fullname" fun={handleChange} placeHolder={"Fullname"}>
        Fullname
      </InputText>

      <div>
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
      </div>

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
      <ButtonSoft disabled={formSubmit} fun={handleSubmit}>
        Continue
      </ButtonSoft>
    </form>
  );
};

export default Form;
