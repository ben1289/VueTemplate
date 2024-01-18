export function downloadByBlob(data: Blob, fileName: string, mimeType?: string) {
  const blob = mimeType ? new Blob([data], { type: mimeType }) : new Blob([data])
  const href = URL.createObjectURL(blob)
  const aTag = document.createElement('a')
  aTag.href = href
  aTag.download = fileName
  aTag.click()
  URL.revokeObjectURL(href)
}
