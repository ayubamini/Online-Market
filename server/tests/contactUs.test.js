const mongoose = require("mongoose");
const request = require("supertest");
const app = require('../server'); // Ensure this path is correct
const Contact = require('../models/contactUsModel'); // Ensure this path is correct

beforeAll(async () => {
  await mongoose.connect(process.env.TEST_DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
});

describe('Contact Us Form', () => {
  
  describe('Form Submission', () => {
    
    test('It should accept a valid contact form submission', async () => {
      const dummy_contact = {
        name: 'Sample Name',
        phone: '1234567890',
        email: 'sample@gmail.com',
        subject: 'Inquiry',
        message: 'Details about the inquiry...'
      };

      const res = await request(app)
        .post('/api/contact')
        .send(dummy_contact);

      expect(res.statusCode).toBe(201); // Ensure the status code matches what your controller sends
      expect(res.body).toHaveProperty('message', 'Contact form submitted successfully');

      await Contact.deleteOne({ email: dummy_contact.email });
    });

    test('It should not accept a submission with missing fields', async () => {
      const dummy_contact = {
        name: 'Sample Name',
        subject: 'Inquiry',
        message: 'Details about the inquiry...'
      };

      const res = await request(app)
        .post('/api/contact')
        .send(dummy_contact);

      expect(res.statusCode).toBe(400); // Or the appropriate status code for a failed submission due to validation
      expect(res.body).toHaveProperty('error');
    });
  });

  describe('Backend Processing', () => {
    
    test('It should process the contact form data', async () => {
      const dummy_contact = {
        name: 'Processed Name',
        phone: '0987654321',
        email: 'process@example.com',
        subject: 'Processed Inquiry',
        message: 'Ensure this message is processed correctly'
      };

      await request(app).post('/api/contact').send(dummy_contact);

      const processedContact = await Contact.findOne({ email: 'process@example.com' });
      expect(processedContact).toBeTruthy();
      expect(processedContact.message).toBe(dummy_contact.message);

      await Contact.deleteOne({ email: dummy_contact.email });
    });
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });
});
