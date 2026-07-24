import { useState } from 'react'
import { INITIAL_FORM, validateField, validateForm } from './settingsValidation'

function FieldError({ message }) {
  if (!message) return null
  return (
    <p className="mt-1 text-sm text-red-600" role="alert">
      {message}
    </p>
  )
}

function TextField({ id, label, error, ...inputProps }) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-slate-700">
        {label}
      </label>
      <input
        id={id}
        aria-invalid={Boolean(error)}
        className={`mt-1 block w-full rounded-lg border px-3 py-2 text-sm shadow-sm outline-none transition focus:ring-2 ${
          error
            ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
            : 'border-slate-300 focus:border-indigo-500 focus:ring-indigo-200'
        }`}
        {...inputProps}
      />
      <FieldError message={error} />
    </div>
  )
}

function SettingsForm() {
  const [form, setForm] = useState(INITIAL_FORM)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [status, setStatus] = useState('idle')

  function handleChange(event) {
    const { name, value } = event.target

    setForm((prev) => ({ ...prev, [name]: value }))

    if (touched[name]) {
      setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }))
    }
  }

  function handleBlur(event) {
    const { name, value } = event.target

    setTouched((prev) => ({ ...prev, [name]: true }))
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }))
  }

  function handleSubmit(event) {
    event.preventDefault()

    const validationErrors = validateForm(form)
    setErrors(validationErrors)
    setTouched({ username: true, email: true, password: true })

    if (Object.keys(validationErrors).length > 0) return

    setStatus('saved')
    setTimeout(() => setStatus('idle'), 3000)
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="space-y-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
    >
      <TextField
        id="username"
        name="username"
        label="Username"
        type="text"
        value={form.username}
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.username ? errors.username : ''}
        autoComplete="username"
        placeholder="jane_doe"
      />

      <TextField
        id="email"
        name="email"
        label="Email"
        type="email"
        value={form.email}
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.email ? errors.email : ''}
        autoComplete="email"
        placeholder="jane@example.com"
      />

      <TextField
        id="password"
        name="password"
        label="Password"
        type="password"
        value={form.password}
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.password ? errors.password : ''}
        autoComplete="new-password"
        placeholder="••••••••"
      />

      <div className="flex items-center justify-between pt-2">
        <button
          type="submit"
          className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Save settings
        </button>
        {status === 'saved' && (
          <p className="text-sm font-medium text-green-600" role="status">
            Settings saved successfully.
          </p>
        )}
      </div>
    </form>
  )
}

export default SettingsForm
