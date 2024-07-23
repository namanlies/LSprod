import axios from "axios";
import { getCookie } from "cookies-next";

export const getUserFromToken = async () => {
  const token = getCookie("token");
  try {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${process.env.API_URL}/api/user/getUserByToken`,
      headers: { Authorization: `Bearer ${token}` },
    };
    const { data } = await axios.request(config);
    if (data.success) {
      return data.userData;
    } else {
      throw new Error({ msg: "fail" });
    }
  } catch (error) {
    throw new Error({ msg: "fail" });
  }
};
