export interface login {
  email: string;
  password: string;
}

export interface Tokens {
  access: string;
  refresh: string;
}

export interface Register {
  name: string;
  username: string;
  email: string;
  phone: string;
  city: string;
  website: string;
}
