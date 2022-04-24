import { ShortCodeService } from "../../src/services/shortCode.service";

describe('Given an array of characters', () => {
    const characters = [...'abcdefg'];

    describe('When the characters are shuffled', () => {
        const shortCodeService = new ShortCodeService(characters, 8);
        const shuffledCharacters = shortCodeService.shuffleCharacters('f');

        test('Then the array length is unchanged', () => {
            expect(shuffledCharacters.length).toEqual(characters.length);
        });

        test('Then the array contains all of the characters', () => {
            characters.forEach(c => {
                expect(shuffledCharacters.indexOf(c)).not.toEqual(-1);
            });
        });

        test('Then most items are in a different order', () => {
            const sameOrderedCharacters = characters.filter((c, index) => {
                return shuffledCharacters.indexOf(c) == index
            });

            expect(sameOrderedCharacters.length).toBeLessThan(Math.floor(characters.length / 2))
        });
    });
});

describe.each([[0, '00000000'], [1, '00000001'], [2, '00000002'], [5443407539, '02i0v44z'], [78364164095, '0zzzzzzz']])('Given a value of %i to encode', (val, result) => {
    const validCharacters = [...'0123456789abcdefghijklmnopqrstuvwxyz'];
    const randomMock = jest.spyOn(global.Math, 'random');
    randomMock.mockReturnValue(0);

    describe('When the value is encoded', () => {
        const shortCodeService = new ShortCodeService(validCharacters);
        const shortCodeServiceMock = jest.spyOn(shortCodeService, 'shuffleCharacters');
        shortCodeServiceMock.mockReturnValue(validCharacters);

        const encodedValue = shortCodeService.encode(val);

        test('Then the correct result is returned', () => {
            expect(encodedValue).toEqual(result);
            expect(encodedValue.length).toEqual(8);
        });
    });
});

describe.each([[-1, 'Only positive integer values can be encoded'], [78364164096, 'All unique short codes have been exhausted']])('Given an invalid value of %i to encode', (val, error) => {
    describe('When the value is encoded', () => {
        const shortCodeService = new ShortCodeService();
        test('Then an error is thrown', () => {
            expect(() => shortCodeService.encode(val)).toThrow(error);
        });
    });
});

