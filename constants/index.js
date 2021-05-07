//const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const EMAIL_REGEX = /^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[-zA-Z0-9] {2,4}$/;

/* Test of the mail address structure */
if (email.value.match(EMAIL_REGEX)) {
    alert("Structure d'adresse e-mail correcte");
    return true;
} else {
    /* Screen an error message */
    alert(messageError);
    email.focus();
    return false;
}

/**
 * 1- Un numéro de téléphone français comporte 10 chiffres,
 * 2- Admettons que le premier chiffre est TOUJOURS un 0 (Abstraction de l'indicatif +33),
 * 3- Le deuxième chiffre va de 1 à 6 (1 pour la région parisienne… 6 pour les téléphones portables), 
 *    mais il y a aussi le 8 (ce sont des numéros spéciaux).
 *    !!! À noter que le 7 (nouveau n° portable) et le 9 (fixe à partir d'une box) commencent à être utilisés,
 *    mais que nous ne les prenons pas en compte (pour le moment dans cette Regex).
 * 4- Ensuite les 8 chiffres restants varie de 0 à 9.
 * 
 */
const TEL_FR_REGEX = / ^ 0[1 - 68]([-. ] ? [0 - 9]{ 2}){ 4}$/;
// Regex de tel à tester

