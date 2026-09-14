type CurrentUser = {
  id: number;
  fullName: string;
  phoneNumber: string;
  email: string;
  city?: string;
};

export function getCurrentUser(): CurrentUser | null {
  const localUser = localStorage.getItem(
    "homeNestCurrentUser"
  );

  if (localUser) {
    try {
      return JSON.parse(localUser) as CurrentUser;
    } catch {
      localStorage.removeItem(
        "homeNestCurrentUser"
      );
    }
  }

  const sessionUser = sessionStorage.getItem(
    "homeNestCurrentUser"
  );

  if (sessionUser) {
    try {
      return JSON.parse(sessionUser) as CurrentUser;
    } catch {
      sessionStorage.removeItem(
        "homeNestCurrentUser"
      );
    }
  }

  return null;
}

export function getCurrentUserId(): number | null {
  return getCurrentUser()?.id ?? null;
}

export function getUserStorageKey(
  baseKey: string
): string {
  const userId = getCurrentUserId();

  if (userId === null) {
    return baseKey;
  }

  return `${baseKey}_${userId}`;
}

export function getUserStorageItem<T>(
  baseKey: string,
  fallback: T
): T {
  const key = getUserStorageKey(baseKey);

  const stored = localStorage.getItem(key);

  if (!stored) {
    return fallback;
  }

  try {
    return JSON.parse(stored) as T;
  } catch {
    return fallback;
  }
}

export function setUserStorageItem<T>(
  baseKey: string,
  value: T
) {
  const key = getUserStorageKey(baseKey);

  localStorage.setItem(
    key,
    JSON.stringify(value)
  );
}