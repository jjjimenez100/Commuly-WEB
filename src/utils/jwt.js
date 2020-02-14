import jwt from 'jsonwebtoken';

const getUserDetails = () => {
  const token = localStorage.getItem('token');
  if (!token) {
    return {};
  }

  const { userId, email, role } = jwt.decode(token);
  return { userId, email, role };
};

export { getUserDetails };
