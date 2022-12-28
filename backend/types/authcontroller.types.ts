interface AuthModel {
  email: string;
  password: string;
}

interface ChangePasswordModel {
  author_email: string;
  oldPassword: string;
  newPassword: string;
}
