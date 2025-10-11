import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import DiagramView from './pages/DiagramView'

const App = () => (
    <BrowserRouter>
        <Routes>
            <Route path="/sankey/:user" element={<DiagramView />} />
            <Route 
                path="/" 
                element={<Navigate to="/sankey/defaultUserId" replace />} 
            />
            
            {/* Add a general 404 route if needed */}
            <Route path="*" element={<h1>404: Page Not Found</h1>} />
        </Routes>
    </BrowserRouter>
)

export default App