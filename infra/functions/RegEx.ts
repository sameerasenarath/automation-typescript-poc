// Define the RegEx class
export class RegEx {
    public static extractDataByRegEx(source: string, ...regexPatterns: string[]): string | null {
        for (const regexPattern of regexPatterns) {
            // Create a RegExp object
            const regex = new RegExp(regexPattern);
            // Now create matcher object.
            const match = regex.exec(source);
            if (!match) {
                console.log(`Can't find required pattern "${regexPattern}" in the provided input`);
                continue;
            }

            const result = match[1]; // Capture group 1
            console.log(`Found required pattern "${regexPattern}" --- returning the result "${result}"`);
            return result;
        }

        return null; // Return null if no matches found
    }

    public static getMatchedByGroup(text: string, regexPattern: string, groupNumber: number): string | null {
        const regex = new RegExp(regexPattern);
        const match = regex.exec(text);
        if (match) {
            return match[groupNumber];
        } else {
            return null;
        }
    }

    public static getAllMatches(text: string, regexPattern: string): string[] {
        const regex = new RegExp(regexPattern, 'g');
        const matches: string[] = [];
        let match: RegExpExecArray | null;

        while ((match = regex.exec(text)) !== null) {
            matches.push(match[1]); // Capture group 1
        }

        return matches;
    }

    public static isMatchFound(source: string, ...regexPatterns: string[]): boolean {
        for (const regexPattern of regexPatterns) {
            // Create a RegExp object
            const regex = new RegExp(regexPattern);
            const match = regex.exec(source);
            if (match) {
                return true;
            }
        }
        return false;
    }
}
