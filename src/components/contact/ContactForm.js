import { useState } from 'react';
import Input from '@/components/globalComponents/Input';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulation d'envoi (remplacer par votre logique d'envoi)
    try {
      // Vous pouvez intégrer ici votre service d'email (EmailJS, etc.)
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(null), 5000);
    }
  };

  const inputClass = "border border-gray-300 bg-white focus-within:border-primary";

  return (
    <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-800 mb-3">
          📧 Envoyez-nous un message
        </h3>
        <p className="text-gray-600">
          Remplissez le formulaire et nous vous répondrons rapidement
        </p>
      </div>

      {submitStatus === 'success' && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-800 text-center">
          ✅ Message envoyé avec succès ! Nous vous répondrons bientôt.
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800 text-center">
          ❌ Erreur lors de l&apos;envoi. Veuillez réessayer.
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <Input
            name="name"
            label="Votre nom complet"
            placeholder="Ex: Mamadou Fall"
            value={formData.name}
            onChange={handleChange}
            className={inputClass}
            required
          />
          
          <Input
            name="email"
            type="email"
            label="Adresse email"
            placeholder="Ex: moi@example.com"
            value={formData.email}
            onChange={handleChange}
            className={inputClass}
            required
          />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Input
            name="phone"
            type="tel"
            label="Numéro de téléphone"
            placeholder="Ex: +221 76 123 45 67"
            value={formData.phone}
            onChange={handleChange}
            className={inputClass}
          />
          
          <Input
            name="subject"
            label="Sujet de votre message"
            placeholder="Ex: Demande de devis"
            value={formData.subject}
            onChange={handleChange}
            className={inputClass}
            required
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
            Votre message détaillé
          </label>
          <div className={`flex rounded px-3 py-3 focus-within:ring-1 focus-within:ring-primary ${inputClass}`}>
            <textarea
              id="message"
              name="message"
              rows="6"
              placeholder="Décrivez-nous votre projet, vos besoins ou vos questions..."
              value={formData.message}
              onChange={handleChange}
              className="flex-1 outline-0 border-0 bg-transparent resize-none"
              required
            />
          </div>
        </div>

        <div className="pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-4 px-6 rounded-md font-bold text-lg transition-all duration-300 ${
              isSubmitting
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-primary hover:shadow-lg text-white'
            }`}
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Envoi en cours...</span>
              </div>
            ) : (
              '🚀 Envoyer le message'
            )}
          </button>
        </div>

        <div className="text-center text-sm text-gray-500">
          <p>
            🔒 Vos données sont protégées et ne seront jamais partagées
          </p>
        </div>
      </form>
    </div>
  );
}