export type AuthUser = {
  email: string;
  uid: string;
};

export type AuthCredentials = {
  email: string;
  password: string;
};

export type RegisterCredentials = AuthCredentials & {
  confirmPassword: string;
};
