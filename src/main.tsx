import React from 'react'
import ReactDOM from 'react-dom/client'

import { QueryClient, QueryClientProvider } from 'react-query'

// import { ReactQueryDevtools } from 'react-query/devtools'

// Metronics
import { MetronicI18nProvider } from './_metronic/i18n/Metronici18n.tsx'
import './_metronic/assets/sass/style.react.scss'
import './_metronic/assets/fonticon/fonticon.css'
import './_metronic/assets/keenicons/duotone/style.css'
import './_metronic/assets/keenicons/outline/style.css'
import './_metronic/assets/keenicons/solid/style.css'

import './_metronic/assets/sass/style.scss'
import { AppRoutes } from './app/routing/AppRoutes.tsx'
import { AuthProvider } from './app/modules/auth/index.ts'
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then((registrations) => {
    registrations.forEach((registration) => {
      registration.unregister();
    });
  });
  // navigator.serviceWorker.register('src/firebase-messaging-sw.js')
  //   .then((registration) => {
  //     console.log('Service Worker registered with scope:', registration.scope);
  //   })
  //   .catch((error) => {
  //     console.error('Service Worker registration failed:', error);
  //   });
}

const queryClient = new QueryClient()
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <MetronicI18nProvider>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </MetronicI18nProvider>
    </QueryClientProvider>
    {/* <ReactQueryDevtools initialIsOpen={false} /> */}
  </React.StrictMode>,
)
