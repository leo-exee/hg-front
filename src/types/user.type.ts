export interface UserDTO {
  id: string;
  username: string;
  email: string;
  password: string;
  dateCreated: string;
  lastModified: string;
}

export interface LoginDTO {
  email: string;
  password: string;
}

export interface RegisterDTO {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface AuthDTO extends UserDTO {
  token: string;
}
