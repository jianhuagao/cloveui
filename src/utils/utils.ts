/**
 * 移除字符串开头的数字和点号（例如 "1.baseComp" -> "baseComp"）
 * @param str 传入的字符串
 * @returns 处理后的字符串
 */
export function removeLeadingNumberDot(str: string): string {
  return str.replace(/^\d+\./, '');
}
