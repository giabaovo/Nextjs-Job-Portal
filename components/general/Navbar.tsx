import Link from "next/link";
import Logo from "@/public/logo-2.png"
import Image from "next/image";
import {Button, buttonVariants} from "@/components/ui/button";
import {ThemeToggle} from "@/components/general/ThemeToggle";
import {auth, signOut} from "@/app/utils/auth";

export async function Navbar() {

    const session = await auth()

    return (
        <nav className="flex items-center justify-between py-5">
            {/* Left side */}
            <Link href="/" className="flex items-center gap-2">
                <Image src={Logo} alt="Job Portal" width={40} height={40}/>
                <h1 className="text-2xl font-bold">Job<span className="text-primary">Portal</span></h1>
            </Link>

            {/* Right side */}
            <div className="flex items-center gap-4">
                <ThemeToggle/>
                {session?.user ? (
                    <form action={async () => {
                        "use server"
                        await signOut({redirectTo: '/'})
                    }}>
                        <Button>Logout</Button>
                    </form>
                ) : <Link
                    href="/login"
                    className={buttonVariants({variant: "outline", size: "lg"})}
                >
                    Login
                </Link>}
            </div>
        </nav>
    )
}