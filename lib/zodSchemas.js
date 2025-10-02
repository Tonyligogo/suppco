import * as z from "zod"
 
export const signInSchema = z.object({
  email: z
  .email("Invalid email"),
  password: z.string({ required_error: "Password is required" })
    .min(1, "Password is required")
    .max(32, "Password must be less than 32 characters"),
})