import React from 'react'

type TypographyProps = {
  variant: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body1' | 'body2'
  className?: string
  children: React.ReactNode
}

const Typography = ({ variant, className = '', children }: TypographyProps) => {
  let typographyClasses = ''

  switch (variant) {
    case 'h1':
      typographyClasses = 'text-5xl font-extrabold dark:text-white'
      return <h1 className={`${typographyClasses} ${className}`}>{children}</h1>
    case 'h2':
      typographyClasses = 'text-4xl font-bold dark:text-white'
      return <h2 className={`${typographyClasses} ${className}`}>{children}</h2>
    case 'h3':
      typographyClasses = 'text-3xl font-bold dark:text-white'
      return <h3 className={`${typographyClasses} ${className}`}>{children}</h3>
    case 'h4':
      typographyClasses = 'text-2xl font-bold dark:text-white'
      return <h4 className={`${typographyClasses} ${className}`}>{children}</h4>
    case 'h5':
      typographyClasses = 'text-xl font-bold dark:text-white'
      return <h5 className={`${typographyClasses} ${className}`}>{children}</h5>
    case 'h6':
      typographyClasses = 'text-lg font-bold dark:text-white'
      return <h6 className={`${typographyClasses} ${className}`}>{children}</h6>
    case 'body1':
      typographyClasses =
        'mb-3 text-lg text-gray-500 md:text-xl dark:text-gray-400'
      return <p className={`${typographyClasses} ${className}`}>{children}</p>
    case 'body2':
      typographyClasses = 'text-gray-500 dark:text-gray-400'
      return <p className={`${typographyClasses} ${className}`}>{children}</p>
    default:
      return null
  }
}

export default Typography