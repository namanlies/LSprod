import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import { useState } from "react";

export default function DeetoxSign() {
  const [user, setUser] = useState({ name: "", phoneNo: "" });
  const [nameError, setNameError] = useState({ state: false, msg: "" });
  const [phoneNoError, setPhoneNoError] = useState({ state: false, msg: "" });
  const [openLoginModal, setOpenLoginModal] = useState(true);
  const [userSubmitted, setUserSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSaveUser = async (e) => {
    e.preventDefault();
    if (user.name.length <= 2 || user.name.length >= 20) {
      setUser({ ...user, name: "" });
      setNameError({ state: true, msg: "Invalid name" });
      return;
    } else {
      setNameError({ state: false, msg: "" });
    }

    if (user.phoneNo.length === 10 || user.phoneNo.length === 12) {
      let isNOFlag = false;
      const phoneNumberArray = user.phoneNo.split("");
      for (let i = 0; i < phoneNumberArray; i++) {
        if (isNaN(parseInt(phoneNumberArray[i]))) {
          isNOFlag = true;
        }
      }
      if (isNOFlag) {
        setUser({ ...user, phoneNo: "" });
        setPhoneNoError({ state: true, msg: "Invalid phone no." });
        return;
      } else {
        setPhoneNoError({ state: false, msg: "" });
      }
    } else {
      setUser({ ...user, phoneNo: "" });
      setPhoneNoError({ state: true, msg: "Invalid phone no." });
      return;
    }
    try {
      await addDoc(collection(db, "Users"), {
        name: user.name,
        phoneNo: user.phoneNo,
        createdAt: serverTimestamp(),
      });
      setUser({ name: "", phoneNo: "" });
      window.open(
        "http://api.whatsapp.com/send?phone=6390009001&text=I want to get Deetox",
        "_blank"
      );
      setUserSubmitted(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="FloatLoginComponent">
      {userSubmitted ? (
        <button className="signIn_btn">
          Thank You for connecting <br /> with your personal Deetox Assistant!
        </button>
      ) : (
        <>
          {openLoginModal ? (
            <div className="FloatLoginComponent_modal">
              <button
                className="close_btn"
                onClick={() => setOpenLoginModal((prev) => !prev)}
              >
                X
              </button>

              <p className="singin_msg">Get Deetox</p>
              <form onSubmit={handleSaveUser} className="signIn_Form">
                <input
                  name="name"
                  type="text"
                  placeholder={nameError.state ? nameError.msg : "Name"}
                  value={user.name}
                  onChange={handleChange}
                />
                <input
                  name="phoneNo"
                  type="text"
                  placeholder={
                    phoneNoError.state ? phoneNoError.msg : "Phone no."
                  }
                  value={user.phoneNo}
                  onChange={handleChange}
                />
                <div className="button_container">
                  <button type="submit">Submit</button>
                </div>
              </form>
              <div className="logo_handler"></div>
            </div>
          ) : (
            <button
              onClick={() => setOpenLoginModal((prev) => !prev)}
              className="signIn_btn"
            >
              Get Deetox
            </button>
          )}
        </>
      )}
    </div>
  );
}
