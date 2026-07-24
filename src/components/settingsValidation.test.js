import { describe, expect, it } from 'vitest'
import { validateField, validateForm } from './settingsValidation'

describe('settingsValidation', () => {
  it('rejects usernames shorter than 3 characters', () => {
    expect(validateField('username', 'ab')).toBe('Username must be at least 3 characters.')
    expect(validateField('username', 'abc')).toBe('')
  })

  it('rejects invalid email addresses', () => {
    expect(validateField('email', 'not-an-email')).toBe('Enter a valid email address.')
    expect(validateField('email', 'user@example.com')).toBe('')
  })

  it('rejects passwords shorter than 6 characters', () => {
    expect(validateField('password', '12345')).toBe('Password must be at least 6 characters.')
    expect(validateField('password', '123456')).toBe('')
  })

  it('returns all errors when the form is invalid', () => {
    const errors = validateForm({
      username: 'ab',
      email: 'bad',
      password: '123',
    })

    expect(errors).toEqual({
      username: 'Username must be at least 3 characters.',
      email: 'Enter a valid email address.',
      password: 'Password must be at least 6 characters.',
    })
  })

  it('returns no errors when the form is valid', () => {
    const errors = validateForm({
      username: 'jane_doe',
      email: 'jane@example.com',
      password: 'secret123',
    })

    expect(errors).toEqual({})
  })
})
