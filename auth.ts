import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";
import { authOptions } from "./auth.config";

async function refreshAccessToken(token: JWT) {
  console.log("refreshing access token");

  try {
    const url = "";
    // const response = await fetch(url, {
    //   headers: {
    //     "Content-type": "application/json",
    //   },
    //   method: "POST",
    //   body: JSON.stringify({
    //     refreshToken: token.refreshToken,
    //   }),
    // });
    //const refreshedTokens = await response.json();

    // if (!response.ok) {
    //   throw refreshedTokens;
    // }
    console.log("refreshed access tokens");
    const refreshedTokens = {
      access_token: "new",
      expires: 10000,
      refresh_token: "new",
    }
    console.log(refreshedTokens);
    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      accessTokenExpires: Date.now() + refreshedTokens.expires,
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken, //fallback to old refresh token
    };
  } catch (err) {
    console.log(err);
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  session: {
    strategy: "jwt",
    maxAge: 30000, // 10 secs
    updateAge: 20, // 10 secs
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      return true;
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      else if (new URL(url).origin === baseUrl) return url;
      // return url.startsWith(baseUrl)?url:baseUrl
      return baseUrl;
    },
    async jwt({ token, user, trigger, account, session }): Promise<JWT> {
      if (trigger === "update" && session?.name) {
        // Note, that `session` can be any arbitrary object, remember to validate it!
        token.name = session.name;
      }
      if (account  && user) {
        token.userId = account.providerAccountId;

        //add accessand refresh toke to user object
        return {
          ...token,
          accessToken: user.access_token,
          refreshToken: user.refresh_token,
          accessTokenExpires: Date.now() + user.expires_at,
        };
      }
      if (Date.now() < token.expires_at) {
        return token;
      }
      console.log("Access token has expired trying to refresh it");
      return refreshAccessToken(token);
    },
    async session({ session, token, user }) {
      session.accessToken = token.access_token;
      session.refreshToken = token.refresh_token;
      session.expires_at = token.expires_at;
      session.user.id = token.userId;

      //get the user

      return session;
    },
  },
  events: {
    async signIn({ user, account, profile, isNewUser }) {},
    async signOut(message) {},
    async updateUser({ user }) {},
    async createUser({ user }) {},
    async linkAccount({ user, account, profile }) {},
    async session({ session }) {},
  },
  pages: {
    signIn: "/login",
  },
  ...authOptions,
});
