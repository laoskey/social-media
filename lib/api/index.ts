import axios from "axios";

const apiKey = "48620043-4270aeb8286c772a6a042e24c";

const apiUrl = `https://pixabay.com/api/?key=${apiKey}`;

const formatUrl = (params: any) => {
  let url = apiUrl + "&per_page=25&safesearch=true&editors_choice=true";
  if (!params || typeof params !== "object") {
    return url;
  }
  let paramKeys = Object.keys(params);

  paramKeys.forEach((key) => {
    let value = key == "q" ? encodeURIComponent(params[key]) : params[key];
    url += `&${key}=${value}`;
  });

  // console.log("final url", url);
  return url;
};
export const apiCall = async (params: any) => {
  try {
    const res = await axios.get(formatUrl(params));
    const { data } = res;
    return { success: true, data };
  } catch (error: any) {
    console.log("pixels got error", error.message);
    return { success: false, msg: error.message };
  }
};
