import * as v from 'valibot'

export type CadastroFormErrors = {
  nome?: string
  role?: string
  ra?: string
  email?: string
  password?: string
  confirmPassword?: string
}

const cadastroSchema = v.pipe(
  v.object({
    nome: v.pipe(
      v.string('Nome é obrigatório'),
      v.minLength(3, 'Nome deve ter pelo menos 3 caracteres'),
      v.maxLength(100, 'Nome muito longo')
    ),
    role: v.picklist(['aluno', 'professor']),
    ra: v.pipe(
      v.string('RA é obrigatório'),
      v.minLength(1, 'RA é obrigatório'),
      v.regex(/^\d+$/, 'RA deve conter apenas números'),
      v.minLength(6, 'RA deve ter pelo menos 6 dígitos'),
      v.maxLength(10, 'RA inválido')
    ),
    email: v.pipe(
      v.string('E-mail é obrigatório'),
      v.minLength(1, 'E-mail é obrigatório'),
      v.email('E-mail inválido')
    ),
    password: v.pipe(
      v.string('Senha é obrigatória'),
      v.minLength(5, 'Senha deve ter pelo menos 5 caracteres')
    ),
    confirmPassword: v.pipe(
      v.string('Confirmação de senha é obrigatória'),
      v.minLength(5, 'Confirmação de senha deve ter pelo menos 5 caracteres')
    ),
  }),
  v.forward(
    v.check(
      (input) => input.password === input.confirmPassword,
      'As senhas não coincidem'
    ),
    ['password']
  ),
  v.forward(
    v.check(
      (input) => input.password === input.confirmPassword,
      'As senhas não coincidem'
    ),
    ['confirmPassword']
  )
)

export function validateCadastroForm(values: {
  nome: string
  role: 'aluno' | 'professor'
  ra: string
  email: string
  password: string
  confirmPassword: string
}): CadastroFormErrors {
  const result = v.safeParse(cadastroSchema, values)

  if (result.success) {
    return {}
  }

  const errors: CadastroFormErrors = {}

  for (const issue of result.issues) {
    const pathKey = issue.path?.[0]?.key
    if (
      pathKey === 'nome' ||
      pathKey === 'role' ||
      pathKey === 'ra' ||
      pathKey === 'email' ||
      pathKey === 'password' ||
      pathKey === 'confirmPassword'
    ) {
      errors[pathKey] = issue.message
    }
  }

  return errors
}
