import axios from "axios";

const fetchData = async () => {
  const accessToken = localStorage.getItem("accessToken");

  if (!accessToken) {
    console.error("No access token found");
    return;
  }

  try {
    const response = await axios.get(
      "http://ec2-18-116-81-21.us-east-2.compute.amazonaws.com:8080/oauth2/authorization/google",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    console.log("데이터:", response.data);
  } catch (error) {
    console.error("API 요청 오류:", error);
  }
};

export default fetchData;
