// 存token
export function setToken(tokenKey,token) {
    return localStorage.setItem(tokenKey, token)
}
// 取token
export function getToken(token) {
    return localStorage.getItem(token)
}
// 删除token
export function removerToken() {
    return localStorage.removeItem('token')

}
