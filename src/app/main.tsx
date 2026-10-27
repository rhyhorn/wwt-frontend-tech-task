import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { Home } from '@/pages/Home'
import '@/shared/i18n'

import './main.css'
import { Providers } from './providers'

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<Providers>
			<Home />
		</Providers>
	</StrictMode>
)
