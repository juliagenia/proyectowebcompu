import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import logo from '../img/logo.jpg';

function Login() {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [recordarme, setRecordarme] = useState(false); 
    const [error, setError] = useState('');
    const [enviando, setEnviando] = useState(false);
    const [mostrarPassword, setMostrarPassword] = useState(false);

    // Validaciones en tiempo real para la contraseña (Idéntico a Registro)
    const validaciones = {
        longitud: password.length >= 10,
        mayuscula: /[A-Z]/.test(password),
        numero: /[0-9]/.test(password),
        simbolo: /[^A-Za-z0-9]/.test(password)
    };

    const esPasswordValido = Object.values(validaciones).every(Boolean);

    const ejecutarLogin = async () => {
        setError('');

        if (!email || !password) {
            setError('Por favor completá todos los campos.');
            return;
        }

        if (!esPasswordValido) {
            setError('La contraseña no cumple con los requisitos de seguridad mínimos de compuMarket.');
            return;
        }

        try {
            setEnviando(true);
            await login(email, password, recordarme);
            navigate('/');
        } catch (err) {
            console.error('Error capturado en Login.jsx:', err);
            // Mensaje corregido y exacto que solicitaste
            setError('Las credenciales ingresadas son inválidas. Intente nuevamente.');
        } finally {
            setEnviando(false);
        }
    };

    // Permite iniciar sesión presionando Enter de forma controlada sin recargar la página
    const manejarKeyDown = (e) => {
        if (e.key === 'Enter') {
            ejecutarLogin();
        }
    };

    return (
        <div className="mx-auto max-w-md space-y-6 pt-4 px-4">
            {/* Encabezado con la identidad de compuMarket */}
            <div className="text-center flex flex-col items-center justify-center">
                <img 
                    src={logo}
                    alt="Logo compuMarket" 
                    className="h-14 w-auto mb-3 object-contain"
                />
                <h1 className="text-2xl font-black text-slate-900 tracking-tight"> Bienvenido de nuevo </h1>
                <p className="mt-1 text-xs text-slate-500 font-medium"> Accedé a tu cuenta de alto rendimiento en compuMarket </p>
            </div>

            {/* Banner de Errores Estilizado en Rojo (Mismo diseño de Registro) */}
            {error && (
                <div className="rounded-xl border border-red-200 bg-red-50 p-3.5 text-xs font-semibold text-red-700 flex items-center justify-between w-full">
                    <span className="flex items-center gap-1.5">⚠️ {error}</span>
                    <button 
                        type="button"
                        onClick={() => setError('')} 
                        className="text-red-500 hover:text-red-700 font-bold text-sm ml-2 px-1 cursor-pointer"
                    >
                        ×
                    </button>
                </div>
            )}

            {/* CAJA CENTRAL: Contenedor div para bloquear los refrescos involuntarios de la app */}
            <div onKeyDown={manejarKeyDown} className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div>
                    <label className="mb-1 block text-xs font-bold text-slate-700 uppercase tracking-wider">Email</label>
                    <input 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500 transition" 
                        placeholder="usuario@tecnico.com" 
                        required 
                    />
                </div>
                
                {/* Contraseña con Requisitos Dinámicos */}
                <div>
                    <div className="flex justify-between items-center mb-1">
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">Contraseña</label>
                        <Link to="/recuperar" className="text-xs font-semibold text-red-600 hover:underline"> Olvidé mi contraseña </Link>
                    </div>
                    <div className="relative">
                        <input 
                            type={mostrarPassword ? "text" : "password"}
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            className="w-full rounded-lg border border-slate-300 pl-3 pr-16 py-2 text-sm text-slate-900 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500 transition" 
                            placeholder="••••••••" 
                            required 
                        />
                        <button
                            type="button"
                            onClick={() => setMostrarPassword(!mostrarPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs font-bold select-none cursor-pointer"
                        >
                            {mostrarPassword ? "Ocultar" : "Mostrar"}
                        </button>
                    </div>

                    {/* Lista dinámica de requisitos que cambia a verde */}
                    <div className="mt-3 p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1.5 text-[11px] font-medium">
                        <p className="font-bold text-slate-400 uppercase tracking-wider mb-1 text-[10px]">Requisitos de seguridad:</p>
                        
                        <div className="flex items-center gap-1.5">
                            <span className={validaciones.longitud ? "text-green-600 font-bold" : "text-slate-400"}>
                                {validaciones.longitud ? "✓" : "○"} Mínimo 10 caracteres
                            </span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <span className={validaciones.mayuscula ? "text-green-600 font-bold" : "text-slate-400"}>
                                {validaciones.mayuscula ? "✓" : "○"} Al menos una mayúscula
                            </span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <span className={validaciones.numero ? "text-green-600 font-bold" : "text-slate-400"}>
                                {validaciones.numero ? "✓" : "○"} Al menos un número
                            </span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <span className={validaciones.simbolo ? "text-green-600 font-bold" : "text-slate-400"}>
                                {validaciones.simbolo ? "✓" : "○"} Al menos un símbolo o caracter especial
                            </span>
                        </div>
                    </div>
                </div>

                {/* Casillero Recordarme */}
                <div className="flex items-center">
                    <input 
                        id="recordarme" 
                        type="checkbox" 
                        checked={recordarme} 
                        onChange={(e) => setRecordarme(e.target.checked)} 
                        className="h-4 w-4 rounded border-gray-300 text-red-600 focus:ring-red-500 cursor-pointer" 
                    />
                    <label htmlFor="recordarme" className="ml-2 block text-xs text-slate-600 font-medium cursor-pointer select-none"> Recordarme </label>
                </div>

                {/* Botón de envío controlado por JS de tipo button */}
                <button 
                    type="button" 
                    onClick={ejecutarLogin}
                    disabled={enviando} 
                    className="w-full rounded-xl bg-red-600 py-3 text-center text-sm font-bold text-white transition hover:bg-red-700 active:bg-red-800 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm uppercase tracking-wider mt-2"
                >
                    {enviando ? 'Iniciando sesión...' : 'Iniciar Sesión →'}
                </button>
            </div>

            <p className="text-center text-xs text-slate-500 font-medium"> ¿No tienes una cuenta?{' '} <Link to="/registro" className="font-bold text-red-600 hover:underline"> Regístrate </Link> </p>
        </div>
    );
}

export default Login;



