import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Smartphone, Store, Truck, Mail, Lock, ArrowRight, Loader2, CheckCircle2, 
  AlertCircle, User, Phone, MapPin, Building, FileText, Navigation
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { signUpWithRole } from "../services/authService";
import { WILAYAS, COMMUNES } from "../data/algeriaData";

const userTypes = {
  customer: {
    icon: Smartphone,
    title: "Customer Sign Up",
    subtitle: "Citizens & Recyclers",
    description: "Create your account to start earning points and redeeming rewards",
    gradient: "from-emerald-500 to-teal-600",
    buttonColor: "bg-emerald-600 hover:bg-emerald-700",
  },
  superette: {
    icon: Store,
    title: "Superette Sign Up",
    subtitle: "Partner Shops & Retailers",
    description: "Join our network of partner shops and start managing deposits",
    gradient: "from-cyan-500 to-blue-600",
    buttonColor: "bg-cyan-600 hover:bg-cyan-700",
  },
  recycler: {
    icon: Truck,
    title: "Recycler Sign Up",
    subtitle: "Recycling Centers & Logistics",
    description: "Register your recycling center and optimize your operations",
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
      staggerChildren: 0.05,
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

export function SignUpForm({ userType = "customer", onBack, onSuccess }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState(null);
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  
  const config = userTypes[userType];
  const Icon = config.icon;
  const selectedWilaya = watch("wilaya");

  const onSubmit = async (data) => {
    setIsLoading(true);
    setIsSuccess(false);
    setError(null);

    try {
      // Prepare additional data based on user type
      let additionalData = {};

      if (userType === "customer") {
        additionalData = {
          firstName: data.firstName,
          lastName: data.lastName,
          phoneNumber: data.phoneNumber,
        };
      } else if (userType === "superette") {
        additionalData = {
          registreCommerce: data.registreCommerce,
          address: data.address,
          googleMapsLocation: data.googleMapsLocation,
          wilaya: data.wilaya,
          commune: data.commune,
        };
      } else if (userType === "recycler") {
        additionalData = {
          registreCommerce: data.registreCommerce,
          address: data.address,
          googleMapsLocation: data.googleMapsLocation,
          wilaya: data.wilaya,
          commune: data.commune,
          nif: data.nif,
        };
      }

      // Create account with role and additional data
      const result = await signUpWithRole(
        data.email,
        data.password,
        userType,
        additionalData
      );
      
      setIsLoading(false);
      setIsSuccess(true);
      
      setTimeout(() => {
        if (onSuccess) {
          onSuccess(result);
        } else {
          alert(`Account created successfully! Welcome to ${config.title}`);
        }
      }, 1500);
    } catch (error) {
      setIsLoading(false);
      setError(error.message || "An error occurred during sign up. Please try again.");
      
      // Set form errors for specific cases
      if (error.code === "auth/email-already-in-use") {
        setError("This email is already registered. Please use a different email or try logging in.");
      } else if (error.code === "auth/weak-password") {
        setError("Password is too weak. Please use a stronger password.");
      } else if (error.code === "auth/invalid-email") {
        setError("Invalid email address. Please check your email.");
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
        className="relative z-10 w-full max-w-2xl max-h-[95vh] overflow-y-auto"
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
            <CardContent className="space-y-4 pb-4 pr-2">
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

              {/* Customer Specific Fields */}
              {userType === "customer" && (
                <>
                  <motion.div variants={fieldVariants} className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName" className="text-slate-700">First Name</Label>
                      <div className="relative group">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-emerald-600 transition-colors" />
                        <Input
                          id="firstName"
                          type="text"
                          placeholder="John"
                          className="pl-10"
                          {...register("firstName", {
                            required: "First name is required",
                            minLength: { value: 2, message: "First name must be at least 2 characters" },
                          })}
                        />
                      </div>
                      {errors.firstName && (
                        <p className="text-sm text-destructive">{errors.firstName.message}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName" className="text-slate-700">Last Name</Label>
                      <div className="relative group">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-emerald-600 transition-colors" />
                        <Input
                          id="lastName"
                          type="text"
                          placeholder="Doe"
                          className="pl-10"
                          {...register("lastName", {
                            required: "Last name is required",
                            minLength: { value: 2, message: "Last name must be at least 2 characters" },
                          })}
                        />
                      </div>
                      {errors.lastName && (
                        <p className="text-sm text-destructive">{errors.lastName.message}</p>
                      )}
                    </div>
                  </motion.div>

                  <motion.div variants={fieldVariants} className="space-y-2">
                    <Label htmlFor="phoneNumber" className="text-slate-700">Phone Number</Label>
                    <div className="relative group">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-emerald-600 transition-colors" />
                      <Input
                        id="phoneNumber"
                        type="tel"
                        placeholder="+213 555 123 456"
                        className="pl-10"
                        {...register("phoneNumber", {
                          required: "Phone number is required",
                          pattern: {
                            value: /^(\+213|0)[5-7][0-9]{8}$/,
                            message: "Please enter a valid Algerian phone number",
                          },
                        })}
                      />
                    </div>
                    {errors.phoneNumber && (
                      <p className="text-sm text-destructive">{errors.phoneNumber.message}</p>
                    )}
                  </motion.div>
                </>
              )}

              {/* Superette & Recycler Common Fields */}
              {(userType === "superette" || userType === "recycler") && (
                <>
                  <motion.div variants={fieldVariants} className="space-y-2">
                    <Label htmlFor="registreCommerce" className="text-slate-700">
                      Registre de Commerce
                    </Label>
                    <div className="relative group">
                      <FileText className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-emerald-600 transition-colors" />
                      <Input
                        id="registreCommerce"
                        type="text"
                        placeholder="RC123456789"
                        className="pl-10"
                        {...register("registreCommerce", {
                          required: "Registre de Commerce is required",
                        })}
                      />
                    </div>
                    {errors.registreCommerce && (
                      <p className="text-sm text-destructive">{errors.registreCommerce.message}</p>
                    )}
                  </motion.div>

                  <motion.div variants={fieldVariants} className="space-y-2">
                    <Label htmlFor="address" className="text-slate-700">Address</Label>
                    <div className="relative group">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-emerald-600 transition-colors" />
                      <Input
                        id="address"
                        type="text"
                        placeholder="Street address"
                        className="pl-10"
                        {...register("address", {
                          required: "Address is required",
                        })}
                      />
                    </div>
                    {errors.address && (
                      <p className="text-sm text-destructive">{errors.address.message}</p>
                    )}
                  </motion.div>

                  <motion.div variants={fieldVariants} className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="wilaya" className="text-slate-700">Wilaya</Label>
                      <div className="relative group">
                        <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-emerald-600 transition-colors z-10" />
                        <select
                          id="wilaya"
                          className="w-full h-9 pl-10 pr-3 rounded-md border border-input bg-input-background text-base transition-all focus:ring-2 focus:ring-emerald-500/20 focus:border-ring outline-none"
                          {...register("wilaya", {
                            required: "Wilaya is required",
                          })}
                        >
                          <option value="">Select Wilaya</option>
                          {WILAYAS.map((wilaya) => (
                            <option key={wilaya} value={wilaya}>
                              {wilaya}
                            </option>
                          ))}
                        </select>
                      </div>
                      {errors.wilaya && (
                        <p className="text-sm text-destructive">{errors.wilaya.message}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="commune" className="text-slate-700">Commune</Label>
                      <div className="relative group">
                        <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-emerald-600 transition-colors z-10" />
                        <select
                          id="commune"
                          className="w-full h-9 pl-10 pr-3 rounded-md border border-input bg-input-background text-base transition-all focus:ring-2 focus:ring-emerald-500/20 focus:border-ring outline-none"
                          {...register("commune", {
                            required: "Commune is required",
                          })}
                        >
                          <option value="">Select Commune</option>
                          {COMMUNES.map((commune) => (
                            <option key={commune} value={commune}>
                              {commune}
                            </option>
                          ))}
                        </select>
                      </div>
                      {errors.commune && (
                        <p className="text-sm text-destructive">{errors.commune.message}</p>
                      )}
                    </div>
                  </motion.div>

                  <motion.div variants={fieldVariants} className="space-y-2">
                    <Label htmlFor="googleMapsLocation" className="text-slate-700">
                      Google Maps Location (URL)
                    </Label>
                    <div className="relative group">
                      <Navigation className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-emerald-600 transition-colors" />
                      <Input
                        id="googleMapsLocation"
                        type="url"
                        placeholder="https://maps.app.goo.gl/... or https://maps.google.com/..."
                        className="pl-10"
                        {...register("googleMapsLocation", {
                          required: "Google Maps location is required",
                          pattern: {
                            value: /^https?:\/\/(www\.)?(google\.com\/maps|maps\.google\.com|maps\.app\.goo\.gl|goo\.gl\/maps)/,
                            message: "Please enter a valid Google Maps URL",
                          },
                        })}
                      />
                    </div>
                    <p className="text-xs text-slate-500">
                      Right-click on Google Maps and select "Copy link" to get the location URL
                    </p>
                    {errors.googleMapsLocation && (
                      <p className="text-sm text-destructive">{errors.googleMapsLocation.message}</p>
                    )}
                  </motion.div>
                </>
              )}

              {/* Recycler Specific Field */}
              {userType === "recycler" && (
                <motion.div variants={fieldVariants} className="space-y-2">
                  <Label htmlFor="nif" className="text-slate-700">NIF (Numéro d'Identification Fiscale)</Label>
                  <div className="relative group">
                    <FileText className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-emerald-600 transition-colors" />
                    <Input
                      id="nif"
                      type="text"
                      placeholder="NIF123456789"
                      className="pl-10"
                      {...register("nif", {
                        required: "NIF is required",
                      })}
                    />
                  </div>
                  {errors.nif && (
                    <p className="text-sm text-destructive">{errors.nif.message}</p>
                  )}
                </motion.div>
              )}

              {/* Common Fields (Email & Password) */}
              <motion.div variants={fieldVariants} className="space-y-2">
                <Label htmlFor="email" className="text-slate-700">Email</Label>
                <div className="relative group">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-emerald-600 transition-colors" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    className="pl-10"
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

              <motion.div variants={fieldVariants} className="space-y-2">
                <Label htmlFor="password" className="text-slate-700">Password</Label>
                <div className="relative group">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-emerald-600 transition-colors" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    className="pl-10"
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

              <motion.div variants={fieldVariants} className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-slate-700">Confirm Password</Label>
                <div className="relative group">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-emerald-600 transition-colors" />
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm your password"
                    className="pl-10"
                    {...register("confirmPassword", {
                      required: "Please confirm your password",
                      validate: (value) =>
                        value === watch("password") || "Passwords do not match",
                    })}
                  />
                </div>
                {errors.confirmPassword && (
                  <p className="text-sm text-destructive">{errors.confirmPassword.message}</p>
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
                        Creating account...
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
                        Account created!
                      </motion.span>
                    ) : (
                      <motion.span
                        key="default"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-2"
                      >
                        Create Account
                        <ArrowRight className="w-5 h-5" />
                      </motion.span>
                    )}
                  </AnimatePresence>
                </Button>
              </motion.div>
              
              <div className="text-center text-sm text-slate-600">
                Already have an account?{" "}
                <motion.button
                  type="button"
                  onClick={() => {
                    const event = new CustomEvent('switchToLogin', { detail: { userType } });
                    window.dispatchEvent(event);
                  }}
                  className="text-emerald-600 hover:text-emerald-700 hover:underline font-medium transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Login
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

