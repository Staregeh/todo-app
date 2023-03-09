import axios from "axios";

class HttpService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = process.env.REACT_APP_SERVER_URL ?? "";
  }

  async get<T>(url: string): Promise<T> {
    const fullUrl = `${this.baseUrl}/${url}`;
    const response = await axios.get<T>(fullUrl);
    return response.data;
  }

  async post<T>(url: string, data: T): Promise<T> {
    const fullUrl = `${this.baseUrl}/${url}`;
    const response = await axios.post<T>(fullUrl, data);
    return response.data;
  }

  async put<T>(url: string, data: T): Promise<T> {
    const fullUrl = `${this.baseUrl}/${url}`;
    const response = await axios.put<T>(fullUrl, data);
    return response.data;
  }

  async delete<T>(url: string): Promise<T> {
    const fullUrl = `${this.baseUrl}/${url}`;
    const response = await axios.delete<T>(fullUrl);
    return response.data;
  }
}
export class HttpServiceAuth {
  private baseUrl: string;
  private token: string | null;

  constructor() {
    this.baseUrl = process.env.REACT_APP_SERVER_URL ?? "";
    this.token = localStorage.getItem("JWT");
  }

  async get<T>(url: string): Promise<T> {
    const fullUrl = `${this.baseUrl}/${url}`;
    const response = await axios.get<T>(fullUrl, {
      headers: { Authorization: `Bearer ${this.token}` },
    });
    return response.data;
  }

  async post<T>(url: string, data: T): Promise<T> {
    const fullUrl = `${this.baseUrl}/${url}`;
    const response = await axios.post<T>(fullUrl, data, {
      headers: { Authorization: `Bearer ${this.token}` },
    });
    return response.data;
  }

  async put<T>(url: string, data: T): Promise<T> {
    const fullUrl = `${this.baseUrl}/${url}`;
    const response = await axios.put<T>(fullUrl, data, {
      headers: { Authorization: `Bearer ${this.token}` },
    });
    return response.data;
  }

  async delete<T>(url: string): Promise<T> {
    const fullUrl = `${this.baseUrl}/${url}`;
    const response = await axios.delete<T>(fullUrl, {
      headers: { Authorization: `Bearer ${this.token}` },
    });
    return response.data;
  }
}

export default HttpService;
