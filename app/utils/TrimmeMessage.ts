type TrimErrorMessageFunction = (errorMessage: string) => string;

const trimErrorMessage: TrimErrorMessageFunction = (errorMessage) => {
    // Split the error message into lines, handling both Windows and Unix line endings
    const lines = errorMessage.split(/\r?\n|\r|\n/g);
    
    // Find the line that contains the version information
    const versionLineIndex = lines.findIndex(line => line.trim().startsWith('Version:'));
    
    if (versionLineIndex!== -1) {
        // Extract the version part
        const versionPart = lines[versionLineIndex].slice('Version:'.length).trim();
        
        // Join all lines up to and including the version line
        const trimmedMessage = lines.slice(0, versionLineIndex + 1).join('\n');
        
        return trimmedMessage;
    } else {
        return errorMessage; // Return the original message if no version line is found
    }
};