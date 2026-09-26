// Build-time only: renders the page to static HTML so crawlers see real content.
import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import { App } from './App.tsx'

export function render() {
  return renderToString(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}
