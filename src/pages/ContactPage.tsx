import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';
import { useState } from 'react';

export function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
      <div className="text-center mb-12">
        <h1 className="mb-4">Contacto</h1>
        <p className="text-lg">
          ¿Tienes alguna pregunta? Estamos aquí para ayudarte
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Contact Information */}
        <div>
          <h2 className="mb-8">Información de Contacto</h2>

          <div className="space-y-6 mb-8">
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-[--color-primary]/10 rounded-full flex items-center justify-center flex-shrink-0">
                <Mail className="w-6 h-6 text-[--color-primary]" />
              </div>
              <div>
                <h4 className="mb-1">Email</h4>
                <p className="text-sm">hola@pielpapel.com</p>
                <p className="text-sm text-[--color-text-light]">
                  Respuesta en 24-48 horas
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-12 h-12 bg-[--color-primary]/10 rounded-full flex items-center justify-center flex-shrink-0">
                <Phone className="w-6 h-6 text-[--color-primary]" />
              </div>
              <div>
                <h4 className="mb-1">Teléfono</h4>
                <p className="text-sm">+34 912 345 678</p>
                <p className="text-sm text-[--color-text-light]">
                  Lunes a Viernes: 9:00 - 18:00
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-12 h-12 bg-[--color-primary]/10 rounded-full flex items-center justify-center flex-shrink-0">
                <MapPin className="w-6 h-6 text-[--color-primary]" />
              </div>
              <div>
                <h4 className="mb-1">Dirección</h4>
                <p className="text-sm">Calle de la Cosmética, 123</p>
                <p className="text-sm">28001 Madrid, España</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-12 h-12 bg-[--color-primary]/10 rounded-full flex items-center justify-center flex-shrink-0">
                <Clock className="w-6 h-6 text-[--color-primary]" />
              </div>
              <div>
                <h4 className="mb-1">Horario de Atención</h4>
                <p className="text-sm">Lunes - Viernes: 9:00 - 18:00</p>
                <p className="text-sm">Sábados: 10:00 - 14:00</p>
                <p className="text-sm text-[--color-text-light]">Domingos: Cerrado</p>
              </div>
            </div>
          </div>

          {/* FAQ Preview */}
          <div className="bg-gradient-to-br from-pink-50 to-white rounded-lg p-6">
            <h4 className="mb-4">Preguntas Frecuentes</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-[--color-primary] mt-1">•</span>
                <span>¿Cuánto tarda el envío?</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[--color-primary] mt-1">•</span>
                <span>¿Los productos son originales?</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[--color-primary] mt-1">•</span>
                <span>¿Puedo hacer cambios o devoluciones?</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[--color-primary] mt-1">•</span>
                <span>¿Cómo elegir productos para mi tipo de piel?</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Contact Form */}
        <div>
          <div className="bg-white border border-[--color-border] rounded-lg p-8">
            <h3 className="mb-6">Envíanos un Mensaje</h3>

            {submitted ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Send className="w-8 h-8 text-green-600" />
                </div>
                <h4 className="mb-2">¡Mensaje enviado!</h4>
                <p className="text-sm text-[--color-text-light]">
                  Te responderemos lo antes posible
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block mb-2 text-sm">Nombre completo</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="w-full px-4 py-3 border border-[--color-border] rounded-lg outline-none focus:border-[--color-primary]"
                    placeholder="Tu nombre"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="w-full px-4 py-3 border border-[--color-border] rounded-lg outline-none focus:border-[--color-primary]"
                    placeholder="tu@email.com"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm">Asunto</label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    required
                    className="w-full px-4 py-3 border border-[--color-border] rounded-lg outline-none focus:border-[--color-primary]"
                  >
                    <option value="">Selecciona un asunto</option>
                    <option value="producto">Consulta sobre productos</option>
                    <option value="pedido">Estado de pedido</option>
                    <option value="devolucion">Cambios y devoluciones</option>
                    <option value="otro">Otro</option>
                  </select>
                </div>

                <div>
                  <label className="block mb-2 text-sm">Mensaje</label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-[--color-border] rounded-lg outline-none focus:border-[--color-primary] resize-none"
                    placeholder="¿En qué podemos ayudarte?"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-[--color-primary] text-white rounded-lg hover:bg-[--color-primary-dark] transition-colors flex items-center justify-center gap-2"
                >
                  <Send className="w-5 h-5" />
                  Enviar mensaje
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}