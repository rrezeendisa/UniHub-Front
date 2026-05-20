import axios from 'axios';

export function getErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    // Tenta capturar a mensagem da API
    const apiMessage = error.response?.data?.message;
    
    if (apiMessage) {
      return apiMessage;
    }

    // Se for erro 400 sem mensagem específica, ou outro erro de resposta
    if (error.response?.status === 400) {
      return 'Já existe uma reserva para este espaço no horário selecionado.';
    }
  }
  
  if (error instanceof Error) {
    // Evita retornar "Request failed with status code 400" se possível
    if (error.message.includes('status code 400')) {
        return 'Já existe uma reserva para este espaço no horário selecionado.';
    }
    return error.message;
  }

  return 'Ocorreu um erro ao processar sua reserva. Tente novamente.';
}
