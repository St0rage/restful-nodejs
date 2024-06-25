import supertest from "supertest";
import {
  createTestContact,
  createTestUser,
  getTestContact,
  removeAllTestContact,
  removeTestUser,
} from "./test-util.js";
import { web } from "../src/application/web.js";

describe("POST /api/contacts", () => {
  beforeEach(async () => {
    await createTestUser();
  });

  afterEach(async () => {
    await removeAllTestContact();
    await removeTestUser();
  });

  it("should can create new contact", async () => {
    const result = await supertest(web)
      .post("/api/contacts")
      .set("Authorization", "test")
      .send({
        first_name: "test",
        last_name: "test",
        email: "test@wrg.com",
        phone: "0809726123241",
      });

    expect(result.status).toBe(200);
    expect(result.body.data.id).toBeDefined();
    expect(result.body.data.first_name).toBe("test");
    expect(result.body.data.last_name).toBe("test");
    expect(result.body.data.email).toBe("test@wrg.com");
    expect(result.body.data.phone).toBe("0809726123241");
  });

  it("should reject if request is not valid", async () => {
    const result = await supertest(web)
      .post("/api/contacts")
      .set("Authorization", "test")
      .send({
        first_name: "",
        last_name: "test",
        email: "tes",
        phone: "0809726123918273182973981273892173912123241",
      });

    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });
});

describe("GET /api/contact/:contactId", () => {
  beforeEach(async () => {
    await createTestUser();
    await createTestContact();
  });

  afterEach(async () => {
    await removeAllTestContact();
    await removeTestUser();
  });

  it("should can get contact", async () => {
    const testContact = await getTestContact();

    const result = await supertest(web)
      .get(`/api/contacts/${testContact.id}`)
      .set("Authorization", "test");

    expect(result.status).toBe(200);
    expect(result.body.data.id).toBe(testContact.id);
    expect(result.body.data.first_name).toBe(testContact.first_name);
    expect(result.body.data.last_name).toBe(testContact.last_name);
    expect(result.body.data.email).toBe(testContact.email);
    expect(result.body.data.phone).toBe(testContact.phone);
  });

  it("should return 404 if contact id is not found", async () => {
    const testContact = await getTestContact();

    const result = await supertest(web)
      .get(`/api/contacts/${testContact.id + 1}`)
      .set("Authorization", "test");

    expect(result.status).toBe(404);
  });
});

describe("PUT /api/contact/:contactId", () => {
  beforeEach(async () => {
    await createTestUser();
    await createTestContact();
  });

  afterEach(async () => {
    await removeAllTestContact();
    await removeTestUser();
  });

  it("should can update existing contact", async () => {
    const testContact = await getTestContact();

    const result = await supertest(web)
      .put(`/api/contacts/${testContact.id}`)
      .set("Authorization", "test")
      .send({
        first_name: "Dani",
        last_name: "Yudistira",
        email: "dani@wrg.com",
        phone: "0871236421234",
      });

    expect(result.status).toBe(200);
    expect(result.body.data.id).toBe(testContact.id);
    expect(result.body.data.first_name).toBe("Dani");
    expect(result.body.data.last_name).toBe("Yudistira");
    expect(result.body.data.email).toBe("dani@wrg.com");
    expect(result.body.data.phone).toBe("0871236421234");
  });

  it("should reject if request is invalid", async () => {
    const testContact = await getTestContact();

    const result = await supertest(web)
      .put(`/api/contacts/${testContact.id}`)
      .set("Authorization", "test")
      .send({
        first_name: "",
        last_name: "",
        email: "dani",
        phone: "",
      });

    expect(result.status).toBe(400);
  });

  it("should reject if contact is not found", async () => {
    const testContact = await getTestContact();

    const result = await supertest(web)
      .put(`/api/contacts/${testContact.id + 1}`)
      .set("Authorization", "test")
      .send({
        first_name: "Dani",
        last_name: "Yudistira",
        email: "dani@wrg.com",
        phone: "0871236421234",
      });

    expect(result.status).toBe(404);
  });
});

describe("DELETE /api/contacts/:contactId", () => {
  beforeEach(async () => {
    await createTestUser();
    await createTestContact();
  });

  afterEach(async () => {
    await removeAllTestContact();
    await removeTestUser();
  });

  it("should can delete contact", async () => {
    let testContact = await getTestContact();

    const result = await supertest(web)
      .delete(`/api/contacts/${testContact.id}`)
      .set("Authorization", "test");

    expect(result.status).toBe(200);
    expect(result.body.data).toBe("OK");

    testContact = await getTestContact();
    expect(testContact).toBeNull();
  });

  it("should reject is contact is not found", async () => {
    let testContact = await getTestContact();

    const result = await supertest(web)
      .delete(`/api/contacts/${testContact.id + 1}`)
      .set("Authorization", "test");

    expect(result.status).toBe(404);
  });
});
