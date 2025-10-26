"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { loginSchema } from "@sc/libs";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { APIRoute, REST } from "@sc/rest";
import { toast } from "sonner";

type LoginData = z.infer<typeof loginSchema>;

export default function LoginPage() {
	const {
		register,
		handleSubmit,
		formState: { errors },
		setError,
	} = useForm({
		resolver: zodResolver(loginSchema),
		mode: "onChange",
	});

	const onSubmit: SubmitHandler<LoginData> = async (data) => {
		const [, error] = await REST.post<null, LoginData>(APIRoute.Login, data);

		if (error) {
			if (Array.isArray(error.error)) {
				for (const target of error.error) {
					setError(target.path.join(".") as never, {
						message: target.message,
					});
				}
			} else {
				toast.error(typeof error.error === "string" ? error.error : "Unknown error");
			}
		}
	};

	return (
		<div className="flex justify-center items-center min-h-screen w-full">
			<Card className="w-[90%] lg:w-[30%]">
				<CardHeader>
					<CardTitle className="text-2xl font-semibold">Login</CardTitle>
				</CardHeader>

				<form onSubmit={handleSubmit(onSubmit)}>
					<CardContent className="grid gap-4">
						<div className="grid gap-3">
							<Label>Username</Label>
							<Input type="text" placeholder="superuser" {...register("username")} />
							{errors.username && <span>{errors.username.message}</span>}
						</div>

						<div className="grid gap-3">
							<Label>Password</Label>
							<Input type="password" placeholder="" {...register("password")} />
							{errors.password && <span>{errors.password.message}</span>}
						</div>

						<div className="flex items-center w-full gap-2">
							<Input type="checkbox" className="w-5" {...register("remember")} />
							<Label>Remember me?</Label>
						</div>

						<Button type="submit" className="cursor-pointer">
							Submit
						</Button>
					</CardContent>
				</form>
			</Card>
		</div>
	);
}
