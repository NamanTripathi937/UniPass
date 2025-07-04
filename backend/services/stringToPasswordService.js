const crypto = require('crypto');

const strToPass = async (string, userPassword) => {
  try {
    // Extract parts of the string as before
    const str1 = string.slice(0, 10);
    const str2 = string.slice(10);
    const concatStringtoUserPassword = str1 + userPassword + str2;

    // Generate a salt - this should be unique per user and stored
    const salt = crypto.randomBytes(16).toString('hex');
    
    // PBKDF2 parameters
    const iterations = 100000; // Slows down brute force attempts
    const keylen = 32; // 32 bytes = 256 bits
    const digest = 'sha256';
    
    // Hash the password
    const hashedPassword = crypto.pbkdf2Sync(
      concatStringtoUserPassword,
      salt,
      iterations,
      keylen,
      digest
    ).toString('hex');

    // You may want to store the salt along with the hashed password
    // For your current structure, we'll keep the same output format
    const newPassword = 
      hashedPassword.slice(0, 5) +
      hashedPassword.slice(10, 15) +
      hashedPassword.slice(-6);
    
    return newPassword;
  } catch (err) {
    console.error('Error in password generation:', err);
    throw err; // Re-throw to handle in calling function
  }
};

module.exports = strToPass;