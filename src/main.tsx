import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import '@/styles/index.css'
import App from '@/App'
import { store } from '@/store/store'
import { postEvent } from '@telegram-apps/sdk';
import { TonConnectUIProvider } from '@tonconnect/ui-react'
postEvent('web_app_setup_closing_behavior', { need_confirmation: true });

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TonConnectUIProvider
      manifestUrl="https://red-urgent-damselfly-771.mypinata.cloud/files/bafkreifk3ef4hrbgdtrp5zqtqu6ba3yf4chirskvzvbkj3pfqeamrl7q5i?X-Algorithm=PINATA1&X-Date=1733899842&X-Expires=30&X-Method=GET&X-Signature=35e22f6873d02c27c68f580ee2ee5680f85cef643eda405bad0c299e3ca845b9"
    >
      <Provider store={store}>
        <App />
      </Provider>
    </TonConnectUIProvider>
  </StrictMode>,
)
