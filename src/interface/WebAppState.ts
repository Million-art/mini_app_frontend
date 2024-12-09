export type WebAppState = {
    id: string; // Unique identifier for the web app instance, likely tied to a user
    firstName: string; // User's first name
    lastName?: string; // User's last name (optional)
    userName?: string; // User's username (optional)
    languageCode?: string; // Preferred language code for the app (optional)
  };
  