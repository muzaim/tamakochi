import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useState, useContext } from "react";
import { UserContext } from "../../UserContext";
import axios from "axios";
import Cookies from "js-cookie";
import bg7 from "../../../img/loading.webp";
import bg2 from "../../../img/farmCultivature.webp";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useEffect } from "react";
const MySwal = withReactContent(Swal);

const eye = <FontAwesomeIcon icon={faEye} />;
const eyeSlash = <FontAwesomeIcon icon={faEyeSlash} />;

const FormLogin = ({
  goToPage2,
  goToPage6,
  goToMenu,
  playGoBackSound,
  playPop1,
  playSuccessSound,
  playNegativeSound,
  playSelectSound,
  playWarningSound,
  goToFormForgotPassword,
}) => {
  const { setUserLogin, setValue } = useContext(UserContext);
  const [dataLogin, setDataLogin] = useState({
    username: "",
    password: "",
  });

  const [passwordShown, setPasswordShown] = useState(false);

  const changeHandler = (e) => {
    setDataLogin({ ...dataLogin, [e.target.name]: e.target.value });
  };

  const EnterHandler = (e) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };

  const togglePasswordVisiblity = (e) => {
    e.preventDefault();
    playPop1();
    setPasswordShown(passwordShown ? false : true);
  };

  // LOGIN
  const handleSubmit = async (e) => {
    e.preventDefault();
    playPop1();
    const formData = new FormData();
    formData.append("username", dataLogin.username);
    formData.append("password", dataLogin.password);

    //if empty
    if (dataLogin.username === "" || dataLogin.password === "") {
      playNegativeSound();
      MySwal.fire({
        position: "center",
        icon: "error",
        text: "Username & Password tidak boleh kosong!",
        showConfirmButton: false,
        timer: 1500,
      });
      setDataLogin({
        username: "",
        password: "",
      });
      return;
    }

    // login
    try {
      let res = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/login`,
        formData
      );
      let data = res.data;
      // var inFifteenMinutes = new Date(new Date().getTime() + 0.1 * 60 * 1000);
      Cookies.set("user", data.token, { expires: 1 });
      // is tutorial
      try {
        let userInfo = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/user-info`,
          {
            params: {
              token: data.token,
            },
          }
        );
        let dataUser = userInfo.data.Data;
        setUserLogin(dataUser.user_active);
        setValue(dataUser.user_wallet);
        playSuccessSound();
        MySwal.fire({
          position: "center",
          icon: "success",
          text: "Login Success",
          showConfirmButton: false,
          timer: 1500,
        }).then(
          setTimeout(() => {
            if (dataUser.user_active.active_tutor === "0") {
              goToPage6();
            } else {
              goToPage2();
              // window.location.reload();
            }
            // return play();
          }, 1700)
        );
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      playNegativeSound();
      MySwal.fire({
        position: "center",
        icon: "error",
        text: "Wrong username or password!",
        showConfirmButton: false,
        timer: 1500,
      });

      setDataLogin({
        username: "",
        password: "",
      });
    }
  };
  useEffect(() => {
    let imageList = [bg7, bg2];
    imageList.forEach((image) => {
      new Image().src = image;
    });
  });
  return (
    <div className="w-full h-full overflow-hidden bg-farmBarn bg-cover mx-auto lg:max-w-6xl lg:h-[70%] z-50">
      <div className="h-full">
        <div className="flex h-full items-end justify-center pb-5 ">
          <div className="w-full h-full  flex items-center animate-fadeInKu">
            <div className="w-[40%] h-52 mx-auto">
              <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <input
                  name="username"
                  type="text"
                  value={dataLogin.username}
                  onChange={changeHandler}
                  placeholder="Username"
                  className="h-10 rounded-lg px-3 outline-pink-500 outline-offset-5 outline-5"
                  onFocus={(e) => {
                    playSelectSound();
                  }}
                />
                <div className="pass-wrapper bg-white rounded-lg">
                  <input
                    type={passwordShown ? "text" : "password"}
                    onChange={changeHandler}
                    onFocus={playSelectSound}
                    value={dataLogin.password}
                    name="password"
                    placeholder="Password"
                    className="h-10 rounded-lg px-3 w-full  outline-pink-500 outline-offset-5 outline-5"
                    onKeyPress={(e) => EnterHandler(e)}
                  />
                  <i
                    className="text-[#00fcb6]"
                    onClick={togglePasswordVisiblity}
                  >
                    {passwordShown ? eyeSlash : eye}
                  </i>
                </div>
                <div className="w-full h-full flex">
                  <div className="block mx-auto h-14 w-28 bg-gradient-to-r from-pink-400 to-red-500 rounded-full uppercase tracking-[0.15rem] font-extrabold text-white font-openSans active:bg-[#ffffff] group">
                    <button
                      className="group-active:text-[#5e17eb]  w-full h-full items-center tracking-widest"
                      type="button"
                      onClick={() => {
                        playGoBackSound();
                        goToMenu();
                      }}
                    >
                      Back
                    </button>
                  </div>

                  <div className="block mx-auto h-14 w-28 bg-gradient-to-r from-green-400 to-blue-500 rounded-full uppercase tracking-[0.15rem] font-extrabold text-white font-openSans active:bg-[#ffffff] group">
                    <button
                      className="group-active:text-[#5e17eb]  w-full h-full items-center tracking-widest"
                      type="submit"
                    >
                      Login
                    </button>
                  </div>
                </div>
                <div className="w-full h-full ">
                  <div className="flex justify-center  tracking-[0.15rem]  text-white font-openSans">
                    Lupa Password?
                    <span className=" capitalize group">
                      <span
                        onClick={() => {
                          playPop1();
                          goToFormForgotPassword();
                        }}
                        className="ml-1 group-active:text-[#5e17eb] font-semibold"
                      >
                        Sini
                      </span>
                    </span>
                  </div>
                </div>
              </form>
            </div>
          </div>{" "}
        </div>
      </div>
    </div>
  );
};
export default FormLogin;
