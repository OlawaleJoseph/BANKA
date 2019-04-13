import bcrypt from 'bcrypt';
import '@babel/polyfill'

const hashPassword = async (password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return hashedPassword;
};

export default hashPassword;
