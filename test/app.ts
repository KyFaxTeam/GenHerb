// import supertest from "supertest";
// import { app } from "../src/app";
// import { expect } from "chai";

// const request = supertest(app);
// describe("API Endpoints", () => {
//     it("should register a user", async () => {
//         const response = await request.post("/register")
//             .send({
//                 pseudo: "testUser",
//                 email: "test@example.com",
//                 password: "password123",
//             });
        
  
//         expect(response.status).to.equal(201);
//         expect(response.body).to.be.an("object");
//         expect(response.body).to.have.property("token");
//         expect(response.body.token).to.be.a("string");
//     });
  
//     it("should login an existing user", async () => {
//         const response = await supertest(app)
//             .post("/login")
//             .send({
//                 mail: "test@example.com",
//                 password: "password123",
//             });
  
//         expect(response.status).to.equal(200);
//         expect(response.body).to.be.an("object");
//         expect(response.body).to.have.property("token");
//         expect(response.body.token).to.be.a("string");
//     });
// });


// // describe('User Endpoints', () => {
// //   it('should register a new user', async () => {
// //     const response = await request.post('/register')
// //       .send({
// //         pseudo: 'testUser',
// //         email: 'test@example.com',
// //         password: 'password123',
// //       });

// //     expect(response.status).to.equal(201);
// //     expect(response.body).toHaveProperty('token');
// //   });

// //   it('should login an existing user', async () => {
// //     const response = await request.post('/login')
// //       .send({
// //         email: 'test@example.com',
// //         password: 'password123',
// //       });

// //     expect(response.status).toBe(200);
// //     expect(response.body).toHaveProperty('token');
// //   });

// //   it('should initiate password reset for a valid user', async () => {
// //     const response = await request.post('/forgot-password')
// //       .send({
// //         email: 'test@example.com',
// //       });

// //     expect(response.status).toBe(200);
// //     expect(response.body).toHaveProperty('message'); // Assuming the endpoint sends a success message
// //   });

// //   it('should reset password for a valid token', async () => {
// //     const token = await request.post('/forgot-password')
// //       .send({
// //         email: 'test@example.com',
// //       })
// //       .then((response) => response.body.token);

// //     const response = await request.post('/reset-password')
// //       .send({
// //         token,
// //         newPassword: 'newpassword123',
// //       });

// //     expect(response.status).toBe(200);
// //     expect(response.body).toHaveProperty('message'); // Assuming the endpoint sends a success message
// //   });
// // });
