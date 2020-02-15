import jwt from 'jsonwebtoken';

const getUserDetails = () => {
  const token = localStorage.getItem('token');
  if (!token) {
    return {};
  }

  const { userId, email, role, team } = jwt.decode(token);
  return { userId, email, role, team };
};

export { getUserDetails };
