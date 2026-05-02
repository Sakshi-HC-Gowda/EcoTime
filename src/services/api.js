const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:5000";

async function request(path, { params, method = "GET", body } = {}) {
  const url = new URL(path, API_BASE_URL);

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        url.searchParams.set(key, value);
      }
    });
  }

  const response = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json"
    },
    body: body ? JSON.stringify(body) : undefined
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || `Request failed with status ${response.status}`);
  }

  return response.json();
}

export function getCarbon({ region, interval }) {
  return request("/carbon", { params: { region, interval } });
}

export function getForecast({ region, interval }) {
  return request("/forecast", { params: { region, interval } });
}

export function getBestTime({ region, interval }) {
  return request("/best-time", { params: { region, interval } });
}

export function scheduleTask(task) {
  return request("/schedule-task", { method: "POST", body: task });
}
