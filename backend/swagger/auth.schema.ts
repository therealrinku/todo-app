export const changePasswordSchema = {
  schema: {
    properties: {
      oldPassword: { type: 'string' },
      newPassword: { type: 'string' },
    },
  },
  required: true,
};

export const signupSchema = {
  schema: {
    properties: {
      email: { type: 'string' },
      password: { type: 'string' },
    },
  },
  required: true,
};

export const loginSchema = {
  schema: {
    properties: {
      email: { type: 'string' },
      password: { type: 'string' },
    },
  },
  required: true,
};
