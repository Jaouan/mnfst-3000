import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
	return (
		<>
			<p className="my-8 text-lg">Whoops! The page doesn&apos;t exist.</p>
			<Button type="button" asChild>
				<Link href="/">Go back home</Link>
			</Button>
		</>
	);
}
