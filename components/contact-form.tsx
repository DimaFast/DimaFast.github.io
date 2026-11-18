'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useId, useState } from 'react'
import { useForm } from 'react-hook-form'
import { site } from '@/lib/clinic'
import {
  contactFormSchemas,
  type ContactFormMode,
  type ContactFormValues,
} from './contact-form.schema'
import styles from './contact-form.module.css'

const bookingEndpoint = process.env.NEXT_PUBLIC_BOOKING_ENDPOINT

export function ContactForm({ mode, doctorName }: { mode: ContactFormMode; doctorName?: string }) {
  const id = useId()
  const [status, setStatus] = useState('')
  const full = mode === 'message'
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormValues>({
    defaultValues: { name: '', phone: '', email: '', message: '', website: '' },
    resolver: zodResolver(contactFormSchemas[mode]),
  })

  function field(name: Exclude<keyof ContactFormValues, 'website'>) {
    return {
      ...register(name),
      id: `${id}-${name}`,
      required: true,
      'aria-invalid': errors[name] ? true : undefined,
      'aria-describedby': errors[name] ? `${id}-${name}-error` : undefined,
    }
  }

  function fieldError(name: Exclude<keyof ContactFormValues, 'website'>) {
    const error = errors[name]?.message
    return (
      error && (
        <p className={styles.error} id={`${id}-${name}-error`} role="alert">
          {error}
        </p>
      )
    )
  }

  async function submit({ name, phone, email, message, website }: ContactFormValues) {
    const subject = full
      ? 'Повідомлення для медичного центру «Вербена»'
      : 'Запит на консультацію — «Вербена»'
    if (!bookingEndpoint) {
      const body = [
        ...(doctorName ? [`Лікар — ${doctorName}`] : []),
        `Ім’я — ${name}`,
        `Телефон — ${phone}`,
        ...(full ? [`Email — ${email}`, '', message] : []),
      ].join('\n')
      setStatus(
        'Відкриваємо поштову програму. Щоб передати заявку, надішліть у ній підготовлений лист.'
      )
      window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
      return
    }

    setStatus('Надсилаємо заявку…')
    try {
      const response = await fetch(bookingEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mode,
          name,
          phone,
          email,
          message,
          website,
          ...(doctorName ? { doctorName } : {}),
        }),
        signal: AbortSignal.timeout(12000),
      })
      const result: { success?: boolean } = await response.json()
      if (!response.ok || result.success !== true) throw new Error('Booking request rejected')
      reset()
      setStatus('Дякуємо! Вашу заявку надіслано.')
    } catch {
      setStatus(`Заявку не вдалося надіслати. Зателефонуйте нам за номером ${site.phone}.`)
    }
  }

  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit(submit, () => setStatus(''))}
      method="post"
      noValidate
      aria-label={
        doctorName
          ? `Запис на прийом • ${doctorName}`
          : full
            ? 'Форма зворотного зв’язку'
            : 'Швидка консультація'
      }
      aria-describedby={`${id}-method`}
    >
      <div>
        <label className="visually-hidden" htmlFor={`${id}-name`}>
          Ім’я
        </label>
        <input
          {...field('name')}
          type="text"
          autoComplete="name"
          placeholder="Ім’я *"
          maxLength={100}
        />
        {fieldError('name')}
      </div>
      {full && (
        <div>
          <label className="visually-hidden" htmlFor={`${id}-email`}>
            Email
          </label>
          <input
            {...field('email')}
            type="email"
            autoComplete="email"
            placeholder="Email *"
            maxLength={150}
          />
          {fieldError('email')}
        </div>
      )}
      <div>
        <label className="visually-hidden" htmlFor={`${id}-phone`}>
          Номер телефону
        </label>
        <input
          {...field('phone')}
          type="tel"
          autoComplete="tel"
          placeholder="Номер телефону *"
          maxLength={32}
        />
        {fieldError('phone')}
      </div>
      {full && (
        <div>
          <label className="visually-hidden" htmlFor={`${id}-message`}>
            Текст повідомлення
          </label>
          <textarea
            {...field('message')}
            placeholder="Текст повідомлення *"
            rows={4}
            maxLength={1000}
          />
          {fieldError('message')}
        </div>
      )}
      <div hidden>
        <label>
          Вебсайт <input {...register('website')} tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <button
        className={`button button-gold ${styles.submit}`}
        type="submit"
        disabled={isSubmitting}
      >
        Надіслати
      </button>
      <p id={`${id}-method`} className={styles.method}>
        {bookingEndpoint
          ? 'Надішліть лише контактні дані й організаційні запитання.'
          : 'Форма відкриє лист у вашій поштовій програмі.'}
      </p>
      <p className={styles.status} role="status">
        {status}
      </p>
    </form>
  )
}
