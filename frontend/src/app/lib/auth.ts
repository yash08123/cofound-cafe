export function checkAuth() {
  try {
    const userStr = localStorage.getItem('user');
    console.log('User data from localStorage:', userStr);

    if (!userStr) {
      console.log('No user data found in localStorage');
      return null;
    }

    const user = JSON.parse(userStr);
    console.log('Parsed user data:', user);

    if (!user.id) {
      console.log('No user ID found in user data');
      return null;
    }

    return user;
  } catch (error) {
    console.error('Auth check error:', error);
    return null;
  }
} 