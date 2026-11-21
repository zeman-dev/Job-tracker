import Link from "next/link";
import LoginClient from "@/app/login/Login.client";

export default function Login(){
    return(
        <main className="flex flex-1 justify-center px-4 py-[72px]">
            <div className="w-full max-w-[400px] rounded-2xl border border-slate-200 bg-white p-8">
                <h1 className="mb-1 text-[22px] font-semibold text-slate-900">Welcome back</h1>
                <p className="mb-6 text-sm text-slate-600">Log in to track your applications.</p>

                <LoginClient/>

                <p className="mt-5 text-center text-[13px] text-slate-600">
                    No account yet?{" "}
                    <Link href="/register" className="font-medium text-blue-700 hover:underline">
                        Create one
                    </Link>
                </p>
            </div>
        </main>
    )
}
