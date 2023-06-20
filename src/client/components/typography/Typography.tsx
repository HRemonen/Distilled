import React from 'react'

type TypographyProps = {
  variant: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body1' | 'body2' | 'link'
  className?: string
  href?: string
  children: React.ReactNode
}

const Typography = ({
  variant,
  className = '',
  href = '#',
  children,
}: TypographyProps) => {
  let typographyClasses = ''

  switch (variant) {
    case 'h1':
      typographyClasses = 'text-5xl font-extrabold text-white'
      return <h1 className={`${typographyClasses} ${className}`}>{children}</h1>
    case 'h2':
      typographyClasses = 'text-4xl font-bold text-white'
      return <h2 className={`${typographyClasses} ${className}`}>{children}</h2>
    case 'h3':
      typographyClasses = 'text-3xl font-bold text-white'
      return <h3 className={`${typographyClasses} ${className}`}>{children}</h3>
    case 'h4':
      typographyClasses = 'text-2xl font-bold text-white'
      return <h4 className={`${typographyClasses} ${className}`}>{children}</h4>
    case 'h5':
      typographyClasses = 'text-xl font-bold text-white'
      return <h5 className={`${typographyClasses} ${className}`}>{children}</h5>
    case 'h6':
      typographyClasses = 'text-lg font-bold text-white'
      return <h6 className={`${typographyClasses} ${className}`}>{children}</h6>
    case 'body1':
      typographyClasses = 'mb-3 text-lg text-gray-400 md:text-xl'
      return <p className={`${typographyClasses} ${className}`}>{children}</p>
    case 'body2':
      typographyClasses = 'text-gray-400'
      return <p className={`${typographyClasses} ${className}`}>{children}</p>
    case 'link':
      typographyClasses = 'font-medium text-blue-500 hover:underline'
      return (
        <a href={href} className={`${typographyClasses} ${className}`}>
          {children}
        </a>
      )

    default:
      return null
  }
}

export default Typography
