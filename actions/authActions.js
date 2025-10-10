'use server';
import { signIn, signOut } from "@/auth";

export async function signInUser(data) {
  try {
    await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false,
    });
    return { success:true};
} catch (error) {
    if (error.type === 'CredentialsSignin') {
      return { error: 'Invalid email or password.' };
    }
    throw error;
}
}

export async function signOutUser() {
  await signOut({ redirectTo: "/" });
}