import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { QueryClientProvider } from '@tanstack/react-query'

import { Home } from '../pages/Home'
import { queryClient } from '../query.ts'
import '../shared/i18n'
import './main.css'

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<QueryClientProvider client={queryClient}>
			<Home />
		</QueryClientProvider>
	</StrictMode>
)
