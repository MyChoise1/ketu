// Function to hash a password using SHA-256
async function hashPassword(password) {
  const encoder = new TextEncoder();
  const passwordBytes = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest("SHA-256", passwordBytes);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
  return hashHex;
}

// Function to compare a plaintext password with its hashed equivalent
async function comparePassword(password, hashedPassword) {
  const hashedInput = await hashPassword(password);
  return hashedInput === hashedPassword;
}
