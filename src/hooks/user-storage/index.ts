import { User } from "@/types";
import { storageConstants } from "@/types";

export function setStoredUser(user: User): void {
  localStorage.setItem(storageConstants.user, JSON.stringify(user));
}

export function clearStoredUser(): void {
  localStorage.removeItem(storageConstants.user);
}

export function setAccessToken(accessToken: string): void {
  localStorage.setItem(storageConstants.accessToken, accessToken);
}

export function setRefreshToken(refreshToken: string): void {
  localStorage.setItem(storageConstants.refreshToken, refreshToken);
}
