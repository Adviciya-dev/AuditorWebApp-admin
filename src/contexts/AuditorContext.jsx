import { createContext, useContext, useState } from 'react';

// Create the context
const AuditorContext = createContext(null);

// Context provider component
export const AuditorProvider = ({ children }) => {
  const [selectedCard, setSelectedCard] = useState(null);
  const [customerId, setCustomerId] = useState(null);
  const [statusData,setStatusData]=useState(null)

  return (
    <AuditorContext.Provider value={{ 
        selectedCard, 
        setSelectedCard,
         customerId,
          setCustomerId,
          statusData,
          setStatusData
          }}>
      {children}
    </AuditorContext.Provider>
  );
};

// Custom hook for consuming the context
export const useAuditor = () => {
  const context = useContext(AuditorContext);
  if (!context) {
    throw new Error('useAuditor must be used within an AuditorProvider');
  }
  return context;
};
