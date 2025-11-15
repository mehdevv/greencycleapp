import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { Smartphone, Store, Truck, Mail, Lock, ArrowRight, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { signInWithRole } from "../services/authService";

const userTypes = {
  customer: {
    icon: Smartphone,
    title: "Customer Login",
    subtitle: "Citizens & Recyclers",
    description: "Access your account to track your recycling points and redeem rewards",
    gradient: "from-emerald-500 to-teal-600",
    buttonColor: "bg-emerald-600 hover:bg-emerald-700",
  },
  superette: {
    icon: Store,
    title: "Superette Login",
    subtitle: "Partner Shops & Retailers",
    description: "Manage customer deposits and track your shop's recycling activity",
    gradient: "from-cyan-500 to-blue-600",
    buttonColor: "bg-cyan-600 hover:bg-cyan-700",
  },
  recycler: {
    icon: Truck,
    title: "Recycler Login",
    subtitle: "Recycling Centers & Logistics",
    description: "Optimize collection routes and manage recycling operations",
    gradient: "from-teal-500 to-emerald-600",
    buttonColor: "bg-teal-600 hover:bg-teal-700",
  },
};

const formVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
      staggerChildren: 0.1,
    },
  },
};

const fieldVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
};

export function LoginForm({ userType = "customer", onBack }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState(null);
  const { register, handleSubmit, formState: { errors }, setError: setFormError } = useForm();
  
  const config = userTypes[userType];
  const Icon = config.icon;

  const onSubmit = async (data) => {
    setIsLoading(true);
    setIsSuccess(false);
    setError(null);

    try {
      // Sign in with Firebase and validate role
      const result = await signInWithRole(data.email, data.password, userType);
      
      setIsLoading(false);
      setIsSuccess(true);
      
      // Redirect to dashboard based on role
      setTimeout(() => {
        console.log("Login successful:", result);
        // Redirect to appropriate dashboard
        window.location.href = `/dashboard/${userType}`;
      }, 1500);
    } catch (error) {
      setIsLoading(false);
      setError(error.message || "An error occurred during login. Please try again.");
      
      // Set form errors for specific cases
      if (error.code === "auth/user-not-found") {
        setFormError("email", { type: "manual", message: "No account found with this email." });
      } else if (error.code === "auth/wrong-password") {
        setFormError("password", { type: "manual", message: "Incorrect password." });
      } else if (error.code === "auth/invalid-email") {
        setFormError("email", { type: "manual", message: "Invalid email address." });
      }
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
        variants={formVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 w-full max-w-md max-h-[95vh] overflow-y-auto"
      >
        <Card className="relative bg-white border-2 border-slate-200 shadow-2xl overflow-hidden">
          {/* Decorative gradient bar */}
          <motion.div
            className={`h-1 bg-gradient-to-r ${config.gradient}`}
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
              className={`w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br ${config.gradient} rounded-xl md:rounded-2xl flex items-center justify-center mx-auto shadow-lg`}
            >
              <Icon className="w-8 h-8 md:w-10 md:h-10 text-white" />
            </motion.div>
            <motion.div
              variants={fieldVariants}
              className="text-center space-y-1"
            >
              <CardTitle className="text-2xl md:text-3xl text-slate-900 tracking-tight">
                {config.title}
              </CardTitle>
              <p className="text-slate-500 tracking-wide uppercase text-[10px] md:text-xs font-medium">
                {config.subtitle}
              </p>
              <CardDescription className="text-slate-600 pt-1 text-sm">
                {config.description}
              </CardDescription>
            </motion.div>
          </CardHeader>
          
          <form onSubmit={handleSubmit(onSubmit)}>
            <CardContent className="space-y-4 pb-4">
              {/* Error Message */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="p-3 bg-destructive/10 border border-destructive/20 rounded-md flex items-center gap-2 text-destructive text-sm"
                  >
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>{error}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.div
                variants={fieldVariants}
                className="space-y-2"
              >
                <Label htmlFor="email" className="text-slate-700">Email</Label>
                <div className="relative group">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-emerald-600 transition-colors" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
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
                <AnimatePresence>
                  {errors.email && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-sm text-destructive"
                    >
                      {errors.email.message}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>

              <motion.div
                variants={fieldVariants}
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
                <AnimatePresence>
                  {errors.password && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-sm text-destructive"
                    >
                      {errors.password.message}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>

              <motion.div
                variants={fieldVariants}
                className="flex items-center justify-between text-sm"
              >
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 transition-all"
                    {...register("remember")}
                  />
                  <span className="text-slate-600 group-hover:text-slate-900 transition-colors">
                    Remember me
                  </span>
                </label>
                <motion.a
                  href="#"
                  className="text-emerald-600 hover:text-emerald-700 hover:underline transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Forgot password?
                </motion.a>
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
                  className={`w-full ${config.buttonColor} text-white shadow-lg hover:shadow-xl transition-all duration-300`}
                  size="lg"
                  disabled={isLoading || isSuccess}
                >
                  <AnimatePresence mode="wait">
                    {isLoading ? (
                      <motion.span
                        key="loading"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-2"
                      >
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Logging in...
                      </motion.span>
                    ) : isSuccess ? (
                      <motion.span
                        key="success"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        className="flex items-center gap-2"
                      >
                        <CheckCircle2 className="w-5 h-5" />
                        Success!
                      </motion.span>
                    ) : (
                      <motion.span
                        key="default"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-2"
                      >
                        Login
                        <ArrowRight className="w-5 h-5" />
                      </motion.span>
                    )}
                  </AnimatePresence>
                </Button>
              </motion.div>
              
              <div className="text-center text-sm text-slate-600">
                Don't have an account?{" "}
                <motion.button
                  type="button"
                  onClick={() => {
                    if (onBack) {
                      // Switch to sign-up mode
                      const event = new CustomEvent('switchToSignUp', { detail: { userType } });
                      window.dispatchEvent(event);
                    }
                  }}
                  className="text-emerald-600 hover:text-emerald-700 hover:underline font-medium transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Sign up
                </motion.button>
              </div>
              
              {onBack && (
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full"
                >
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={onBack}
                    className="w-full hover:bg-slate-100 transition-colors"
                  >
                    ← Back to user selection
                  </Button>
                </motion.div>
              )}
            </CardFooter>
          </form>
        </Card>
      </motion.div>
    </div>
  );
}
