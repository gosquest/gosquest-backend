import bcryptjs from 'bcryptjs';

export const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 10; 
  try {
    const hashedPassword = await bcryptjs.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    throw new Error('Password hashing failed');
  }
};