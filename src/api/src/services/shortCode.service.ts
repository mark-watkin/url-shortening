import seedrandom from "seedrandom";

export class ShortCodeService {
    _validCharacters: string[];
    _encodeLength: number;

    constructor(validCharacters: string[] = [...'abcdefghijklmnopqrstuvwxyz0123456789'], shortCodeLength = 8) {
        this._validCharacters = validCharacters;
        this._encodeLength = shortCodeLength - 1; // one space is taken for a random value
        
    }

    encode(value: number): string {
        if(value < 0) {
            throw Error('Only positive integer values can be encoded');
        }
        
        if (value >= Math.pow(this._validCharacters.length, this._encodeLength)) {
            throw Error('All unique short codes have been exhausted');
        }
    
        const randomFirstCharacter = this._validCharacters[Math.floor(Math.random() * this._validCharacters.length)];
        const shuffledCharacters = this.shuffleCharacters(randomFirstCharacter);
        
        let result = '', remainingValue = value;
        while(remainingValue > 0) {
            const position = remainingValue % shuffledCharacters.length;
            result = shuffledCharacters[position] + result;
            remainingValue = Math.floor(remainingValue / shuffledCharacters.length);
        }
    
        return randomFirstCharacter + String(result).padStart(this._encodeLength, shuffledCharacters[0]);
    }

    shuffleCharacters(seed: string): string[] {
        const random = seedrandom(seed);
        const resultSet = [...this._validCharacters];
        for (let i = this._validCharacters.length - 1; i >= 0; i--) {
            const swapIndex = Math.floor(random() * i);
            [resultSet[i], resultSet[swapIndex]] = [resultSet[swapIndex], resultSet[i]];
        }
    
        return resultSet;
    }
}
