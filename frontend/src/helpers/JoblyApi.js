import axios from "axios";
import {jwtDecode} from "jwt-decode"; // ✅ replace jsonwebtoken

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

class JoblyApi {
  // the token for interacting with the API will be stored here.
  static token;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${JoblyApi.token}` };
    const params = (method === "get") ? data : {};

    try {
      const res = await axios({ url, method, data, params, headers });
      return res.data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response?.data?.error?.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  /** Get details on a company by handle. */
  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }

  /** Get list of companies (filtered by name if not undefined) */
  static async getCompanies(name) {
    let res = await this.request("companies", { name });
    return res.companies;
  }

  /** Get list of jobs (filtered by title if not undefined) */
  static async getJobs(title) {
    let res = await this.request("jobs", { title });
    return res.jobs;
  }

  /** Get user data by username */
  static async getCurrentUser(username) {
    let res = await this.request(`users/${username}`);
    return res.user;
  }

  static getCurrentUsername() {
    try {
      const decoded = jwtDecode(JoblyApi.token); // ✅ frontend-safe decode
      console.log("decoded token:", decoded);
      return decoded.username;
    } catch (err) {
      console.log("getCurrentUsername error:", err);
      return null;
    }
  }

  /** Signup for site */
  static async signup(data) {
    let res = await this.request("auth/register", data, "post");
    return res.token;
  }

  /** Login for site */
  static async login(data) {
    let res = await this.request("auth/token", data, "post");
    return res.token;
  }

  /** Save user profile page. */
  static async saveProfile(username, data) {
    let res = await this.request(`users/${username}`, data, "patch");
    return res.user;
  }

  /** Apply to job */
  static async applyToJob(username, jobId) {
    await this.request(`users/${username}/jobs/${jobId}`, {}, "post");
  }
}

export default JoblyApi;
