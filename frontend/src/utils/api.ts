import type { Property } from "../data/properties";

const API_BASE_URL = import.meta.env.VITE_API_URL || "/api";

export type ApiUser = {
  id: number;
  fullName: string;
  phoneNumber: string;
  email: string;
  createdAt?: string;
};

type AuthResponse = {
  token: string;
  user: ApiUser;
};

type ApiProperty = Omit<Property, "mode" | "category" | "postedDate"> & {
  mode: string;
  category: string;
  postedDate?: string;
};

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = localStorage.getItem("homeNestToken") || sessionStorage.getItem("homeNestToken");
  const headers = new Headers(options.headers);
  headers.set("Content-Type", "application/json");

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  let response: Response;

  try {
    response = await fetch(`${API_BASE_URL}${path}`, { ...options, headers });
  } catch {
    throw new Error("Unable to reach the backend. Start the Spring Boot server and try again.");
  }
  if (!response.ok) {
    const body = await response.json().catch(() => null) as { message?: string } | null;
    throw new Error(body?.message || `Request failed (${response.status})`);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json() as Promise<T>;
}

function saveSession(response: AuthResponse, rememberMe: boolean) {
  localStorage.removeItem("homeNestToken");
  sessionStorage.removeItem("homeNestToken");
  const storage = rememberMe ? localStorage : sessionStorage;
  storage.setItem("homeNestToken", response.token);
  storage.setItem("homeNestCurrentUser", JSON.stringify(response.user));
}

export async function registerUser(input: {
  fullName: string;
  phoneNumber: string;
  email: string;
  password: string;
}): Promise<ApiUser> {
  return request<ApiUser>("/auth/register", {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export async function loginUser(
  email: string,
  password: string,
  rememberMe: boolean,
): Promise<ApiUser> {
  const response = await request<AuthResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
  saveSession(response, rememberMe);
  return response.user;
}

export async function getProperties(filters?: {
  mode?: string;
  category?: string;
  location?: string;
  type?: string;
}): Promise<Property[]> {
  const params = new URLSearchParams();
  Object.entries(filters || {}).forEach(([key, value]) => {
    if (value) params.set(key, value);
  });

  const query = params.toString();
  const response = await request<ApiProperty[]>(`/properties${query ? `?${query}` : ""}`);
  return response.map((property) => ({
    ...property,
    mode: property.mode as Property["mode"],
    category: property.category as Property["category"],
    postedDate: property.postedDate || "",
  }));
}

export function clearApiSession() {
  localStorage.removeItem("homeNestToken");
  sessionStorage.removeItem("homeNestToken");
  localStorage.removeItem("homeNestCurrentUser");
  sessionStorage.removeItem("homeNestCurrentUser");
}
