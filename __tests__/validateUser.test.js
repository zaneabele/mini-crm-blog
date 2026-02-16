const validateUser = require('../utils/validateUser');

// __tests__/validateUser.test.js


describe('Funkcijas validateUser pārbaude', () => {

    test('1. Veiksmīgs gadījums: visi dati pareizi', () => {
        const userData = {
            name: 'Anna',
            email: 'anna@example.com',
            password: 'parole123'
        };
        const errors = validateUser(userData);
        expect(errors).toEqual([]);
    });

    test('2. Kļūda: pārāk īss vārds (< 2)', () => {
        const userData = {
            name: 'A',
            email: 'anna@example.com',
            password: 'parole123'
        };
        const errors = validateUser(userData);
        expect(errors.length).toBeGreaterThan(0);
        expect(errors[0]).toContain('Vārds');
    });

    test('3. Kļūda: nederīgs e-pasts', () => {
        const userData = {
            name: 'Anna',
            email: 'nepareizs-epasts',
            password: 'parole123'
        };
        const errors = validateUser(userData);
        expect(errors.length).toBeGreaterThan(0);
        expect(errors[0]).toContain('e-pasts');
    });

    test('4. Kļūda: pārāk īsa parole (< 6)', () => {
        const userData = {
            name: 'Anna',
            email: 'anna@example.com',
            password: '123'
        };
        const errors = validateUser(userData);
        expect(errors.length).toBeGreaterThan(0);
        expect(errors[0]).toContain('Parole');
    });

    test('5. Kļūda: trūkst vārda', () => {
        const userData = {
            email: 'anna@example.com',
            password: 'parole123'
        };
        const errors = validateUser(userData);
        expect(errors.length).toBeGreaterThan(0);
        expect(errors[0]).toContain('Vārds');
    });

    test('6. Kļūda: trūkst e-pasta', () => {
        const userData = {
            name: 'Anna',
            password: 'parole123'
        };
        const errors = validateUser(userData);
        expect(errors.length).toBeGreaterThan(0);
        expect(errors[0]).toContain('e-pasts');
    });

    test('7. Kļūda: trūkst paroles', () => {
        const userData = {
            name: 'Anna',
            email: 'anna@example.com'
        };
        const errors = validateUser(userData);
        expect(errors.length).toBeGreaterThan(0);
        expect(errors[0]).toContain('Parole');
    });
});