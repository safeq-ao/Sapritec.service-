import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CProvider } from "../../utils/context/autentication";
import { useGoogleLogin } from "@react-oauth/google";
import { googleAuth } from "../../utils/api/api";
import { Eye, EyeOff, Mail, Lock, AlertCircle } from "lucide-react";

const Login = () => {
  // Form state
  const [dados, setDados] = useState({
    email: "",
    senha: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState("");

  // Auth context and navigation
  const { Login } = useContext(CProvider);
  const navigate = useNavigate();

  // Form validation
  const validateForm = () => {
    let tempErrors = {};
    
    if (!dados.email) {
      tempErrors.email = "Email é obrigatório";
    } else if (!/\S+@\S+\.\S+/.test(dados.email)) {
      tempErrors.email = "Email inválido";
    }
    
    if (!dados.senha) {
      tempErrors.senha = "Senha é obrigatória";
    }
    
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  // Handle conventional login
  const handleLogin = async (event) => {
    event.preventDefault();
    
    setLoginError("");
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      try {
        await Login(dados.email, dados.senha);
        
        if (localStorage.getItem("myTokenUser")) {
          navigate("/home");
        } else {
          setLoginError("Credenciais inválidas. Por favor, tente novamente.");
        }
      } catch (error) {
        setLoginError(
          error.message || "Ocorreu um erro. Por favor, tente novamente."
        );
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  // Handle Google login
  const responseGoogle = async (authResult) => {
    try {
      if (authResult["code"]) {
        setIsSubmitting(true);
        const result = await googleAuth(authResult.code);
        console.log(result);
        navigate("/home");
      } else {
        throw new Error(authResult);
      }
    } catch (e) {
      setLoginError("Erro ao autenticar com Google. Tente novamente.");
      console.log("Erro ao carregar o Google Login para autenticação...", e);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLoginGoogle = useGoogleLogin({
    onSuccess: responseGoogle,
    onError: responseGoogle,
    flow: "auth-code",
  });

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
      {/* Logo Header */}
      <header className="mb-8">
        <h1 className="text-3xl font-bold">
          <a href="/" className="flex items-center gap-1">
            <span className="text-blue-600">Sapritec</span>
            <span className="text-gray-700">.service</span>
          </a>
        </h1>
      </header>

      {/* Login Card */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Card Header */}
        <div className="bg-blue-600 p-6 text-white">
          <h2 className="text-xl font-bold text-center">Bem-vindo de volta!</h2>
          <p className="text-blue-100 text-sm text-center mt-1">
            Entre com seus dados para acessar sua conta
          </p>
        </div>

        {/* Form Section */}
        <div className="p-6 sm:p-8">
          {/* Error message display */}
          {loginError && (
            <div className="mb-4 p-3 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm flex items-start">
              <AlertCircle size={16} className="mr-2 mt-0.5 flex-shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email Field */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail size={18} className="text-gray-400" />
                </div>
                <input
                  type="email"
                  id="email"
                  className={`block w-full pl-10 pr-3 py-3 rounded-lg border ${
                    errors.email 
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500" 
                      : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  } focus:outline-none focus:ring-1 shadow-sm`}
                  placeholder="email@exemplo.com"
                  value={dados.email}
                  onChange={(e) => setDados({ ...dados, email: e.target.value })}
                />
              </div>
              {errors.email && (
                <p className="text-sm text-red-600 mt-1">{errors.email}</p>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <div className="flex justify-between">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Senha
                </label>
                <Link to="/forgot-password" className="text-sm text-blue-600 hover:text-blue-800 hover:underline">
                  Esqueceu a senha?
                </Link>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock size={18} className="text-gray-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  className={`block w-full pl-10 pr-10 py-3 rounded-lg border ${
                    errors.senha 
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500" 
                      : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  } focus:outline-none focus:ring-1 shadow-sm`}
                  placeholder="••••••••"
                  value={dados.senha}
                  onChange={(e) => setDados({ ...dados, senha: e.target.value })}
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <button
                    type="button"
                    className="text-gray-400 hover:text-gray-600"
                    onClick={() => setShowPassword(!showPassword)}
                    tabIndex="-1"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
              {errors.senha && (
                <p className="text-sm text-red-600 mt-1">{errors.senha}</p>
              )}
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3 px-4 text-sm bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow transition-colors ${
                isSubmitting ? "opacity-80 cursor-not-allowed" : ""
              }`}
            >
              {isSubmitting ? "Autenticando..." : "Entrar"}
            </button>

            {/* Divider */}
            <div className="relative flex items-center justify-center">
              <div className="border-t border-gray-300 w-48"></div>
              <span className="px-3 bg-white text-gray-500 text-sm">ou continue com</span>
              <div className="border-t border-gray-300 w-48"></div>
            </div>

            {/* Google Login Button */}
            <button
              type="button"
              onClick={handleLoginGoogle}
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-white border border-gray-300 hover:bg-gray-50 rounded-lg shadow-sm transition-colors"
            >
              <svg viewBox="0 0 24 24" width="20" height="20">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              <span className="text-gray-700 font-medium text-sm">Google</span>
            </button>
          </form>

          {/* Registration Link */}
          <div className="mt-6 text-center">
            <span className="text-gray-600 text-sm">Não tem uma conta?</span>{" "}
            <Link to="/register" className="text-blue-600 hover:text-blue-800 hover:underline font-medium text-sm">
              Registrar-se
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <p className="mt-8 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} Sapritec Services. Todos os direitos reservados.
      </p>
    </div>
  );
};

export default Login;