// src/application/use-cases/loginUser.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const loginUser = async ({ email, password }, { userRepository, config }) => {
  // Find the user by email
  const user = await userRepository.findByEmail(email);

  if (!user) {
    throw new Error('Invalid email or password');
  }

  // Compare the provided password with the stored hashed password
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error('Invalid email or password');
  }


  const payload = {
    userId: user.id,
    email: user.email,
  };

  const token = jwt.sign({ data: 'payload' }, process.env.JWT_SECRET, { expiresIn: '1h' });

  return { token, user };
};

module.exports = loginUser;
