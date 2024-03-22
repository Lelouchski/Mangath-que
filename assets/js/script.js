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

// ********valider formulaire inscription********************


// Fonction pour afficher un message d'erreur sous le label
function showError(element, errorMessage) {
    const parentElement = element.parentElement;
    const errorSpan = document.createElement('span');
    errorSpan.className = 'error-message';
    errorSpan.textContent = errorMessage;
    parentElement.insertBefore(errorSpan, parentElement.querySelector('label').nextSibling);
}

// Fonction pour afficher un message d'erreur global
function afficherMessageErreur(message) {
    const errorSpan = document.createElement('span');
    errorSpan.className = 'global-error';
    errorSpan.textContent = message;
    const buttonDiv = document.querySelector('#buttonDiv');
    buttonDiv.appendChild(errorSpan);
}

// Retirer les messages d'erreur globaux
function retirerMessageErreur() {
    const globalErrors = document.querySelectorAll('.global-error');
    globalErrors.forEach(error => error.remove());

    const errorMessage = document.querySelectorAll('.error-message')
    errorMessage.forEach(error => error.remove());

}



// Fonction pour vérifier si tous les champs sont remplis
function tousLesChampsRemplis() {
    // Vérifier si tous les champs requis sont remplis
    const requiredFields = document.forms['inscription'].querySelectorAll('input');
    let tousRemplis = true;
    requiredFields.forEach(field => {
        if (!field.value.trim()) {

            tousRemplis = false;
            return false; // Pour sortir de la boucle forEach
        }
    });
    return tousRemplis;
}




// Fonction de validation du formulaire
function validerFormulaire() {
    let submit = true;
    retirerMessageErreur()


    if (!tousLesChampsRemplis()) {
        afficherMessageErreur('Veuillez remplir tous les champs.');
        submit = false;
    }


    const username = document.getElementById('username');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const confPassword = document.getElementById('confPassword');

    // Vérifier si le nom d'utilisateur est conforme
    if (!username.value || username.value.length < 5) {
        showError(username, 'Le nom d\'utilisateur n\'est pas conforme.');
        submit = false;
    }

    // Vérifier si l'adresse e-mail est valide
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value || !emailRegex.test(email.value)) {
        showError(email, 'Veuillez entrer une adresse e-mail valide.');
        submit = false;

    }

    // Vérifier si le mot de passe a au moins 7 caractères
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{7,}$/
    if (!password.value || !passwordRegex.test(password.value)) {
        showError(password, 'Le mot de passe n\'est pas conforme');
        submit = false;
    }

    // Vérifier si les mots de passe sont identiques
    if (password.value !== confPassword.value) {
        showError(confPassword, 'Les mots de passe doivent être identiques.');
        submit = false;
    }


    if (submit) {
        document.forms['inscription'].submit() 
    }

}







// **************** Validation formulaire connexion************



  function tousLesChampsRemplisLogin() {
    const requiredFields = document.forms['Login'].querySelectorAll('input');
    let tousRemplis = true;
    requiredFields.forEach(field => {
      if (!field.value.trim()) {
        tousRemplis = false;
        return false;
      }
    });
    return tousRemplis;
  }

  function validerConnexion() {
    let submit = true;
    retirerMessageErreur()

    if (!tousLesChampsRemplisLogin()) {
      afficherMessageErreur('Veuillez remplir tous les champs.');
      submit = false;
    }

    const email = document.getElementById('email');
    const password = document.getElementById('password');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value || !emailRegex.test(email.value)) {
      showError(email, 'Veuillez entrer une adresse e-mail valide.');
      submit = false;
    }

    if (!password.value) {
      showError(password, 'vous avez oublié le mot de passe');
      submit = false;
    }

    if (submit) {
      document.forms['Login'].submit()
    }
  }