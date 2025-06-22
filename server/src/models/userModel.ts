import User from "../db/schemas/userSchema"

type saveProps = {
  email: String;
  password: String;
};

class UserModel {

   // Save user
  async save(userData: saveProps) {
    try {
      const user = new User(userData);
      return await user.save();
    } catch (error:any) {
      console.error("Error saving user:", error.message);
      throw error;
    }
  }

  // Find user by email
  async findByEmail(email:string) {
    try {
      return await User.findOne({ email });
    } catch (error:any) {
      console.error(`Error fetching user with email ${email}:`, error.message);
      throw error;
    }
  }
}

export default UserModel;