
import { Mail, Lock } from "lucide-react";

import Link from "next/link";
import MotionButton from "@/app/components/login-page/MotionButton";
import {login} from "@/app/lib/api-client";

// This is where you define the form submission action.




export default async function LoginForm() {
    return (
        <form action={login}  className="flex flex-col gap-6 md:gap-10">
            <div className="space-y-2">
                <h1 className="text-3xl font-bold text-white">Welcome Back!</h1>
                <p className="text-gray-300 text-sm">
                    Access your account and continue managing your projects effortlessly
                </p>
            </div>

            {/* Handle server-side errors */}
            <div className="space-y-4">
                <InputField
                    type="email"
                    placeholder="Email"
                    name="email"
                    icon={<Mail />}
                />
                <PasswordField
                    name="password"
                    icon={<Lock />}
                />
                <div className="text-right">
                    <Link href="/forgot-password" className="text-[#6C63FF] text-sm hover:underline">
                        Forgot Password?
                    </Link>
                </div>

                <div className="flex items-center space-x-2">
                    <input
                        type="checkbox"
                        id="terms"
                        name="agreed"
                        className="h-4 w-4 text-[#6C63FF] focus:ring-[#6C63FF]"
                    />
                    <label htmlFor="terms" className="text-sm text-gray-300">
                        I agree to the{" "}
                        <Link href="/terms" className="text-[#6C63FF] hover:underline">
                            terms & conditions
                        </Link>
                    </label>
                </div>

                <MotionButton type="submit" className="w-full py-3 bg-[#6C63FF] text-white rounded-md hover:bg-[#5b54ff] transition-all duration-300">
                    Login
                </MotionButton>
            </div>
        </form>
    );
}

// Sub-components

function InputField({ type, placeholder, name, icon }: any) {
    return (
        <div className="flex items-center gap-2 px-4 py-2 bg-[#2A2E61]/80 rounded-md border-2 border-[#6C63FF]/30">
            {icon}
            <input
                type={type}
                name={name}
                placeholder={placeholder}
                className="bg-transparent w-full text-white focus:outline-none"
            />
        </div>
    );
}

function PasswordField({ name, icon }: any) {
    return (
        <div className="flex items-center gap-2 px-4 py-2 bg-[#2A2E61]/80 rounded-md border-2 border-[#6C63FF]/30">
            {icon}
            <input
                type="password"
                name={name}
                placeholder="Password"
                className="bg-transparent w-full text-white focus:outline-none"
            />
        </div>
    );
};



