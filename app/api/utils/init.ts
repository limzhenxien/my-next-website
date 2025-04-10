import { initializeDataScheduler, refreshCourtData } from './scheduler';

// Flag to track if the scheduler has been initialized
let isInitialized = false;

// Function to initialize the API services
export async function initializeApiServices() {
  // Only run once
  if (isInitialized) {
    return;
  }
  
  try {
    console.log('Initializing API services...');
    
    // Initialize data scheduler
    await initializeDataScheduler();
    
    // Set up periodic refresh (every hour)
    if (typeof window === 'undefined') { // Only run on the server
      setInterval(async () => {
        // Get today and next 2 days to refresh
        const dates = [];
        const today = new Date();
        
        for (let i = 0; i < 3; i++) {
          const date = new Date(today);
          date.setDate(today.getDate() + i);
          
          const formattedDate = date.toISOString().split('T')[0]; // YYYY-MM-DD
          dates.push(formattedDate);
        }
        
        // Refresh data for each date
        for (const date of dates) {
          await refreshCourtData(date);
        }
        
        console.log('Scheduled court data refresh completed');
      }, 60 * 60 * 1000); // Refresh every hour
    }
    
    isInitialized = true;
    console.log('API services initialized successfully');
  } catch (error) {
    console.error('Error initializing API services:', error);
  }
}

// Self-executing initialization
(() => {
  if (typeof window === 'undefined') { // Only run on the server
    // Initialize services
    initializeApiServices().catch(error => {
      console.error('Failed to initialize API services:', error);
    });
  }
})(); 