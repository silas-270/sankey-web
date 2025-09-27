import { useState, useMemo } from 'react';
import styles from './TextInput.module.css';

const TextInput = ({
    value,
    onChange,
    placeholder = '',
    style,
    suggestions = [] // Ensure a default empty array
}) => {
    // State to hold the current ghost suggestion
    const [ghostText, setGhostText] = useState('');

    // Function to find the best suggestion based on the current value
    const findSuggestion = (currentValue) => {
        if (!currentValue) return '';

        const lowerCaseValue = currentValue.toLowerCase();
        
        // Find the first suggestion that starts with the current value
        const match = suggestions.find(s => 
            s.toLowerCase().startsWith(lowerCaseValue)
        );

        console.log(match)

        // If a match is found, return the full text of the suggestion
        // This will be used to calculate the ghost text
        return match || '';
    };

    // Use useMemo to calculate the ghost text whenever value or suggestions change
    useMemo(() => {
        const fullSuggestion = findSuggestion(value);
        if (fullSuggestion && fullSuggestion.length > value.length) {
            // The ghost text is the part of the suggestion after the current input value
            setGhostText(fullSuggestion);
        } else {
            setGhostText('');
        }
    }, [value, suggestions]);

    // Handle keydown for the 'Tab' or 'Arrow Right' key to accept the suggestion
    const handleKeyDown = (e) => {
        if (ghostText) {
            // Tab or Right Arrow accepts the ghost text
            if (e.key === 'Tab' || e.key === 'ArrowRight') {
                e.preventDefault(); // Prevent default tab focus change
                onChange(ghostText); // Set the full suggestion as the new value
                setGhostText(''); // Clear the ghost text
            }
        }
    };

    // The handler for the input field change
    const handleChange = (e) => {
        onChange(e.target.value);
    };

    return (
        <div className={styles.container} style={style}>
            {/* The Ghost Text overlay */}
            {ghostText && (
                <div className={styles.ghostText}>
                    {/* Render the current value + the rest of the suggestion */}
                    <span className={styles.ghostPrefix}>{value}</span>
                    <span className={styles.ghostSuffix}>
                        {ghostText.substring(value.length)}
                    </span>
                </div>
            )}
            
            {/* The main input field */}
            <input
                className={styles.TextInput}
                value={value}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                placeholder={placeholder}
            />
        </div>
    );
}

export default TextInput;