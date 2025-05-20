// Utility functions for the Study Planner components

/**
 * Returns the appropriate color class based on priority level
 * @param {string} priority - Priority level (low, medium, high)
 * @returns {string} Tailwind CSS color class
 */
export const getPriorityColor = (priority) => {
  switch (priority) {
    case 'high':
      return 'text-red-500';
    case 'medium':
      return 'text-amber-500';
    case 'low':
      return 'text-green-500';
    default:
      return 'text-amber-500';
  }
};

/**
 * Calculates the number of days remaining until a given end date
 * @param {string} endDate - End date string in format 'YYYY-MM-DD'
 * @returns {number} Number of days remaining
 */
export const calculateDaysRemaining = (endDate) => {
  const today = new Date();
  const end = new Date(endDate);
  const diffTime = end - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays > 0 ? diffDays : 0;
};

/**
 * Calculates the total study hours for a plan
 * @param {string} startDate - Start date string in format 'YYYY-MM-DD'
 * @param {string} endDate - End date string in format 'YYYY-MM-DD'
 * @param {number} dailyHours - Hours of study per day
 * @returns {number} Total study hours
 */
export const calculateTotalHours = (startDate, endDate, dailyHours) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffTime = end - start;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // +1 to include start day
  return diffDays * dailyHours;
};

/**
 * Formats a date string for display
 * @param {string} dateString - Date string in format 'YYYY-MM-DD'
 * @returns {string} Formatted date string
 */
export const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

/**
 * Generates a unique ID for a study plan
 * @returns {string} Unique ID
 */
export const generatePlanId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
};