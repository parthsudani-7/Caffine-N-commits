const BASE_URL = "http://localhost:5000/api";

let users = [];

const setToken = (token) => localStorage.setItem("token", token);
const getToken = () => localStorage.getItem("token");

const safeFetch = async (url, options, fallback) => {
  try {
    const res = await fetch(url, options);

    if (!res.ok) throw new Error("Backend error");

    return await res.json();
  } catch (err) {
    console.log("⚠️ Using MOCK API");
    return fallback();
  }
};

export const loginUser = async (phone, password) => {
  return safeFetch(
    `${BASE_URL}/login`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone, password })
    },
    async () => {
      await new Promise((r) => setTimeout(r, 300));

      const user = users.find(
        (u) => u.phone === phone && u.password === password
      );

      if (user) {
        setToken("mock_token");
        return { success: true };
      }

      return { success: false };
    }
  );
};

export const signupUser = async (name, phone, password) => {
  return safeFetch(
    `${BASE_URL}/signup`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, phone, password })
    },
    async () => {
      await new Promise((r) => setTimeout(r, 300));

      const exists = users.find((u) => u.phone === phone);

      if (exists) return { success: false };

      users.push({ name, phone, password });

      return { success: true };
    }
  );
};

export const getProfile = async () => {
  return safeFetch(
    `${BASE_URL}/profile`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    },
    async () => {
      await new Promise((r) => setTimeout(r, 300));

      if (!getToken()) return { success: false };

      return {
        success: true,
        user: users[users.length - 1] || {
          name: "Demo User",
          phone: "0000000000"
        }
      };
    }
  );
};