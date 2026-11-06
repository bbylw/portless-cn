/** 复制文本到剪贴板。非安全上下文或权限被拒时返回 false，不向外抛异常。 */
export async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}
