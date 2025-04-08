import { Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { Toaster } from 'react-hot-toast'

const AppLayout = () => {
  return (
    <>
      <Toaster />
      <Outlet />
      {process.env.NODE_ENV !== 'production' && <TanStackRouterDevtools />}
    </>
  )
}

export default AppLayout
