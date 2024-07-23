import Image from "next/image";
import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setCookie } from "cookies-next";
import toast from "react-hot-toast";
import { useGoogleLogin } from "@react-oauth/google";
import { setAuthState } from "@/redux/features/authSlice";
import { getUserFromToken } from "@/lib/userInfo";
import GoogleLogo from "@/assets/google_logo.png";
import WhatsappLogo from "@/assets/whatsapp_logo.png";
import Loader from "../Loader";

export default function ThirdPartyLogin() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const handleWhatsAppLogin = () => {
    console.log("Whats app login called");
  };

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: (credentialResponse) => {
      const token = credentialResponse.access_token;
      getUserFromGoogleToken(token);
    },
    onError: () => {
      toast.error("Try again later");
    },
  });

  const getUserFromGoogleToken = async (access_token) => {
    setIsLoading(true);
    const user_info_url = "https://www.googleapis.com/oauth2/v3/userinfo";
    const headers = {
      Authorization: `Bearer ${access_token}`,
    };
    try {
      const { data } = await axios.get(user_info_url, { headers });
      googleLogin(data);
    } catch (error) {
      toast.error("Try again later");
    }
  };

  const googleLogin = async (user) => {
    let data = JSON.stringify({
      name: user.name,
      email: user.email,
      profileImg: user.picture,
      loggedWith: "Google",
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${process.env.API_URL}/api/user/loginWithGoogle`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    try {
      const { data } = await axios.request(config);
      const token = data;
      setCookie("token", token);
      const user = await getUserFromToken();
      dispatch(setAuthState({ authState: true, user: user }));
      toast.success("Login Successful");
    } catch (error) {
      toast.error("Try again later");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <p className="text-center mt-2 text-xs">or Login via</p>
      <div className="flex gap-6 mt-2 justify-center">
        <div onClick={handleGoogleLogin}>
          <Image
            src={GoogleLogo}
            alt=""
            height={40}
            width={40}
            className="cursor-pointer"
            priority
          />
        </div>
        <div onClick={handleWhatsAppLogin}>
          <Image
            src={WhatsappLogo}
            alt=""
            height={40}
            width={40}
            className="cursor-pointer"
            priority
          />
        </div>
      </div>
      <Loader modalIsOpen={isLoading} />
    </>
  );
}
