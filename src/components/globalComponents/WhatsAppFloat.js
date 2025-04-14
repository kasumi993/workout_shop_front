import { FaWhatsapp } from 'react-icons/fa';

export default function WhatsAppFloat() {
  return (
    <a
      href="https://wa.me/221761978060"
      className="fixed w-14 h-14 bottom-8 right-8 bg-green-500 text-white rounded-full text-2xl flex items-center justify-center shadow-lg z-50 hover:bg-green-600 transition duration-300"
      target="_blank"
      rel="noopener noreferrer"
    >
      <FaWhatsapp />
    </a>
  );
}