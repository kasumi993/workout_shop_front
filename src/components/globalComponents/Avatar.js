import React from 'react';

function Avatar({ name, backgroundColor = 'bg-blue-300', textColor = 'text-white', size = 'w-12 h-12', rounded = 'rounded-full', textSize = 'text-lg' }) {
  const getInitials = (name) => {
    if (!name) return '';
    const nameParts = name.split(' ');
    const initials = nameParts
      .slice(0, 2) // Prend au maximum les deux premiers mots
      .map((part) => part.charAt(0).toUpperCase())
      .join('');
    return initials;
  };

  const initials = getInitials(name);

  return (
    <div className={`${size} ${rounded} ${backgroundColor} flex items-center justify-center`}>
      <span className={`${textColor} font-semibold ${textSize}`}>{initials}</span>
    </div>
  );
}

export default Avatar;