import React, { useContext, useState } from "react";
import { AuthContext } from "../../authProvider/AuthProvider";

const PasswordResetModal = () => {
  const [email, setEmail] = useState("");
  const { user, resetPass } = useContext(AuthContext);

  const handleSubmit = () => {
    resetPass(email).then((res) => {
      console.log(res);
    });
  };

  return (
    <div>
      <p
        onClick={() => document.getElementById("my_modal_1").showModal()}
        className=" cursor-pointer text-center text-sm text-textColor mt-3"
      >
        Forget Password?
      </p>

      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <div>
            <input
              className="block modalField mb-3 "
              type="text"
              onChange={(e) => setEmail(e.target.value)}
            />{" "}
            <button
              className="buttonOrange  px-5 py-2 rounded-lg"
              onClick={handleSubmit}
            >
              submit
            </button>
            <div className="modal-action">
              <form method="dialog">
                <button className="btn text-white btn-sm btn-accent">
                  Close
                </button>
              </form>
            </div>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default PasswordResetModal;
