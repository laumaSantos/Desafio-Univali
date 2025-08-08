import { z } from 'zod'

export const productSchema = z.object({
  name: z
    .string()
    .nonempty('Campo obrigatório')
    .max(50, 'Máximo de 50 caracteres')
    .regex(/^[A-Za-z\s]+$/, 'Somente letras e espaços'),

  unit: z.enum(['Litro', 'Quilograma', 'Unidade'], {
    error: 'Selecione uma unidade válida',
  }),

  quantity: z
    .number()
    .optional()
    .refine(
      (val, ctx) => {
        const unit = ctx?.parent?.unit
        if (!val || val === '') return true

        if (unit === 'Unidade') return /^\d+$/.test(val)
        return /^\d+(\.\d{1,3})?$/.test(val)
      },
      {
        message: 'Quantidade inválida para a unidade selecionada',
      },
    ),

  price: z
    .string()
    .nonempty('Campo obrigatório')
    .regex(/^\d+(,\d{2})?$/, 'Formato monetário inválido'),

  perishable: z.boolean({
    error: 'Campo obrigatório',
  }),
  expirationDate: z
    .string()
    .optional()
    .refine(
      (val, ctx) => {
        if (!ctx?.parent?.perishable) return true
        if (!val) return false
        return new Date(val) > new Date()
      },
      {
        message: 'Data inválida ou produto vencido',
      },
    ),

  manufacturingDate: z
    .string()
    .nonempty('Campo obrigatório')
    .refine(
      (val, ctx) => {
        const expiration = ctx?.parent?.expirationDate
        if (!ctx?.parent?.perishable || !expiration) return true
        return new Date(val) <= new Date(expiration)
      },
      {
        message: 'Data de fabricação não pode ser posterior à validade',
      },
    ),
})
