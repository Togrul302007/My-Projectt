const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export const INITIAL_FORM = {
  username: '',
  email: '',
  password: '',
}

export function validateField(name, value) {
  switch (name) {
    case 'username': {
      if (value.length < 3) return 'Username must be at least 3 characters.'
      return ''
    }
    case 'email': {
      if (!EMAIL_PATTERN.test(value.trim())) return 'Enter a valid email address.'
      return ''
    }
    case 'password': {
      if (value.length < 6) return 'Password must be at least 6 characters.'
      return ''
    }
    default:
      return ''
  }
}

export function validateForm(form) {
  const fields = ['username', 'email', 'password']
  return fields.reduce((errors, field) => {
    const message = validateField(field, form[field])
    if (message) errors[field] = message
    return errors
  }, {})
}
