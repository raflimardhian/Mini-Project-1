const { describe, it, expect, beforeAll, afterAll, beforeEach, mock } = require('bun:test');
const { mockUser, resetMocks } = require('./mocks/prisma.js');
const { generateAccessToken } = require('../src/utils/security.js');

// Mocking module dalam CommonJS
mock.module('../src/lib/prisma.js', () => ({
    prisma: {
        user: mockUser
    }
}));

// Mengganti dynamic import menjadi require
// Jika app.js menggunakan module.exports = app, gunakan require langsung:
const app = require('../src/index.js').default || require('../src/index.js');

const mockProduct = [
    { id: 1, username: 'sayaUser', password: 'saya123', role: 'user' },
    { id: 2, username: 'sayaAdmin', password: 'saya123', role: 'admin' }
];

let server;
const BASE_URL = 'http://localhost:3002';

// Ingat pesan Anda: token ini (dan kemungkinan session/test ini) 
// sebaiknya selesai dalam 1 jam sesuai durasi token.
// const validToken = generateAccessToken({ id: 1, username: 'sayaUser', role: 'user' });

beforeAll(() => {
    server = app.listen(3002);
});

afterAll(() => {
    server.close();
});

beforeEach(() => {
    resetMocks();
});

describe('Product API with Bun', () => {
    describe('GET /product', ()=>{
        it('should return all products with success status', async () => {
            // mockProduct.findMany.mockReturnValue(mockProducts);

            const response = await fetch(`${BASE_URL}/product`, {method:'GET'});
            const data = await response.json();
            expect(response.status).toBe(200);
            expect(data.success).toBe(true);
            expect(data.product).toHaveLength(3);
            // expect(mockProduct.findMany).toHaveBeenCalled();
        });
        it('should return users with correct structure', async () => {
            // mockUser.findMany.mockReturnValue(mockUsers);
            
            const response = await fetch(`${BASE_URL}/product`);
            const data = await response.json();
            const products = data.product[0];
            
            expect(products).toHaveProperty('id');
            expect(products).toHaveProperty('name');
            expect(products).toHaveProperty('stock');
            expect(products).toHaveProperty('categoryId');
        });
    })
    describe('GET /product/:id',()=>{
        it('should return a specific user', async () => {
            // mockUser.findUnique.mockReturnValue(mockUsers[0]);
            
            const response = await fetch(`${BASE_URL}/product/4`);
            const data = await response.json();
            
            expect(response.status).toBe(200);
            expect(data.success).toBe(true);
            expect(data.product.name).toBe('Flour');
            // expect(mockUser.findUnique).toHaveBeenCalled();
        });
        it('should return 404 for non-existent user', async () => {
            mockUser.findUnique.mockReturnValue(null);
            
            const response = await fetch(`${BASE_URL}/product/1`);
            const data = await response.json();
            
            expect(response.status).toBe(404);
            // expect(data.success).toBe(false);
            expect(data.message).toBe('Product not found');
        });

        // it('should handle invalid user ID format', async () => {
        //     const response = await fetch(`${BASE_URL}/users/adadwa`);
        //     const data = await response.json();
            
        //     expect(response.status).toBe(500);
        //     expect(data.success).toBe(false);
        //     expect(data.message).toContain('Invalid users ID');
        // });
    })
});