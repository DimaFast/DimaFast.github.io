import { z } from 'zod'

const name = z
  .string()
  .trim()
  .min(1, 'Вкажіть ім’я.')
  .max(100, 'Ім’я має містити не більше 100 символів.')

const phone = z
  .string()
  .trim()
  .min(1, 'Вкажіть номер телефону.')
  .max(32, 'Номер телефону має містити не більше 32 символів.')
  .refine((value) => {
    const digits = value.replace(/\D/g, '').length
    return /^\+?[\d\s().-]+$/.test(value) && digits >= 9 && digits <= 15
  }, 'Введіть коректний номер телефону.')

const callback = z.object({
  name,
  phone,
  email: z.string(),
  message: z.string(),
  website: z.string(),
})

export const contactFormSchemas = {
  callback,
  message: callback.extend({
    email: z
      .string()
      .trim()
      .min(1, 'Вкажіть електронну пошту.')
      .max(150, 'Email має містити не більше 150 символів.')
      .email('Введіть коректну електронну адресу.'),
    message: z
      .string()
      .trim()
      .min(1, 'Введіть текст повідомлення.')
      .max(1000, 'Повідомлення має містити не більше 1000 символів.'),
  }),
}

export type ContactFormMode = keyof typeof contactFormSchemas
export type ContactFormValues = z.infer<typeof callback>
