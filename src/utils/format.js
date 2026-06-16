// Format a byte count into a human-readable size (e.g. 272730423296 -> "254 GB").
export function formatBytes(bytes) {
  if (bytes == null || isNaN(bytes) || bytes <= 0) return null;
  const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB'];
  const i = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
  const value = bytes / Math.pow(1024, i);
  const rounded = value >= 100 || i === 0 ? Math.round(value) : value.toFixed(1);
  return `${rounded} ${units[i]}`;
}

// Resolve tags from a `tags` field (array or comma-separated string),
// falling back to the "Tags:" line embedded in the description.
export function getTags(pkg) {
  if (Array.isArray(pkg.tags)) {
    return pkg.tags.map(t => String(t).trim()).filter(Boolean);
  }
  if (typeof pkg.tags === 'string') {
    return splitTags(pkg.tags);
  }
  const match = (pkg.description || '').match(/^\s*Tags:\s*(.+)$/im);
  return match ? splitTags(match[1]) : [];
}

// A single download link is "uploading" when its name starts with "Uploading"
// (e.g. "Uploading...") or it has no usable URL yet.
export function isUploadingLink(link) {
  return /^uploading/i.test((link?.name || '').trim()) || !link?.url;
}

// A package is still uploading when it has download links but none are usable
// (every link is in the uploading state), so it isn't downloadable yet.
export function isUploading(pkg) {
  const links = pkg?.downloadLinks || [];
  return links.length > 0 && links.every(isUploadingLink);
}

// Decode a Base64-encoded string (UTF-8 safe). Returns the input unchanged
// if it isn't valid Base64 (e.g. an already-plain URL).
export function decodeBase64(str) {
  if (!str) return '';
  try {
    const binary = atob(str);
    const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0));
    return new TextDecoder().decode(bytes);
  } catch {
    return str;
  }
}

function splitTags(str) {
  return str
    .split(',')
    .map(t => t.trim())
    .filter(Boolean);
}
