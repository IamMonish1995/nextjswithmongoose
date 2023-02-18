import { createContext, useState } from "react";
export const AppContext = createContext();

const MyApp = ({ Component, pageProps }) => {
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <AppContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      <Component {...pageProps} />
    </AppContext.Provider>
  );
};
export default MyApp;
