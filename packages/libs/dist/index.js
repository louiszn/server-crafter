// src/schemas/login.ts
import { z } from "zod";
var loginSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
  remember: z.boolean().default(false)
});
export {
  loginSchema
};
//# sourceMappingURL=index.js.map