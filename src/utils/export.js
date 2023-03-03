export function download (data, name = "数据导出.xlsx") {
  if (!data) {
    return
  }
  let url = window.URL.createObjectURL(new Blob([data], { type: "application/vnd.ms-excel;charset=utf-8" }))
  let link = document.createElement('a')
  link.style.display = 'none'
  link.href = url
  link.setAttribute('download', name + '导出.xlsx')
  document.body.appendChild(link)
  link.click()
}
