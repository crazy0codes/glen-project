import bcrypt from "bcryptjs";

// Generate bcryptjs hash
export const generateHash = async (input:string, saltRounds = 10) => {
  try {
    const hash = bcrypt.hash(input, saltRounds);
    return hash;
  } catch (error) {
    console.error("Error in hash generation:", error);
    throw new Error("Hash generation failed");
  }
};

// Compare a plain text input with a hashed value
export const compareHash = async (input:string, hash:string) => {
  try {
    const match = await bcrypt.compare(input, hash);
    return match;
  } catch (error) {
    console.error("Error in hash comparison:", error);
    throw new Error("Hash comparison failed");
  }
};

// Generate a salt value
export const generateSalt = async (saltRounds = 10) => {
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    return salt;
  } catch (error) {
    console.error("Error in salt generation:", error);
    throw new Error("Salt generation failed");
  }
};
