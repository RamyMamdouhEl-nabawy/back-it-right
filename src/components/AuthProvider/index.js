import axios from "axios";

export async function authenticateUser(formData) {
  const userLogin = await axios({
    method: "post",
    url: "http://backitright.pythonanywhere.com/api/token/",
    data: formData,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      // "Access-Control-Allow-Origin": "*",
    },
  });

  localStorage.setItem("token", userLogin.data.access);
  localStorage.setItem("refreshToken", userLogin.data.refresh);
}

export async function getAccessToken() {
  localStorage.setItem("token", "");
  const newToken = await axios({
    method: "post",
    url: "http://backitright.pythonanywhere.com/api/token/refresh/",
    data: { refresh: localStorage.getItem("refreshToken") },
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
    },
  });

  return localStorage.setItem("token", newToken.data.access);
}

export default {
  authenticateUser,
  getAccessToken,
};
