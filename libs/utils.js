export function generateSlug(name) {
  // Step 1: Normalize the string to remove accents (e.g., é → e)
  name = name.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  // Step 2: Convert to lowercase
  name = name.toLowerCase();

  // Step 3: Replace non-alphanumeric characters (except spaces and hyphens) with empty string
  name = name.replace(/[^a-z0-9\s-]/g, "");

  // Step 4: Replace multiple spaces or hyphens with a single hyphen
  name = name.replace(/[\s-]+/g, "-");

  // Step 5: Remove leading or trailing hyphens
  name = name.replace(/^-+|-+$/g, "");

  return name;
}
