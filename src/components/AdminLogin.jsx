import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Shield, Mail, Lock, ArrowRight, Loader2, AlertCircle } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { signInWithRole, signUpWithRole } from '../services/authService';

export default function AdminLogin() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    setIsLoading(true);
    setError(null);

    try {
      // Check if it's the admin credentials
      if (data.email === 'admin@greencycle.com' && data.password === 'mehdi123') {
        // Try to sign in, if user doesn't exist, create admin account
        try {
          await signInWithRole(data.email, data.password, 'admin');
        } catch (signInError) {
          // If user doesn't exist, create admin account
          if (signInError.code === 'auth/user-not-found' || signInError.message?.includes('not found')) {
            await signUpWithRole(data.email, data.password, 'admin', {
              approved: true,
              isAdmin: true
            });
            // Sign in after creating account
            await signInWithRole(data.email, data.password, 'admin');
          } else {
            throw signInError;
          }
        }
        // Redirect to admin dashboard
        window.location.href = '/admin';
      } else {
        setError('Invalid admin credentials');
      }
    } catch (error) {
      setError(error.message || 'Invalid admin credentials');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 flex items-center justify-center p-4 md:p-6 overflow-hidden relative">
      {/* Decorative Frame */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <img 
          src="/Green Recycling Harmony.png" 
          alt="Decorative Frame" 
          className="w-full h-full object-cover opacity-40 md:opacity-50"
          style={{ mixBlendMode: 'multiply' }}
        />
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-emerald-200/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-teal-200/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-md max-h-[95vh] overflow-y-auto"
      >
        <Card className="relative bg-white border-2 border-slate-200 shadow-2xl overflow-hidden">
          {/* Decorative gradient bar */}
          <motion.div
            className="h-1 bg-gradient-to-r from-emerald-600 to-teal-600"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.5 }}
          />

          <CardHeader className="space-y-3 pb-4">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 15,
                delay: 0.2,
              }}
              className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-xl md:rounded-2xl flex items-center justify-center mx-auto shadow-lg"
            >
              <Shield className="w-8 h-8 md:w-10 md:h-10 text-white" />
            </motion.div>
            <motion.div
              className="text-center space-y-1"
            >
              <CardTitle className="text-2xl md:text-3xl text-slate-900 tracking-tight">
                Admin Login
              </CardTitle>
              <CardDescription className="text-slate-600 pt-1 text-sm">
                Access the admin dashboard
              </CardDescription>
            </motion.div>
          </CardHeader>

          <form onSubmit={handleSubmit(onSubmit)}>
            <CardContent className="space-y-4 pb-4">
              {/* Error Message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3 bg-destructive/10 border border-destructive/20 rounded-md flex items-center gap-2 text-destructive text-sm"
                >
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{error}</span>
                </motion.div>
              )}

              <motion.div
                className="space-y-2"
              >
                <Label htmlFor="email" className="text-slate-700">Email</Label>
                <div className="relative group">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-emerald-600 transition-colors" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="admin@greencycle.com"
                    className="pl-10 transition-all focus:ring-2 focus:ring-emerald-500/20"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address",
                      },
                    })}
                  />
                </div>
                {errors.email && (
                  <p className="text-sm text-destructive">{errors.email.message}</p>
                )}
              </motion.div>

              <motion.div
                className="space-y-2"
              >
                <Label htmlFor="password" className="text-slate-700">Password</Label>
                <div className="relative group">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-emerald-600 transition-colors" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    className="pl-10 transition-all focus:ring-2 focus:ring-emerald-500/20"
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters",
                      },
                    })}
                  />
                </div>
                {errors.password && (
                  <p className="text-sm text-destructive">{errors.password.message}</p>
                )}
              </motion.div>
            </CardContent>

            <CardFooter className="flex flex-col gap-3 pt-4">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full"
              >
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white"
                  size="lg"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    <>
                      Sign In
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
              </motion.div>
            </CardFooter>
          </form>
        </Card>
      </motion.div>
    </div>
  );
}

