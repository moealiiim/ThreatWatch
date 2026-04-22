import {
  User,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail as firebaseSendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut
} from "firebase/auth";

import { getFirebaseAuth, isFirebaseConfigured } from "./firebase";
import { AuthCredentials, AuthUser, RegisterCredentials } from "../types/auth";

const getAuthOrThrow = () => {
  const auth = getFirebaseAuth();
  if (!auth || !isFirebaseConfigured()) {
    throw new Error("Firebase is not configured. Add your .env keys and restart the app.");
  }
  return auth;
};

const mapUser = (user: User): AuthUser => ({
  email: user.email ?? "unknown",
  uid: user.uid
});

const mapAuthError = (error: unknown): string => {
  if (!(error instanceof Error)) return "Something went wrong. Please try again.";
  const msg = error.message;
  if (
    msg.includes("auth/invalid-credential") ||
    msg.includes("auth/user-not-found") ||
    msg.includes("auth/wrong-password") ||
    msg.includes("auth/invalid-login-credentials")
  ) {
    return "Wrong email or password.";
  }
  if (msg.includes("auth/email-already-in-use")) return "This email is already registered.";
  if (msg.includes("auth/invalid-email")) return "Please enter a valid email address.";
  if (msg.includes("auth/too-many-requests")) return "Too many attempts. Please wait and try again.";
  if (msg.includes("auth/weak-password")) return "Password must be at least 6 characters.";
  return msg;
};

export const loginUser = async (credentials: AuthCredentials): Promise<AuthUser> => {
  try {
    const auth = getAuthOrThrow();
    const result = await signInWithEmailAndPassword(auth, credentials.email.trim(), credentials.password);
    return mapUser(result.user);
  } catch (error) {
    throw new Error(mapAuthError(error));
  }
};

export const registerUser = async (credentials: RegisterCredentials): Promise<AuthUser> => {
  try {
    const auth = getAuthOrThrow();
    const result = await createUserWithEmailAndPassword(auth, credentials.email.trim(), credentials.password);
    return mapUser(result.user);
  } catch (error) {
    throw new Error(mapAuthError(error));
  }
};

export const sendPasswordResetEmail = async (email: string): Promise<void> => {
  try {
    const auth = getAuthOrThrow();
    await firebaseSendPasswordResetEmail(auth, email.trim());
  } catch (error) {
    throw new Error(mapAuthError(error));
  }
};

export const subscribeToAuthChanges = (callback: (user: AuthUser | null) => void): (() => void) => {
  const auth = getFirebaseAuth();
  if (!auth) {
    callback(null);
    return () => undefined;
  }
  return onAuthStateChanged(auth, (user) => {
    callback(user ? mapUser(user) : null);
  });
};

export const logoutUser = async (): Promise<void> => {
  try {
    const auth = getAuthOrThrow();
    await signOut(auth);
  } catch (error) {
    throw new Error(mapAuthError(error));
  }
};
