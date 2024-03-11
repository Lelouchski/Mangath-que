const lightMode = document.getElementById('lightmode');

        lightMode.addEventListener('click', function () {
            const currentTheme = document.documentElement.getAttribute('data-bs-theme')
            
            if (currentTheme === 'dark') {
                document.documentElement.setAttribute('data-bs-theme', 'none')
            } else {
                document.documentElement.setAttribute('data-bs-theme', 'dark')
            }
        })