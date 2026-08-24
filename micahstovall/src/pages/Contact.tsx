import { useState } from 'react'

function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={
        'w-full rounded-[1.75rem] border border-violet-300/15 bg-[#1c0d2a]/80 p-8 shadow-[0_20px_100px_-40px_rgba(168,85,247,0.35)] backdrop-blur-xl ' +
        className
      }
    >
      {children}
    </div>
  )
}

export default function Contact() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [touched, setTouched] = useState({ name: false, email: false, message: false })

  const validate = () => {
    const errs: { name?: string; email?: string; message?: string } = {}
    if (!name.trim()) errs.name = 'Name is required'
    if (!email.trim()) errs.email = 'Email is required'
    else if (!/^[\w-.]+@[\w-]+\.[A-Za-z]{2,}$/.test(email)) errs.email = 'Please enter a valid email'
    if (!message.trim()) errs.message = 'Message is required'
    return errs
  }

  const errors = validate()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setTouched({ name: true, email: true, message: true })
    if (Object.keys(errors).length > 0) return

    const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID
    const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
    const USER_ID = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

    if (!SERVICE_ID || !TEMPLATE_ID || !USER_ID) {
      setError('Email service is not configured. Please set VITE_EMAILJS_ env vars.')
      return
    }

    setLoading(true)
    setError(null)
    setSuccess(null)

    try {
      const res = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service_id: SERVICE_ID,
          template_id: TEMPLATE_ID,
          user_id: USER_ID,
          template_params: {
            from_name: name,
            from_email: email,
            message,
            to_email: 'info@micahstovall.com',
          },
        }),
      })

      if (!res.ok) {
        const text = await res.text()
        throw new Error(text || 'Failed to send message')
      }

      setSuccess('Thanks — your message was sent successfully.')
      setName('')
      setEmail('')
      setMessage('')
    } catch (err: any) {
      setError(err?.message || 'An error occurred while sending the message.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="mx-auto flex min-h-[60vh] w-full max-w-5xl items-start justify-center px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <div className="w-full space-y-8">
        <Card>
          <h1 className="text-3xl font-semibold tracking-tight text-white">Contact</h1>
          <p className="mt-2 text-sm leading-7 text-violet-100/80">
            I aim to respond within 2 business days. For project inquiries, portfolio licensing, or
            press requests, please use the form below. For urgent matters, email{' '}
            <span className="font-medium text-yellow-200">info@micahstovall.com</span> directly.
          </p>
        </Card>

        <Card className="p-6">
          <form onSubmit={handleSubmit} className="grid gap-4">
            <label className="flex flex-col">
              <span className="mb-2 text-sm font-medium text-violet-100">Name</span>
              <input
                className={`w-full rounded-xl border border-violet-300/20 bg-[#120914]/70 px-4 py-3 text-sm text-white placeholder:text-violet-200/50 focus:outline-none focus:ring-2 focus:ring-yellow-300/50 ${
                  touched.name && errors.name ? 'ring-2 ring-red-400/50' : ''
                }`}
                value={name}
                onChange={(e) => setName(e.target.value)}
                onBlur={() => setTouched((t) => ({ ...t, name: true }))}
                placeholder="Your name"
              />
              {touched.name && errors.name ? (
                <span className="mt-1 text-xs text-red-600">{errors.name}</span>
              ) : null}
            </label>

            <label className="flex flex-col">
              <span className="mb-2 text-sm font-medium text-violet-100">Email</span>
              <input
                className={`w-full rounded-xl border border-violet-300/20 bg-[#120914]/70 px-4 py-3 text-sm text-white placeholder:text-violet-200/50 focus:outline-none focus:ring-2 focus:ring-yellow-300/50 ${
                  touched.email && errors.email ? 'ring-2 ring-red-400/50' : ''
                }`}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={() => setTouched((t) => ({ ...t, email: true }))}
                placeholder="you@example.com"
                type="email"
              />
              {touched.email && errors.email ? (
                <span className="mt-1 text-xs text-red-600">{errors.email}</span>
              ) : null}
            </label>

            <label className="flex flex-col">
              <span className="mb-2 text-sm font-medium text-violet-100">Message</span>
              <textarea
                className={`min-h-[140px] w-full rounded-2xl border border-violet-300/20 bg-[#120914]/70 px-4 py-3 text-sm text-white placeholder:text-violet-200/50 focus:outline-none focus:ring-2 focus:ring-yellow-300/50 ${
                  touched.message && errors.message ? 'ring-2 ring-red-400/50' : ''
                }`}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onBlur={() => setTouched((t) => ({ ...t, message: true }))}
                placeholder="Write your message"
              />
              {touched.message && errors.message ? (
                <span className="mt-1 text-xs text-red-600">{errors.message}</span>
              ) : null}
            </label>

            <div className="flex items-center justify-between gap-4">
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center justify-center rounded-full bg-yellow-300 px-5 py-3 text-sm font-medium text-violet-950 transition hover:bg-yellow-200 disabled:opacity-60"
              >
                {loading ? 'Sending…' : 'Send message'}
              </button>

              <div className="text-right text-sm">
                {success ? <div className="text-green-600">{success}</div> : null}
                {error ? <div className="text-red-600">{error}</div> : null}
              </div>
            </div>
          </form>
        </Card>
      </div>
    </section>
  )
}
