import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../../utils/context/themeContext";
import { CProvider } from "../../utils/context/autentication";
import { useGoogleLogin } from "@react-oauth/google";
import { googleAuth } from "../../utils/api/api";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  AlertCircle,
  CheckCircle,
  Google,
  Search,
  ArrowRight,
  Check,
  Phone,
} from "lucide-react";

const CadastrarUser = () => {
  const { darkMode } = useTheme();
  const navigate = useNavigate();
  const [checkConfirm, setCheckConfirm] = useState(false);
  const [dados, setDados] = useState({
    nome: "",
    telefone: "",
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

  // Auth context
  const { Register } = useContext(CProvider);

  // Form validation
  const validateForm = () => {
    let tempErrors = {};

    if (!dados.nome) {
      tempErrors.nome = "Nome é obrigatório";
    }

    if (!dados.telefone) {
      tempErrors.telefone = "Telefone é obrigatório";
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
          navigate("/login");
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
    <div
      className={`min-h-screen flex flex-col justify-center items-center p-4 ${
        darkMode
          ? "bg-gray-900 text-white"
          : "bg-gray-50 text-gray-900"
      }`}
    >
      {/* Logo Header */}
      <header className="mb-8">
        <h1 className="text-3xl font-bold">
          <span className="text-blue-600">Sapritec</span>
          <span className="text-gray-700">.service</span>
        </h1>
      </header>

      {/* Registration Card */}
      <div
        className={`w-full max-w-md rounded-2xl shadow-xl overflow-hidden ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
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
            className={`w-full flex items-center justify-center gap-3 py-3 px-4 mb-6 border rounded-lg shadow-sm transition-colors ${
              darkMode
                ? "bg-gray-700 text-gray-200 border-gray-600 hover:bg-gray-600"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
            } ${
              isGoogleSubmitting || isSubmitting ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            <Google size={20} />
            <span className="font-medium">
              {isGoogleSubmitting ? "Processando..." : "Registrar com Google"}
            </span>
          </button>

          {/* Divider */}
          <div className="relative flex items-center justify-center mb-6">
            <div className="border-t border-gray-300 w-full"></div>
            <span
              className={`px-3 text-sm ${
                darkMode ? "bg-gray-800 text-gray-500" : "bg-white text-gray-500"
              }`}
            >
              ou registre-se com email
            </span>
            <div className="border-t border-gray-300 w-full"></div>
          </div>

          <form onSubmit={handleRegister} className="space-y-4">
            {/* Name Field */}
            <div className="space-y-2">
              <label
                htmlFor="nome"
                className="block text-sm font-medium text-gray-700"
              >
                Nome Completo
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User size={18} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  id="nome"
                  className={`block w-full pl-10 pr-3 py-3 rounded-lg border shadow-sm ${
                    errors.nome
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  } focus:outline-none focus:ring-1 ${
                    darkMode ? "bg-gray-700 text-gray-200" : "bg-white text-gray-700"
                  }`}
                  placeholder="Seu nome completo"
                  value={dados.nome}
                  onChange={(e) =>
                    setDados({ ...dados, nome: e.target.value })
                  }
                />
              </div>
              {errors.nome && (
                <p className="text-sm text-red-600 mt-1">{errors.nome}</p>
              )}
            </div>

            {/* Phone Field */}
            <div className="space-y-2">
              <label
                htmlFor="telefone"
                className="block text-sm font-medium text-gray-700"
              >
                Telefone
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone size={18} className="text-gray-400" />
                </div>
                <input
                  type="tel"
                  id="telefone"
                  className={`block w-full pl-10 pr-3 py-3 rounded-lg border shadow-sm ${
                    errors.telefone
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  } focus:outline-none focus:ring-1 ${
                    darkMode ? "bg-gray-700 text-gray-200" : "bg-white text-gray-700"
                  }`}
                  placeholder="(+244) 999-999-999"
                  value={dados.telefone}
                  onChange={(e) =>
                    setDados({ ...dados, telefone: e.target.value })
                  }
                />
              </div>
              {errors.telefone && (
                <p className="text-sm text-red-600 mt-1">{errors.telefone}</p>
              )}
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail size={18} className="text-gray-400" />
                </div>
                <input
                  type="email"
                  id="email"
                  className={`block w-full pl-10 pr-3 py-3 rounded-lg border shadow-sm ${
                    errors.email
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  } focus:outline-none focus:ring-1 ${
                    darkMode ? "bg-gray-700 text-gray-200" : "bg-white text-gray-700"
                  }`}
                  placeholder="email@exemplo.com"
                  value={dados.email}
                  onChange={(e) =>
                    setDados({ ...dados, email: e.target.value })
                  }
                />
              </div>
              {errors.email && (
                <p className="text-sm text-red-600 mt-1">{errors.email}</p>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label
                htmlFor="senha"
                className="block text-sm font-medium text-gray-700"
              >
                Senha
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock size={18} className="text-gray-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  id="senha"
                  className={`block w-full pl-10 pr-10 py-3 rounded-lg border shadow-sm ${
                    errors.senha
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  } focus:outline-none focus:ring-1 ${
                    darkMode ? "bg-gray-700 text-gray-200" : "bg-white text-gray-700"
                  }`}
                  placeholder="••••••••"
                  value={dados.senha}
                  onChange={(e) =>
                    setDados({ ...dados, senha: e.target.value })
                  }
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
              <label
                htmlFor="confirmarSenha"
                className="block text-sm font-medium text-gray-700"
              >
                Confirmar Senha
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock size={18} className="text-gray-400" />
                </div>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmarSenha"
                  className={`block w-full pl-10 pr-10 py-3 rounded-lg border shadow-sm ${
                    errors.confirmarSenha
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  } focus:outline-none focus:ring-1 ${
                    darkMode ? "bg-gray-700 text-gray-200" : "bg-white text-gray-700"
                  }`}
                  placeholder="••••••••"
                  value={dados.confirmarSenha}
                  onChange={(e) =>
                    setDados({ ...dados, confirmarSenha: e.target.value })
                  }
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
                <p className="text-sm text-red-600 mt-1">
                  {errors.confirmarSenha}
                </p>
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
                  onClick={() => setCheckConfirm(!checkConfirm)}
                />
              </div>
              <div className="ml-3 text-sm">
                <label
                  htmlFor="terms"
                  className="font-medium text-gray-700"
                >
                  Concordo com os{" "}
                  <a
                    href="#"
                    className="text-blue-600 hover:text-blue-800 hover:underline"
                  >
                    Termos de Uso
                  </a>{" "}
                  e{" "}
                  <a
                    href="#"