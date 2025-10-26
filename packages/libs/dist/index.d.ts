import { z } from 'zod';

declare const loginSchema: z.ZodObject<{
    username: z.ZodString;
    password: z.ZodString;
    remember: z.ZodDefault<z.ZodBoolean>;
}, z.core.$strip>;

export { loginSchema };
