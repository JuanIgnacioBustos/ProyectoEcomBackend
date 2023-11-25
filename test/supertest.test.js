import supertest from "supertest";
import chai from "chai";

// IMPORTANTE: Para funcionar este test, antes de ejecutarlo con "npm run supertest"
// se debe levantar el servidor pertinente "node ./src/app.js"

const requester = supertest('http://localhost:8080'); // Host donde se hacen las peticiones

describe('Tests funcionales e integradores', function() {

    // Se ejecutan los test del router de productos

    describe('Tests de router de productos', function() {
    
        this.timeout(10000) // Setea un tiemout general

        // Antes de ejecutar todos los tests del router de productos

        before(async function() {
        this.timeout(10000) // Setea el timeout solo para el before (no se si es necesario)

        console.log("Se ejecuta el before antes de los tests de router de productos")
        })

        // Empiezan los tests del router de productos

        it('El endpoint GET /api/products devuelve todos los productos', async function() {
        const {
            statusCode,
            ok,
            _body
        } = await requester.get('/api/products')

        chai.expect(statusCode).to.be.equal(200)
        chai.expect(ok).to.be.equal(true)
        chai.expect(_body).to.have.property("payload")
        })
    })

    // Se ejecutan los test del router de carts

    // describe('Tests de router de carts', function() {
    
    // })

    // Se ejecutan los test del router de sessions

    // describe('Tests de router de sessions', function() {
    
    // })
})