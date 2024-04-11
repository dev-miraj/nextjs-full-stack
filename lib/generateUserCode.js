export function generateUserCode(prefix, fullName) {
  // Extract initials from the full name
  const initials = fullName
    .split(" ")
    .map((name) => name[0])
    .join("")
    .toUpperCase();

  // Generate a timestamp-based code
  const now = new Date();
  const timestampCode = `${now.getFullYear()}${(now.getMonth() + 1)
    .toString()
    .padStart(2, "0")}${now.getDate().toString().padStart(2, "0")}${now
    .getHours()
    .toString()
    .padStart(2, "0")}${now.getMinutes().toString().padStart(2, "0")}${now
    .getSeconds()
    .toString()
    .padStart(2, "0")}`;

  // Combine prefix, initials, and timestamp code to form the unique user code
  const userCode = `${prefix}-${initials}-${timestampCode}`;

  return userCode;
}
