import { TextInput } from '../Input/text-input'
import { PasswordInput } from '../Input/password-input'
import { Button } from '../Button/button'
import { Radio } from '../Radio/radio'
import { ButtonSpinner } from '../ButtonSpinner/button-spinner'
import { useCadastroForm } from '../../hooks/useCadastroForm'

export function CadastroForm() {
  const {
    role,
    setRole,
    nome,
    ra,
    email,
    password,
    confirmPassword,
    errors,
    isSubmitting,
    apiError,
    updateField,
    submit,
    clearErrors,
  } = useCadastroForm()

  return (
    <section className="w-full rounded-2xl border border-[var(--color-gray-light)] bg-[var(--color-surface)] px-4 py-5 shadow-sm sm:px-6 sm:py-6 lg:px-8">
      <form
        onSubmit={(event) => {
          event.preventDefault()
          void submit()
        }}
        className="flex flex-col gap-3"
      >
        {apiError && (
          <p className="text-sm font-medium text-[var(--color-error)] text-center">
            {apiError}
          </p>
        )}
        <div className="flex justify-center gap-8">
          <Radio
            name="role"
            value="aluno"
            label="Aluno"
            checked={role === 'aluno'}
            onChange={() => {
              setRole('aluno')
              clearErrors()
            }}
          />
          <Radio
            name="role"
            value="professor"
            label="Professor"
            checked={role === 'professor'}
            onChange={() => {
              setRole('professor')
              clearErrors()
            }}
          />
        </div>

        <div className="flex flex-col gap-2">
          <TextInput
            label="Nome Completo"
            value={nome}
            onChange={(value) => updateField('nome', value)}
            isObrigatorie
            disabled={isSubmitting}
          />
          {errors.nome && (
            <p
              className="text-sm font-medium text-[var(--color-error)]"
              role="alert"
            >
              {errors.nome}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <TextInput
            label="RA"
            value={ra}
            onChange={(value) => updateField('ra', value)}
            isObrigatorie
            disabled={isSubmitting}
          />
          {errors.ra && (
            <p
              className="text-sm font-medium text-[var(--color-error)]"
              role="alert"
            >
              {errors.ra}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <TextInput
            label="E-mail"
            value={email}
            onChange={(value) => updateField('email', value)}
            isObrigatorie
            disabled={isSubmitting}
          />
          {errors.email && (
            <p
              className="text-sm font-medium text-[var(--color-error)]"
              role="alert"
            >
              {errors.email}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <PasswordInput
            label="Senha"
            value={password}
            onChange={(value) => updateField('password', value)}
            disabled={isSubmitting}
          />
          {errors.password && (
            <p
              className="text-sm font-medium text-[var(--color-error)]"
              role="alert"
            >
              {errors.password}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <PasswordInput
            label="Confirmar senha"
            value={confirmPassword}
            onChange={(value) => updateField('confirmPassword', value)}
            disabled={isSubmitting}
          />
          {errors.confirmPassword && (
            <p
              className="text-sm font-medium text-[var(--color-error)]"
              role="alert"
            >
              {errors.confirmPassword}
            </p>
          )}
        </div>

        <div className="pt-1 flex justify-center">
          <Button
            variant="primary"
            size="large"
            type="submit"
            disabled={isSubmitting}
            className="min-w-[120px]"
          >
            {isSubmitting ? <ButtonSpinner /> : 'Cadastrar'}
          </Button>
        </div>
      </form>
    </section>
  )
}
