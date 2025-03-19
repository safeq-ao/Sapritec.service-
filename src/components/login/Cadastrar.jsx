import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CProvider } from "../../utils/context/autentication";
import { useGoogleLogin } from "@react-oauth/google";
import { googleAuth } from "../../utils/api/api";
import { Eye, EyeOff, Mail, Lock, User, AlertCircle, CheckCircle } from "lucide-react";

const Cadastrar = () => {
  // Form state
  const [dados, setDados] = useState({
    nome: "",
    email: "",
    senha: "",
    confirmarSenha: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [signupError, setSignupError] = useState("");
  const [signupSuccess, setSignupSuccess] = useState(false);
  const [isGoogleSubmitting, setIsGoogleSubmitting] = useState(false);

  // Auth context and navigation
  const { Register } = useContext(CProvider);
  const navigate = useNavigate();

  // Form validation
  const validateForm = () => {
    let tempErrors = {};
    
    if (!dados.nome) {
      tempErrors.nome = "Nome é obrigatório";
    }
    
    if (!dados.email) {
      tempErrors.email = "Email é obrigatório";
    } else if (!/\S+@\S+\.\S+/.test(dados.email)) {
      tempErrors.email = "Email inválido";
    }
    
    if (!dados.senha) {
      tempErrors.senha = "Senha é obrigatória";
    } else if (dados.senha.length < 6) {
      tempErrors.senha = "A senha deve ter pelo menos 6 caracteres";
    }
    
    if (!dados.confirmarSenha) {
      tempErrors.confirmarSenha = "Confirmação de senha é obrigatória";
    } else if (dados.confirmarSenha !== dados.senha) {
      tempErrors.confirmarSenha = "As senhas não coincidem";
    }
    
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  // Handle registration
  const handleRegister = async (event) => {
    event.preventDefault();
    
    setSignupError("");
    setSignupSuccess(false);
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      try {
        await Register(dados.nome, dados.email, dados.senha);
        setSignupSuccess(true);
        
        // Redirect to verification page or login after successful registration
        setTimeout(() => {
          navigate("/verify", { state: { email: dados.email } });
        }, 2000);
      } catch (error) {
        setSignupError(
          error.message || "Ocorreu um erro no cadastro. Por favor, tente novamente."
        );
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  // Handle Google registration
  const responseGoogle = async (authResult) => {
    try {
      if (authResult["code"]) {
        setIsGoogleSubmitting(true);
        setSignupError("");
        
        const result = await googleAuth(authResult.code);
        setSignupSuccess(true);
        
        // Redirect to home or verification page
        setTimeout(() => {
          navigate("/home");
        }, 1500);
      } else {
        throw new Error(authResult);
      }
    } catch (e) {
      setSignupError("Erro ao registrar com Google. Tente novamente.");
      console.error("Erro ao carregar o Google para registro...", e);
    } finally {
      setIsGoogleSubmitting(false);
    }
  };

  const handleRegisterGoogle = useGoogleLogin({
    onSuccess: responseGoogle,
    onError: responseGoogle,
    flow: "auth-code",
  });

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
      {/* Logo Header */}
      <header className="mb-8">
        <h1 className="text-3xl font-bold">
          <a href="/" className="hover:underline">
          <span className="text-blue-600">Sapritec</span>
          <span className="text-gray-700">.service</span>
          </a>
        </h1>
      </header>

      {/* Registration Card */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Card Header */}
        <div className="bg-blue-600 p-6 text-white">
          <h2 className="text-xl font-bold text-center">Criar nova conta</h2>
          <p className="text-blue-100 text-sm text-center mt-1">
            Preencha os dados abaixo para se registrar
          </p>
        </div>

        {/* Form Section */}
        <div className="p-6 sm:p-8">
          {/* Error message display */}
          {signupError && (
            <div className="mb-4 p-3 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm flex items-start">
              <AlertCircle size={16} className="mr-2 mt-0.5 flex-shrink-0" />
              <span>{signupError}</span>
            </div>
          )}

          {/* Success message display */}
          {signupSuccess && (
            <div className="mb-4 p-3 bg-green-50 border-l-4 border-green-500 text-green-700 text-sm flex items-start">
              <CheckCircle size={16} className="mr-2 mt-0.5 flex-shrink-0" />
              <span>Cadastro realizado com sucesso! Redirecionando...</span>
            </div>
          )}

          {/* Google Sign Up Button - Displayed at the top for better visibility */}
          <button
            type="button"
            onClick={handleRegisterGoogle}
            disabled={isGoogleSubmitting || isSubmitting}
            className={`w-full flex items-center justify-center gap-3 py-3 px-4 mb-6 bg-white border border-gray-300 hover:bg-gray-50 rounded-lg shadow-sm transition-colors ${
              isGoogleSubmitting || isSubmitting ? "opacity-70 cursor-not-allowed" : ""
            }`}
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
            <span className="text-gray-700 font-medium">
              {isGoogleSubmitting ? "Processando..." : "Registrar com Google"}
            </span>
          </button>
          
          {/* Divider */}
          <div className="relative flex items-center justify-center mb-6">
            <div className="border-t border-gray-300 w-48"></div>
            <span className="px-3 bg-white text-gray-500 text-sm">ou registre-se com email</span>
            <div className="border-t border-gray-300 w-48"></div>
          </div>

          <form onSubmit={handleRegister} className="space-y-4">
            {/* Name Field */}
            <div className="space-y-2">
              <label htmlFor="nome" className="block text-sm font-medium text-gray-700">
                Nome Completo
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User size={18} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  id="nome"
                  className={`block w-full pl-10 pr-3 py-3 rounded-lg border ${
                    errors.nome 
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500" 
                      : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  } focus:outline-none focus:ring-1 shadow-sm`}
                  placeholder="Seu nome completo"
                  value={dados.nome}
                  onChange={(e) => setDados({ ...dados, nome: e.target.value })}
                />
              </div>
              {errors.nome && (
                <p className="text-sm text-red-600 mt-1">{errors.nome}</p>
              )}
            </div>

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
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Senha
              </label>
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

            {/* Confirm Password Field */}
            <div className="space-y-2">
              <label htmlFor="confirmarSenha" className="block text-sm font-medium text-gray-700">
                Confirmar Senha
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock size={18} className="text-gray-400" />
                </div>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmarSenha"
                  className={`block w-full pl-10 pr-10 py-3 rounded-lg border ${
                    errors.confirmarSenha 
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500" 
                      : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  } focus:outline-none focus:ring-1 shadow-sm`}
                  placeholder="••••••••"
                  value={dados.confirmarSenha}
                  onChange={(e) => setDados({ ...dados, confirmarSenha: e.target.value })}
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <button
                    type="button"
                    className="text-gray-400 hover:text-gray-600"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    tabIndex="-1"
                  >
                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
              {errors.confirmarSenha && (
                <p className="text-sm text-red-600 mt-1">{errors.confirmarSenha}</p>
              )}
            </div>

            {/* Terms acceptance */}
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  required
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="terms" className="font-medium text-gray-700">
                  Concordo com os{" "}
                  <a href="#" className="text-blue-600 hover:text-blue-800 hover:underline">
                    Termos de Serviço
                  </a>{" "}
                  e{" "}
                  <a href="#" className="text-blue-600 hover:text-blue-800 hover:underline">
                    Política de Privacidade
                  </a>
                </label>
              </div>
            </div>

            {/* Register Button */}
            <button
              type="submit"
              disabled={isSubmitting || isGoogleSubmitting}
              className={`w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow transition-colors mt-6 ${
                isSubmitting || isGoogleSubmitting ? "opacity-80 cursor-not-allowed" : ""
              }`}
            >
              {isSubmitting ? "Processando..." : "Cadastrar"}
            </button>
          </form>

          {/* Login Link */}
          <div className="mt-6 text-center">
            <span className="text-gray-600">Já tem uma conta?</span>{" "}
            <Link to="/login" className="text-blue-600 hover:text-blue-800 hover:underline font-medium">
              Entrar
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

export default Cadastrar;