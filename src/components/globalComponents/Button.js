import Link from "next/link";

export default function Button({
    isLink,
    children,
    white,
    black,
    primary,
    outline,
    size,
    block,
    ...rest
  }) {
    // Base classes
    const baseClasses = `
      border-0
      py-1 px-4
      rounded
      cursor-pointer
      inline-flex
      items-center
      no-underline
      font-medium
      font-poppins
      transition-colors
      duration-200
      [&>svg]:h-4
      [&>svg]:mr-1
      [&>svg]:w-4
    `;
  
    // Size variants
    const sizeClasses = size === 'l' ? `
      text-lg
      py-2 px-5
      [&>svg]:h-5
      [&>svg]:mr-2
      [&>svg]:w-5
    ` : '';
  
    // Layout variants
    const layoutClasses = block ? 'block w-full' : '';
  
    // Color variants
    let colorClasses = '';
    if (white) {
      colorClasses = outline ? `
        bg-transparent
        text-white
        border
        border-white
        hover:bg-white
        hover:text-black
      ` : `
        bg-white
        text-black
        hover:bg-gray-100
      `;
    } else if (black) {
      colorClasses = outline ? `
        bg-transparent
        text-black
        border
        border-black
        hover:bg-black
        hover:text-white
      ` : `
        bg-black
        text-white
        hover:bg-gray-800
      `;
    } else if (primary) {
      colorClasses = outline ? `
        bg-transparent
        text-primary
        border
        border-primary
        hover:bg-primary
        hover:text-white
      ` : `
        bg-primary
        text-white
        border
        border-primary
        hover:bg-primary-dark
      `;
    }
  
    return (
        isLink ? (
            <Link className={`
                ${baseClasses}
                ${sizeClasses}
                ${layoutClasses}
                ${colorClasses}
              `}
              {...rest}>
                 {children}
              </Link>
    ) : (
        <button
        className={`
          ${baseClasses}
          ${sizeClasses}
          ${layoutClasses}
          ${colorClasses}
        `}
        {...rest}
      >
        {children}
      </button>
    )
)
  }