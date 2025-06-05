// src/components/ContactForm.jsx
import React, { useState } from "react";

const ContactForm = () => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [feedback, setFeedback] = useState({ tipo: "", texto: "" });

  const numeroWhatsApp = "5491124025510"; // tu número de WhatsApp con código de país

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nombre.trim() || !email.trim() || !mensaje.trim()) {
      setFeedback({ tipo: "error", texto: "Por favor completá todos los campos." });
      return;
    }

    // Construir el texto preconfigurado para WhatsApp
    const textoWhatsApp = `*Nuevo contacto desde el formulario*\n
*Nombre:* ${nombre}\n
*Email:* ${email}\n
*Mensaje:* ${mensaje}`;

    // Codificar para URL
    const textoCodificado = encodeURIComponent(textoWhatsApp);

    // URL de WhatsApp
    const url = `https://wa.me/${numeroWhatsApp}?text=${textoCodificado}`;

    // Abrir WhatsApp en nueva pestaña
    window.open(url, "_blank");

    // Mostrar feedback breve y resetear campos
    setFeedback({ tipo: "success", texto: "Se abrio WhatsApp para enviar tu mensaje." });
    setNombre("");
    setEmail("");
    setMensaje("");
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto space-y-4">
      <div>
        <label htmlFor="nombre" className="block text-gray-700 font-medium mb-1">
          Nombre
        </label>
        <input
          id="nombre"
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-blue-500 focus:outline-none"
          placeholder="Tu nombre"
          required
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-gray-700 font-medium mb-1">
          Correo electrónico
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-blue-500 focus:outline-none"
          placeholder="tu@correo.com"
          required
        />
      </div>

      <div>
        <label htmlFor="mensaje" className="block text-gray-700 font-medium mb-1">
          Mensaje
        </label>
        <textarea
          id="mensaje"
          rows="5"
          value={mensaje}
          onChange={(e) => setMensaje(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-blue-500 focus:outline-none"
          placeholder="Escribí tu mensaje..."
          required
        />
      </div>

      <button
        type="submit"
        className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded transition"
      >
        Enviar por WhatsApp
      </button>

      {feedback.texto && (
        <p
          className={`mt-2 text-center ${
            feedback.tipo === "success" ? "text-green-500" : "text-red-500"
          }`}
        >
          {feedback.texto}
        </p>
      )}
    </form>
  );
};

export default ContactForm;
