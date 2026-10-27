import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { QueryClientProvider } from '@tanstack/react-query'

import { queryClient } from '@/shared/api'

import { Home } from '../pages/Home'
import '../shared/i18n'
import './main.css'

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<QueryClientProvider client={queryClient}>
			<Home />
		</QueryClientProvider>
	</StrictMode>
)
