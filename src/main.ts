// SweetAlert Variable Declaration
declare var swal: any;

// Define translation mappings
let translations: { [key: string]: string } = {};

// Fetch translations from JSON file
fetch('./src/translations.json')
    .then(response => response.json())
    .then((data: { translations: { input: string; output: string }[] }) => {
        // Convert array of translation objects into a dictionary
        data.translations.forEach(translation => {
            translations[translation.input.toLowerCase()] = translation.output;
        });
    })
    .catch(error => {
        console.error('Error loading translations:', error);
    });

// Translate function
function translate(input: string): string {
    // Convert input text to lowercase for case-insensitive matching
    const lowerInput = input.toLowerCase();
    
    // Check if input exists in translations
    if (lowerInput in translations) {
        // Return translation if found
        return translations[lowerInput];
    } else {
        // Return original input if translation not found
        return input;
    }
}

// Event listener for translate button click
document.addEventListener('DOMContentLoaded', () => {
    const translateBtn = document.getElementById('translate-btn') as HTMLButtonElement;
    const inputText = document.getElementById('input-text') as HTMLTextAreaElement;
    const outputText = document.getElementById('output-text') as HTMLTextAreaElement;

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
    } else {
        console.error('One or more elements not found.');
    }
});

const consoleStyles = `
    font-size: 20px;
    font-weight: bold;
    color: #FF5733;
`;

console.log('%cWarning: Do not paste any codes here unless you understand them. Hackers may attack you by that way.', consoleStyles);
