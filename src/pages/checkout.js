import { useState } from 'react';
import { HiOutlineCheck, HiOutlinePhone, HiOutlineEnvelope, HiOutlineLocationMarker, HiOutlineMapPin } from 'react-icons/hi2';
import { FaWhatsapp } from 'react-icons/fa';
import MainLayout from '@/layouts/MainLayout';

export default function CheckoutPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Personal Info
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    // Delivery Info
    address: '',
    city: 'Dakar',
    neighborhood: '',
    deliveryInstructions: '',
    // Payment Method
    paymentMethod: ''
  });

  const [errors, setErrors] = useState({});

  const mockCartItems = [
    { id: 1, title: 'Haltères Réglables 20kg', price: 45000, quantity: 2 },
    { id: 2, title: 'Tapis de Yoga Premium', price: 15000, quantity: 1 }
  ];

  const subtotal = mockCartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = subtotal > 50000 ? 0 : 2500;
  const total = subtotal + deliveryFee;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateStep = (stepNumber) => {
    const newErrors = {};
    
    if (stepNumber === 1) {
      if (!formData.firstName) newErrors.firstName = 'Prénom requis';
      if (!formData.lastName) newErrors.lastName = 'Nom requis';
      if (!formData.email) newErrors.email = 'Email requis';
      if (!formData.phone) newErrors.phone = 'Téléphone requis';
    }
    
    if (stepNumber === 2) {
      if (!formData.address) newErrors.address = 'Adresse requise';
      if (!formData.neighborhood) newErrors.neighborhood = 'Quartier requis';
    }
    
    if (stepNumber === 3) {
      if (!formData.paymentMethod) newErrors.paymentMethod = 'Méthode de paiement requise';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (validateStep(step)) {
      setStep(step + 1);
    }
  };

  const handlePreviousStep = () => {
    setStep(step - 1);
  };

  const handleSubmit = () => {
    if (validateStep(3)) {
      // Handle order submission
      alert('Commande confirmée! Redirection vers le paiement...');
    }
  };

  const neighborhoods = [
    'Plateau', 'Médina', 'Grand Dakar', 'Parcelles Assainies', 
    'Pikine', 'Guédiawaye', 'Rufisque', 'Almadies', 'Mermoz',
    'Sacré-Cœur', 'Point E', 'Fann', 'Yoff', 'Ngor'
  ];

  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4">
          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-center">
              {[1, 2, 3].map((num) => (
                <div key={num} className="flex items-center">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                    step >= num ? 'bg-gray-900 border-gray-900 text-white' : 'border-gray-300 text-gray-500'
                  }`}>
                    {step > num ? <HiOutlineCheck className="text-lg" /> : num}
                  </div>
                  {num < 3 && (
                    <div className={`w-20 sm:w-32 h-0.5 ${step > num ? 'bg-gray-900' : 'bg-gray-300'}`} />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-2 text-sm text-gray-600">
              <span className="flex-1 text-center">Informations</span>
              <span className="flex-1 text-center">Livraison</span>
              <span className="flex-1 text-center">Paiement</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow p-6">
                {/* Step 1: Personal Information */}
                {step === 1 && (
                  <div>
                    <h2 className="text-xl font-bold text-gray-800 mb-6">Informations personnelles</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Prénom *</label>
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            errors.firstName ? 'border-red-500' : 'border-gray-300'
                          }`}
                        />
                        {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nom *</label>
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            errors.lastName ? 'border-red-500' : 'border-gray-300'
                          }`}
                        />
                        {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                        <div className="relative">
                          <HiOutlineEnvelope className="absolute left-3 top-3 text-gray-400" />
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className={`w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                              errors.email ? 'border-red-500' : 'border-gray-300'
                            }`}
                            placeholder="exemple@email.com"
                          />
                        </div>
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone *</label>
                        <div className="relative">
                          <HiOutlinePhone className="absolute left-3 top-3 text-gray-400" />
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className={`w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                              errors.phone ? 'border-red-500' : 'border-gray-300'
                            }`}
                            placeholder="77 123 45 67"
                          />
                        </div>
                        {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 2: Delivery Information */}
                {step === 2 && (
                  <div>
                    <h2 className="text-xl font-bold text-gray-800 mb-6">Informations de livraison</h2>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Adresse complète *</label>
                        <div className="relative">
                          <HiOutlineMapPin className="absolute left-3 top-3 text-gray-400" />
                          <input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                            className={`w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                              errors.address ? 'border-red-500' : 'border-gray-300'
                            }`}
                            placeholder="Rue, numéro, immeuble..."
                          />
                        </div>
                        {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Ville</label>
                          <input
                            type="text"
                            name="city"
                            value={formData.city}
                            disabled
                            className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-50"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Quartier *</label>
                          <select
                            name="neighborhood"
                            value={formData.neighborhood}
                            onChange={handleInputChange}
                            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                              errors.neighborhood ? 'border-red-500' : 'border-gray-300'
                            }`}
                          >
                            <option value="">Sélectionner un quartier</option>
                            {neighborhoods.map(n => (
                              <option key={n} value={n}>{n}</option>
                            ))}
                          </select>
                          {errors.neighborhood && <p className="text-red-500 text-xs mt-1">{errors.neighborhood}</p>}
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Instructions de livraison (optionnel)</label>
                        <textarea
                          name="deliveryInstructions"
                          value={formData.deliveryInstructions}
                          onChange={handleInputChange}
                          rows="3"
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Indications pour le livreur..."
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 3: Payment Method */}
                {step === 3 && (
                  <div>
                    <h2 className="text-xl font-bold text-gray-800 mb-6">Méthode de paiement</h2>
                    <div className="space-y-3">
                      {/* Orange Money */}
                      <label className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        formData.paymentMethod === 'orange' ? 'border-orange-500 bg-orange-50' : 'border-gray-200 hover:border-gray-300'
                      }`}>
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="orange"
                          checked={formData.paymentMethod === 'orange'}
                          onChange={handleInputChange}
                          className="sr-only"
                        />
                        <div className="flex items-center justify-between w-full">
                          <div className="flex items-center">
                            <img src="/images/om.svg" alt="Orange Money" className="h-8 mr-3" />
                            <div>
                              <p className="font-medium">Orange Money</p>
                              <p className="text-sm text-gray-500">Paiement instantané</p>
                            </div>
                          </div>
                          <div className={`w-5 h-5 rounded-full border-2 ${
                            formData.paymentMethod === 'orange' ? 'border-orange-500 bg-orange-500' : 'border-gray-300'
                          }`}>
                            {formData.paymentMethod === 'orange' && (
                              <HiOutlineCheck className="text-white text-xs m-auto" />
                            )}
                          </div>
                        </div>
                      </label>

                      {/* Wave */}
                      <label className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        formData.paymentMethod === 'wave' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                      }`}>
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="wave"
                          checked={formData.paymentMethod === 'wave'}
                          onChange={handleInputChange}
                          className="sr-only"
                        />
                        <div className="flex items-center justify-between w-full">
                          <div className="flex items-center">
                            <img src="/images/wave.svg" alt="Wave" className="h-8 mr-3" />
                            <div>
                              <p className="font-medium">Wave</p>
                              <p className="text-sm text-gray-500">Paiement sécurisé</p>
                            </div>
                          </div>
                          <div className={`w-5 h-5 rounded-full border-2 ${
                            formData.paymentMethod === 'wave' ? 'border-blue-500 bg-blue-500' : 'border-gray-300'
                          }`}>
                            {formData.paymentMethod === 'wave' && (
                              <HiOutlineCheck className="text-white text-xs m-auto" />
                            )}
                          </div>
                        </div>
                      </label>

                      {/* WhatsApp */}
                      <label className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        formData.paymentMethod === 'whatsapp' ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:border-gray-300'
                      }`}>
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="whatsapp"
                          checked={formData.paymentMethod === 'whatsapp'}
                          onChange={handleInputChange}
                          className="sr-only"
                        />
                        <div className="flex items-center justify-between w-full">
                          <div className="flex items-center">
                            <FaWhatsapp className="text-3xl text-green-500 mr-3" />
                            <div>
                              <p className="font-medium">Commande WhatsApp</p>
                              <p className="text-sm text-gray-500">Finaliser par message</p>
                            </div>
                          </div>
                          <div className={`w-5 h-5 rounded-full border-2 ${
                            formData.paymentMethod === 'whatsapp' ? 'border-green-500 bg-green-500' : 'border-gray-300'
                          }`}>
                            {formData.paymentMethod === 'whatsapp' && (
                              <HiOutlineCheck className="text-white text-xs m-auto" />
                            )}
                          </div>
                        </div>
                      </label>
                    </div>
                    {errors.paymentMethod && <p className="text-red-500 text-sm mt-2">{errors.paymentMethod}</p>}
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-8">
                  {step > 1 && (
                    <button
                      onClick={handlePreviousStep}
                      className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition duration-200"
                    >
                      Précédent
                    </button>
                  )}
                  <div className={step === 1 ? 'ml-auto' : ''}>
                    {step < 3 ? (
                      <button
                        onClick={handleNextStep}
                        className="px-6 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition duration-200"
                      >
                        Suivant
                      </button>
                    ) : (
                      <button
                        onClick={handleSubmit}
                        className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-200"
                      >
                        Confirmer la commande
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow p-6 sticky top-4">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Résumé de la commande</h3>
                
                {/* Cart Items */}
                <div className="space-y-3 mb-4">
                  {mockCartItems.map(item => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="text-gray-600">{item.title} x{item.quantity}</span>
                      <span className="font-medium">{(item.price * item.quantity).toLocaleString('fr-FR')} FCFA</span>
                    </div>
                  ))}
                </div>
                
                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Sous-total</span>
                    <span>{subtotal.toLocaleString('fr-FR')} FCFA</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Livraison</span>
                    <span>{deliveryFee === 0 ? 'Gratuite' : `${deliveryFee.toLocaleString('fr-FR')} FCFA`}</span>
                  </div>
                  <div className="border-t pt-2">
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span className="text-green-600">{total.toLocaleString('fr-FR')} FCFA</span>
                    </div>
                  </div>
                </div>
                
                {/* Delivery Time */}
                <div className="mt-6 p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <span className="font-medium">Livraison estimée:</span> 1-2 jours ouvrables à Dakar
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}