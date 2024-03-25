function toggleDarkMode() {
    const currentTheme = document.documentElement.getAttribute('data-bs-theme') || 'none'
    const newTheme = currentTheme === 'dark' ? 'none' : 'dark'
    document.documentElement.setAttribute('data-bs-theme', newTheme)
    localStorage.setItem('theme', newTheme) // Enregistrer le thème dans le stockage local
}

// Ajouter un écouteur d'événements pour le clic sur le mode sombre
document.getElementById('lightmode').addEventListener('click', toggleDarkMode)

// Charger le thème à partir du stockage local lors du chargement de la page
window.addEventListener('load', () => {
    document.documentElement.setAttribute('data-bs-theme', localStorage.getItem('theme') || 'none')
})