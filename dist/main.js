"use strict";
// Define translation mappings
let translations = {};
// Fetch translations from JSON file
fetch('./src/translations.json')
    .then(response => response.json())
    .then((data) => {
    // Convert array of translation objects into a dictionary
    data.translations.forEach(translation => {
        translations[translation.input.toLowerCase()] = translation.output;
    });
})
    .catch(error => {
    console.error('Error loading translations:', error);
});
// Translate function
function translate(input) {
    // Split input text into words
    const words = input.trim().split(/\s+/);
    // Translate each word separately
    const translatedWords = words.map(word => {
        // Convert word to lowercase for case-insensitive matching
        const lowerWord = word.toLowerCase();
        // Check if word exists in translations
        if (lowerWord in translations) {
            // Get the output for the word
            const output = translations[lowerWord];
            // Check if the output is an array
            if (Array.isArray(output)) {
                // Choose a random output from the array
                const randomIndex = Math.floor(Math.random() * output.length);
                return output[randomIndex];
            }
            else {
                // Return translation if found
                return output;
            }
        }
        else {
            // Return original word if translation not found
            return word;
        }
    });
    // Join translated words back into a string
    return translatedWords.join('');
}
// Event listener for translate button click
document.addEventListener('DOMContentLoaded', () => {
    const translateBtn = document.getElementById('translate-btn');
    const inputText = document.getElementById('input-text');
    const outputText = document.getElementById('output-text');
    if (translateBtn && inputText && outputText) {
        translateBtn.addEventListener('click', () => {
            // Get input text
            const input = inputText.value.trim();
            if (!input) {
                swal({
                    title: "Error!",
                    text: "Please enter some text to translate.",
                    icon: "error",
                });
                return false;
            }
            else {
                // Translate input
                const translation = translate(input);
                // Update output text
                outputText.value = translation;
            }
        });
    }
    else {
        console.error('One or more elements not found.');
    }
});
const consoleStyles = `
    font-size: 20px;
    font-weight: bold;
    color: #FF5733;
`;
console.log('%cWarning: Do not paste any codes here unless you understand them. Hackers may attack you by that way.', consoleStyles);
