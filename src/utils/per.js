import store from '@/store/index'
export function hasBtn (btn) {
  const mybtn = store.getters.btn
  if (mybtn) {
    return mybtn.indexOf(btn) > -1
  }
}