import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
	return (
		<div className="flex min-h-screen items-center justify-center font-sans dark:bg-black">
			<Button className="cursor-pointer">Hello world</Button>
		</div>
	);
}
