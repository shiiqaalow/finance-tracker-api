import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CheckCircle2, Eye, EyeOff, Lock, Mail, X } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router"
import { useMutation } from '@tanstack/react-query'
import { api } from '../../api/Apiclient'
import { extractErrorMessages } from '../../utils/errorUtils'
import { useAuthStore  } from '../../lib/store/authStore'
export const SigninForm = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)

  const { register, handleSubmit, formState: { errors } } = useForm()
  const navigate = useNavigate()
  const { setAuth } = useAuthStore()
  

  const formFields = [
    {
      name: "email",
      label: "Email",
      icon: Mail,
      type: "text",
      placeholder: "john@example.com",
      validation: {
        required: "Email is required",
        pattern: {
          value: /^\S+@\S+$/i,
          message: "Invalid email address",
        },
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
        minLength: {
          value: 4,
          message: "Password must be at least 4 characters",
        },
      },
    },
  ]

  const signinMutation = useMutation({
    mutationFn: async (userInfo) => {
      const response = await api.post('/auth/signin', userInfo)
      return response.data
    },
    onSuccess: (data) => {
      setSuccess('Account Logged in! Redirecting to Dashboard...')
      if(data.token) {
        const user = data.user
        const token = data.token
        setAuth(user,token)
        const path = user?.role === 'admin' ? '/dashboard/admin' : '/dashboard/user'
  
        navigate(path)
      }
    },
    onError: (error) => {
      setError(extractErrorMessages(error))
    }
  })

  const onSubmit = (data) => {
    setError(null)
    setSuccess(null)
    signinMutation.mutate({
      email: data.email,
      password: data.password
    })
  }

  return (
    <Card className="w-full border-border rounded-xl bg-white/60 backdrop-blur-md shadow-xl">
      <CardHeader className="space-y-2 py-6">
        <CardTitle className="text-2xl text-center">Sign In</CardTitle>
        <CardDescription className="text-sm text-center">
          Enter your credentials to access your account
        </CardDescription>
      </CardHeader>

      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-5">
          {error && (
            <div className="bg-destructive/20 text-destructive p-3 rounded-md flex items-center gap-2">
              <span className='bg-destructive/20 w-5 h-5 flex justify-center items-center rounded-md'> <X size={15} /> </span>
              {error}
            </div>
          )}
           {success && (
            <div className="bg-green-200 text-green-700 p-3 rounded-md flex items-center gap-2">
              <span className=' w-5 h-5 flex justify-center items-center rounded-md'> <CheckCircle2 size={15} /> </span>
              {success}
            </div>
          )}
          {formFields.map(({ name, label, icon: Icon, type, placeholder, validation }) => {
            const isPassword = name === "password"
            const inputType = isPassword ? (showPassword ? "text" : "password") : type

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
                    className="pl-10 pr-10 py-5 border-primary/20 focus:border-0  focus-visible:ring-primary/40"
                  />
                  {isPassword && (
                    <button
                      type="button"
                      onClick={() => setShowPassword(prev => !prev)}
                      className="absolute top-1/2 -translate-y-1/2 right-3 text-primary/50 hover:text-primary cursor-pointer"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  )}
                </div>
                {errors[name] && (
                  <p className="text-destructive text-xs bg-destructive/20 px-2 py-1 rounded-md flex items-center gap-2">
                    <X size={20} className="" />
                    {errors[name].message}
                  </p>
                )}
              </div>
            )
          })}
          <div className="pb-4">
            <Button type="submit" className="w-full rounded-lg py-5">
              Sign In
            </Button>
          </div>
        </CardContent>



        <CardFooter className="flex justify-center items-center pb-6">
          <p className="text-sm">
            Don't have an account?{" "}
            <a

              onClick={() => navigate("/signup")}
              className="text-primary hover:underline cursor-pointer font-medium">
              Sign up
            </a>
          </p>
        </CardFooter>
      </form>
    </Card>
  )
}