import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import SettingsForm from './SettingsForm'

describe('SettingsForm', () => {
  it('shows red error messages when submitted with invalid values', async () => {
    const user = userEvent.setup()

    render(<SettingsForm />)

    await user.type(screen.getByLabelText(/username/i), 'ab')
    await user.type(screen.getByLabelText(/email/i), 'not-an-email')
    await user.type(screen.getByLabelText(/password/i), '12345')
    await user.click(screen.getByRole('button', { name: /save settings/i }))

    expect(screen.getByText('Username must be at least 3 characters.')).toBeInTheDocument()
    expect(screen.getByText('Enter a valid email address.')).toBeInTheDocument()
    expect(screen.getByText('Password must be at least 6 characters.')).toBeInTheDocument()
  })

  it('shows success message when all fields are valid', async () => {
    const user = userEvent.setup()

    render(<SettingsForm />)

    await user.type(screen.getByLabelText(/username/i), 'jane_doe')
    await user.type(screen.getByLabelText(/email/i), 'jane@example.com')
    await user.type(screen.getByLabelText(/password/i), 'secret123')
    await user.click(screen.getByRole('button', { name: /save settings/i }))

    expect(screen.getByText('Settings saved successfully.')).toBeInTheDocument()
    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
  })
})
