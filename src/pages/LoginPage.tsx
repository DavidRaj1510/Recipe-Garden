import React from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from "@/components/ui/button";
import AuthBackground from '@/components/AuthBackground';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

const LoginPage = () => {
  const { signIn, signInWithGoogle } = useAuth();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await signIn(values.email, values.password);
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <>
      <AuthBackground />
      <div className="flex justify-center items-center min-h-[calc(100vh-164px)] py-8 px-4 relative z-10">
        <Card className="w-full max-w-md bg-white/95 backdrop-blur-sm">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Sign In</CardTitle>
            <CardDescription className="text-center">
              Enter your email and password to access your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="your.email@example.com" type="email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input placeholder="******" type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full bg-recipe-green hover:bg-recipe-darkGreen">
                  Sign In
                </Button>
              </form>
            </Form>

            <div className="mt-4 text-center">
              <Button
                type="button"
                onClick={signInWithGoogle}
                variant="outline"
                className="w-full flex items-center justify-center gap-2"
              >
                <img src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png" alt="Google" className="h-5 w-5" />
                Sign in with Google
              </Button>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <div className="text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link to="/signup" className="text-recipe-green hover:underline">
                Sign Up
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default LoginPage;
