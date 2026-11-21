import Link from "next/link";
import RegisterClient from "./Register.client";

export default function Register(){
    return(
        <main className="flex flex-1 justify-center px-4 py-[72px]">
            <div className="w-full max-w-[400px] rounded-2xl border border-slate-200 bg-white p-8">
                <h1 className="mb-1 text-[22px] font-semibold text-slate-900">Welcome</h1>
                <p className="mb-6 text-sm text-slate-600">Register to track your applications.</p>

                <RegisterClient/>

                <p className="mt-5 text-center text-[13px] text-slate-600">
                    Already have account?{" "}
                    <Link href="/login" className="font-medium text-blue-700 hover:underline">
                        Login
                    </Link>
                </p>
            </div>
        </main>
    )
}