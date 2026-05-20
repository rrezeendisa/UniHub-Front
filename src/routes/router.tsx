import { createBrowserRouter } from 'react-router-dom'
import { Layout } from '../components/Layout/layout'
import { HomePage } from '../pages/home/home-page'
import { LoginPage } from '../pages/login/login-page'
import { CadastroPage } from '../pages/cadastro/cadastro-page'
import { AgendarMesaPage } from '../pages/agendar-mesa/agendar-mesa-page'
import { AgendarSalaPage } from '../pages/agendar-sala/agendar-sala-page'
import { MeusAgendamentosPage } from '../pages/meus-agendamentos/meus-agendamentos'

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '/cadastro',
        element: <CadastroPage />,
      },
      {
        path: '/agendar-mesa',
        element: <AgendarMesaPage />,
      },
      {
        path: '/agendar-sala',
        element: <AgendarSalaPage />,
      },
      {
        path: '/meus-agendamentos',
        element: <MeusAgendamentosPage />,
      },
    ],
  },
])
