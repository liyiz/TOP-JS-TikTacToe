document.addEventListener('DOMContentLoaded', () => {
    // Module/IIFE pattern for scoping
    const App = (() => {
      // Private variables/functions
      const init = () => { console.log("Hello, World!") }
      return {
        // Public methods (e.g., init)
        init
      };
    })();
  
    App.init(); // Start the app
  });