import app from '../src/index.js';
import request from "supertest";

let contactCount = 0;
let validContactId = "";

export const validContact = {
  email: "dummy@email.com",
  create_date: "2022-10-06T08:05:27.589Z",
  name: "Dummy User",
  gender: "male",
  phone: "+65 8491 2483",
};
const invalidContact = {
  email: "dummy@email.com",
  gender: "male",
  phone: "+65 8491 2483",
};

describe("from /contacts",()=>{
    describe("GET", () => {
        test("get all listed contacts", async () => {
          const res = await request(app).get("/api/contacts");
    
          expect(res.statusCode).toBe(200);
          contactCount = Number(res.body.data.count);
    
          if (res.body.message == "no contacts stored") {
            expect(contactCount).toBe(0);
          } else {
            expect(contactCount).toBeGreaterThan(0);
          }
        });
      });
      describe("POST", () => {
        describe("given an invalid contact", () => {
          test("returns error json", async () => {
            const res = await request(app)
              .post("/api/contacts")
              .send(invalidContact);
            expect(res.statusCode).toBe(400);
            expect(res.body.message).toBe("email and name has to be specified");
          });
        });
        describe("given a valid contact", () => {
          test("returns success json with the contact data", async () => {
            const res = await request(app).post("/api/contacts").send(validContact);
            validContactId = res.body.data._id;
    
            expect(res.statusCode).toBe(200);
            expect(res.body.message).toBe("successfully added contact");
          });
        });
      });
})

describe("from /contacts/:contacts_id",()=>{
  describe("GET", () => {
    describe("given a valid string that does not exist in db", () => {
      test("returns json stating id does not exist", async () => {
        const invalidContactId = "0123abcd0123abcd0123abcd";
        const res = await request(app).get(
          `/api/contacts/${invalidContactId}`
        );
        expect(res.statusCode).toBe(400);
        expect(res.body.message).toBe(`user not found`);
      });
    });
    describe("given a valid contact_id", () => {
      test("return associated contact", async () => {
        const res = await request(app).get(`/api/contacts/${validContactId}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.data._id).toEqual(validContactId);
      });
    });
  });
    describe("PATCH/PUT", () => {
      describe("given a valid string that does not exist in db", () => {
        test("returns json stating id does not exist", async () => {
          const invalidContactId = "0123abcd0123abcd0123abcd";
          const res = await request(app).patch(
            `/api/contacts/${invalidContactId}`
          );
          expect(res.statusCode).toBe(400);
          expect(res.body.message).toBe(`user not found`);
        });
      });
      describe("modify single valid field", () => {
        test("returns contact before and after the change", async () => {
          const { gender, ...info } = validContact;
          let updatedContact = {
            _id: validContactId,
            ...info,
            gender: "female",
          }; //originally male
          const res = await request(app)
            .patch(`/api/contacts/${validContactId}`)
            .send(updatedContact);
  
          expect(res.statusCode).toBe(200);
          expect(res.body.data.updated.gender).toEqual(updatedContact.gender);
        });
      });
    });
    describe("DELETE", () => {
      describe("given a valid string that does not exist in db", () => {
        test("returns json stating id does not exist", async () => {
          const invalidContactId = "0123abcd0123abcd0123abcd";
          const res = await request(app).delete(
            `/api/contacts/${invalidContactId}`
          );
          expect(res.statusCode).toBe(400);
          expect(res.body.message).toBe(`user not found`);
        });
      });
      describe("remove valid contact_id", () => {
        test("returns success json with the deleted contact infomation", async () => {
          const res = await request(app).delete(
            `/api/contacts/${validContactId}`
          );
  
          expect(res.statusCode).toBe(200);
        });
      });
    });
})
