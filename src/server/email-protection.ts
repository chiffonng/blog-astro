/**
 * @description Utilities for protecting email addresses from bots and scrapers
 */

/**
 * @description Obfuscates an email address using character encoding
 * @param {string} email - The email address to obfuscate
 * @returns {string} HTML-encoded email address
 */
export function obfuscateEmail(email: string): string {
  return email
    .split('')
    .map((char) => {
      // Mix of decimal and hex entities to make it harder to parse
      if (Math.random() > 0.5) {
        return `&#${char.charCodeAt(0)};`
      } else {
        return `&#x${char.charCodeAt(0).toString(16)};`
      }
    })
    .join('')
}

/**
 * @description Creates a data attribute for client-side email reveal
 * @param {string} email - The email address to encode
 * @returns {string} Base64 encoded email for data attribute
 */
export function encodeEmailForAttribute(email: string): string {
  return Buffer.from(email.split('').reverse().join(''), 'utf8').toString('base64')
}

/**
 * @description Creates a click-to-reveal email link
 * @param {string} email - The email address
 * @returns {object} Object containing obfuscated display and data attributes
 */
export function createProtectedEmail(email: string): {
  dataEmail: string
  obfuscated: string
} {
  const cleanEmail = email.replace('mailto:', '')
  return {
    dataEmail: encodeEmailForAttribute(cleanEmail),
    obfuscated: obfuscateEmail(cleanEmail)
  }
}
