const BASE_URL = "http://localhost:3001";

async function request(endpoint, data = {}, method = "get") {
  const url = `${BASE_URL}/${endpoint}`;
  const headers = { Authorization: `Bearer ${localStorage.getItem("token")}` };
  let response;

  if (method === "get") {
    response = await fetch(url, { headers });
  } else {
    response = await fetch(url, {
      method,
      headers: {
        ...headers,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
  }

  const result = await response.json();
  if (!response.ok) throw result.error;
  return result;
}

export default {
  login: (data) => request("auth/token", data, "post"),
  signup: (data) => request("auth/register", data, "post"),
  getCompanies: () => request("companies"),
  getCompany: (handle) => request(`companies/${handle}`),
  getJobs: () => request("jobs"),
  applyToJob: (username, id) => request(`users/${username}/jobs/${id}`, {}, "post"),
  getUser: (username) => request(`users/${username}`),
  updateUser: (username, data) => request(`users/${username}`, data, "patch")
};
