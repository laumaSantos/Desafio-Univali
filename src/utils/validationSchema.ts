import { z } from 'zod'

export const productSchema = z
  .object({
    name: z
      .string({ required_error: 'Campo obrigatório' })
      .min(1, 'Campo obrigatório')
      .max(50, 'Máximo de 50 caracteres')
      .regex(/^[A-Za-z\s]+$/, 'Somente letras e espaços'),

    unit: z.enum(['Litro', 'Quilograma', 'Unidade'], {
      required_error: 'Campo obrigatório',
      invalid_type_error: 'Selecione uma unidade válida',
    }),

    quantity: z
      .number({ invalid_type_error: 'Quantidade inválida' })
      .optional()
      .refine((val) => {
        if (val === undefined || val === null) return true
        return true
      }, 'Quantidade inválida'),

    price: z.string({ required_error: 'Campo obrigatório' }).min(1, 'Campo obrigatório'),
    perishable: z
      .boolean({
        required_error: 'Campo obrigatório',
        invalid_type_error: 'Campo obrigatório',
        coerce: true,
      })
      .default(false),

    expirationDate: z.string().optional(),
    manufacturingDate: z
      .string({ required_error: 'Campo obrigatório' })
      .min(1, 'Campo obrigatório'),
  })
  .superRefine((data, ctx) => {
    if (data.perishable) {
      if (!data.expirationDate) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['expirationDate'],
          message: 'Campo obrigatório',
        })
      } else {
        if (new Date(data.expirationDate) <= new Date()) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ['expirationDate'],
            message: 'Data inválida ou produto vencido',
          })
        }
      }
    }
    if (data.perishable && data.expirationDate && data.manufacturingDate) {
      if (new Date(data.manufacturingDate) > new Date(data.expirationDate)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['manufacturingDate'],
          message: 'Data de fabricação não pode ser posterior à validade',
        })
      }
    }
    if (data.quantity !== undefined) {
      const q = String(data.quantity)
      if (data.unit === 'Unidade') {
        if (!/^\d+$/.test(q)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ['quantity'],
            message: 'Quantidade inválida para a unidade selecionada',
          })
        }
      } else {
        if (!/^\d+(\.\d{1,3})?$/.test(q)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ['quantity'],
            message: 'Quantidade inválida para a unidade selecionada',
          })
        }
      }
    }
  })
