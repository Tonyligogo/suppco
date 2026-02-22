import { signIn, signOut } from "next-auth/react";
export async function signInUser(data) {
  try {
    const result = await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    // NextAuth returns an object with an 'error' property if it fails
    if (result?.error) {
      return { success: false, error: result.error };
    }

    return { success: true };
  } catch (error) {
    // This catches execution errors (network issues, etc.)
    return { success: false, error: 'UnexpectedError' };
  }
}

export async function signOutUser() {
  await signOut({ redirectTo: "/" });
}