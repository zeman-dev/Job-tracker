"use client"
import { register } from "@/lib/api";
import { useMutation } from "@tanstack/react-query";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useRouter } from "next/navigation";
import axios from "axios";
import * as Yup from 'yup';


export interface RegisterValues {
 email: string,
 password: string,
 userName: string,
}

const initialValues: RegisterValues ={
    email: "",
    password: "",
    userName: "",
}

const validationSchema = Yup.object().shape({
 email: Yup.string().email('Please enter a valid email.').max(64).required(),
 password: Yup.string().max(128).required(),
 userName: Yup.string().max(64),
})

const inputClassName =
    "w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20";

function getErrorMessage(error: unknown) {
    if (axios.isAxiosError(error)) {
        const data = error.response?.data as { message?: string } | undefined;
        return data?.message ?? "Invalid email or password.";
    }
    return "Something went wrong. Please try again.";
}

export default function RegisterClient(){

    const router = useRouter();

    ///// { QUERY } /////

    const mutation = useMutation({
        mutationFn: register,
        onSuccess() {
            router.push("/");
            console.log("Register succsessful !")
        }
    })

    ///// { SUBMITING } /////
    function submitRegister(values: RegisterValues){
        mutation.mutate( values );
    }

 return(

    <Formik
        initialValues={initialValues}
        onSubmit={submitRegister}
        validationSchema={validationSchema}
    >
        <Form className="flex flex-col" noValidate>
            <div className="mb-4">
                <label htmlFor="email" className="mb-1.5 block text-[13px] font-medium text-slate-700">
                    Email
                </label>
                <Field
                    id="email"
                    type="email"
                    name="email"
                    placeholder="Email@example.com"
                    className={inputClassName}
                />
                <ErrorMessage name="email" component="p" className="mt-1 text-xs text-red-600" />
            </div>
            <div className="mb-6">
                <label htmlFor="userName" className="mb-1.5 block text-[13px] font-medium text-slate-700">
                    Name
                </label>
                <Field
                    id="userName"
                    type="text"
                    name="userName"
                    placeholder="Your Nickname"
                    className={inputClassName}
                />
                <ErrorMessage name="name" component="p" className="mt-1 text-xs text-red-600" />
            </div>

            <div className="mb-6">
                <label htmlFor="password" className="mb-1.5 block text-[13px] font-medium text-slate-700">
                    Password
                </label>
                <Field
                    id="password"
                    type="password"
                    name="password"
                    placeholder="Password"
                    className={inputClassName}
                />
                <ErrorMessage name="password" component="p" className="mt-1 text-xs text-red-600" />
            </div>

            <button
                type="submit"
                disabled={mutation.isPending}
                className="w-full rounded-lg bg-blue-600 px-3.5 py-2.5 text-[13px] font-medium text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
                {mutation.isPending ? "Registering you..." : "Register"}
            </button>

            {mutation.isError && (
                <p className="mt-3 text-center text-xs text-red-600">
                    {getErrorMessage(mutation.error)}
                </p>
            )}
        </Form>
    </Formik>
 )
}
