export default function useAuth() {
  // TODO: Decouple in order to add functionality of active user 
  return JSON.parse(localStorage.getItem('user'))?.token !== undefined // && JSON.parse(localStorage.getItem('user'))?.user.active
}