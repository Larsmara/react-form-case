export const setDocumentTheme = () => {
    const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    document.documentElement.className = "";
    document.documentElement.classList.add(`mode-${isDarkMode}`)
    document.documentElement.classList.add(isDarkMode)
}