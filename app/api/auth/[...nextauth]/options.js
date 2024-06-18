// Import the CredentialsProvider from next-auth for handling authentication with credentials
import CredentialsProvider from "next-auth/providers/credentials";
// Import bcrypt for hashing passwords
import bcrypt from "bcrypt";
// Import a function to connect to the database
import { connect } from "@/dbConfig/dbConfig";
// Import the User model
import User from "@/models/userModel";

// Define the authentication options
export const authOptions = {
  // Define the providers, here we're using CredentialsProvider for email and password authentication
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      // Function to authorize the user
      async authorize(credentials) {
        // Connect to the database
        await connect();
        try {
          // Find the user by email or username
          const user = await User.findOne({
            $or: [
              { email: credentials.email },
              { username: credentials.username },
            ],
          });
          // Log the user information for debugging
          // console.log(user);

          // If no user is found, throw an error
          if (!user) {
            throw new Error("No user found with this email");
          }

          // Compare the provided password with the stored hashed password
          const isPasswordCorrect = await bcrypt.compare(
            credentials.password,
            user.password
          );

          // If the password is correct, return the user object
          if (isPasswordCorrect) {
            return user;
          } else {
            // If the password is incorrect, throw an error
            throw new Error("Incorrect password");
          }
        } catch (err) {
          // Throw any errors encountered during the process
          throw new Error(err);
        }
      },
    }),
  ],
  // Define callbacks for handling JWT and session data
  callbacks: {
    // Function to handle JWT token
    async jwt({ token, user }) {
      // If a user object is provided, add user information to the token
      if (user) {
        token._id = user._id?.toString(); // Convert ObjectId to string
        token.isAcceptingMessages = user.isAcceptingMessages;
        token.username = user.username;
      }
      return token; // Return the token with added information
    },
    // Function to handle session data
    async session({ session, token }) {
      // If a token is provided, add token information to the session user object
      if (token) {
        session.user._id = token._id;
        session.user.isAcceptingMessages = token.isAcceptingMessages;
        session.user.username = token.username;
      }
      return session; // Return the session with added information
    },
  },
  // Define session management strategy, using JWT in this case
  session: {
    strategy: "jwt",
  },
  // Secret used for signing the JWT
  secret: process.env.NEXTAUTH_SECRET,
  // Define custom pages for authentication, e.g., the sign-in page
  pages: {
    signIn: "/sign-in",
  },
};
