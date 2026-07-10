import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    User, Mail, Lock, Eye, EyeOff, X, ArrowRight,
    Loader2
} from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { api } from "../../api/Apiclient";
import { extractErrorMessages } from "../../utils/errorUtils";

export const SignupForm = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setIsLoading] = useState(false);
    const [error, setError] = useState(null)

    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const password = watch("password");

    const fields = [
        {
            name: "name",
            label: "Name",
            icon: User,
            type: "text",
            placeholder: "Jane Doe",
            validation: {
                required: "Full name is required",
                minLength: { value: 3, message: "Name must be at least 3 characters" },
            },
        },
        {
            name: "email",
            label: "Email Address",
            icon: Mail,
            type: "email",
            placeholder: "jane@example.com",
            validation: {
                required: "Email is required",
                pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" },
            },
        },
        {
            name: "password",
            label: "Password",
            icon: Lock,
            type: "password",
            placeholder: "Min 4 characters",
            validation: {
                required: "Password is required",
                minLength: { value: 4, message: "Password must be at least 4 characters" },
            },
        },
        {
            name: "confirmPassword",
            label: "Confirm Password",
            icon: Lock,
            type: "password",
            placeholder: "Repeat your password",
            validation: {
                required: "Please confirm your password",
                validate: (value) => value === password || "Passwords do not match",
            },
        },
    ];


    const signupMutation = useMutation({
        mutationFn: async (userData) => {
            const response = await api.post('/auth/signup', userData)
            return response.data
        },
        onSuccess: (data) => {
            reset();
            navigate("/signin");
        },
        onError: (error) => {
            setError(extractErrorMessages(error))
        }
    })

    const onSubmit = (data) => {
        setError(null)
        signupMutation.mutate({  
            name: data.name,
            email: data.email,
            password: data.password 
        })
    };

    return (
        <Card className="w-full border-border rounded-xl bg-white/60 backdrop-blur-md shadow-xl">
            <CardHeader className="space-y-2 py-6">
                <CardTitle className="text-2xl text-center">Create an account</CardTitle>
                <CardDescription className="text-sm text-center">Enter your details to register </CardDescription>
            </CardHeader>

            <form onSubmit={handleSubmit(onSubmit)}>
                <CardContent className="space-y-5">
                    {error && (
                        <div className="bg-destructive/20 text-destructive p-3 rounded-md flex items-center gap-2">
                            <span className='bg-destructive/20 w-5 h-5 flex justify-center items-center rounded-md'> <X size={15}/> </span>
                            { error }
                    </div>
                    )}
                    {fields.map(({ name, label, icon: Icon, type, placeholder, validation }) => {
                        const isPassword = name === "password"
                        const isConfirm = name === "confirmPassword"
                        const isPasswordField = isPassword || isConfirm

                        const inputType = isPassword
                            ? showPassword ? "text" : "password"
                            : isConfirm
                                ? showConfirmPassword ? "text" : "password"
                                : type

                        return (
                            <div key={name} className="space-y-2">

                                <Label htmlFor={name}>{label}</Label>
                                <div className="relative">
                                    <span className="absolute top-1/2 -translate-y-1/2 left-3">
                                        <Icon size={18} className="text-primary/50" />
                                    </span>
                                    <Input
                                        id={name}
                                        type={inputType}
                                        placeholder={placeholder}
                                        {...register(name, validation)}
                                        className="pl-10 pr-10 py-5 border-primary/20 focus:border-0 focus-visible:ring-primary/40"
                                    />
                                    {isPasswordField && (
                                        <button
                                            type="button"
                                            onClick={() =>
                                                isPassword
                                                    ? setShowPassword(p => !p)
                                                    : setShowConfirmPassword(p => !p)
                                            }
                                            className="absolute top-1/2 -translate-y-1/2 right-3 text-primary/50 hover:text-primary cursor-pointer"
                                        >
                                            {(isPassword ? showPassword : showConfirmPassword)
                                                ? <EyeOff size={18} />
                                                : <Eye size={18} />
                                            }
                                        </button>
                                    )}
                                </div>

                                {errors[name] && (
                                    <p className="text-destructive text-xs bg-destructive/20 px-2 py-1 rounded-md flex items-center gap-2">
                                        <X size={14} />
                                        {errors[name].message}
                                    </p>
                                )}
                            </div>
                        )
                    })}

                    <div className="pb-2">
                        <Button type="submit" disabled={loading} className="w-full rounded-lg py-5">
                            {loading ? (
                                <span className="flex items-center gap-2">
                                    <Loader2 className="animate-spin" size={16} />
                                    Creating Account...
                                </span>
                            ) : (
                                <span className="flex items-center gap-2">
                                    Create Account
                                    <ArrowRight size={15} />
                                </span>
                            )}
                        </Button>
                    </div>
                </CardContent>

                <CardFooter className="flex justify-center items-center pb-6">
                    <p className="text-sm">
                        Already have an account?{" "}
                        <a
                            onClick={() => navigate("/signin")}
                            className="text-primary hover:underline cursor-pointer font-medium"
                        >
                            Sign in
                        </a>
                    </p>
                </CardFooter>
            </form>
        </Card>
    )
}