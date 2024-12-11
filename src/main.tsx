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
      manifestUrl="https://red-urgent-damselfly-771.mypinata.cloud/files/bafkreibrlhzl63sgcrjqi6lezasnz7lwi74b4t4qqxlpcuolivh63wuoqu?X-Algorithm=PINATA1&X-Date=1733906861&X-Expires=30&X-Method=GET&X-Signature=d229d01baf8d9c45476b0949e0428a6f0c43821768186c51aef5efae2931c46a"
      >
      <Provider store={store}>
        <App />
      </Provider>
    </TonConnectUIProvider>
  </StrictMode>,
)
