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
    .catch(error => console.error('Error loading translations:', error));
// Translate function
function translate(input) {
    // Convert input text to lowercase for case-insensitive matching
    const lowerInput = input.toLowerCase();
    // Check if input exists in translations
    if (lowerInput in translations) {
        // Return translation if found
        return translations[lowerInput];
    }
    else {
        // Return original input if translation not found
        return input;
    }
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
            // Translate input
            const translation = translate(input);
            // Update output text
            outputText.value = translation;
        });
    }
    else {
        console.error('One or more elements not found.');
    }
});
