import { Given, When, Then, After, Before, setDefaultTimeout } from '@cucumber/cucumber';
import { expect } from 'chai';
import sinon from 'sinon';
import mongoose from 'mongoose';
import request from 'supertest'; 
import app from '../../server.js';
import StaffService from '../../Services/StaffService.js';
import MongoStaffRepository from '../../Repositories/MongoStaffRepository.js';
import { verifyToken } from '../../Middleware/access.js';

setDefaultTimeout(10000); // Збільшуємо тайм-аут до 10 секунд

const staffRepository = new MongoStaffRepository();
const staffService = new StaffService(staffRepository);

let response;

Before(() => {
  sinon.restore();
});

After(() => {
  sinon.restore();
});

Given('користувач автентифікований', () => {
  sinon.stub(verifyToken, 'verifyToken').callsFake((req, res, next) => next());
});

Given('співробітники існують в системі', () => {
  sinon.stub(staffService, 'getAllStaff').resolves([
    { 
      _id: '67466faee13f74a342288441',
      fullName: 'Іван Іваненко', 
      email: 'ivan.ivanenko1@example.com', 
      contactInfo: '+380501234567', 
      password: '$2a$10$W8CSkhNnf7P7TSkfEgQNNuxs1blgYwPBKkVdI.7IthiQXaUp.AOwa', 
      role: 'trainer', 
      specialization: 'Фітнес-тренер' 
    },
    { 
      _id: '6759fe81cdebf3eea11d3c53',
      fullName: 'Ігор Колаченко', 
      email: 'petro.ivanenko@example.com', 
      contactInfo: '+380501234567', 
      password: '', 
      role: 'manager', 
      specialization: 'Менеджер' 
    },
    { 
      _id: '675a222e7294f5e9cf83ec34',
      fullName: 'Петро Іваненко', 
      email: 'petro1.ivanenko@example.com', 
      contactInfo: '+380501234567', 
      password: '$2a$10$tX6vcIs4eu96L5UJXaYxg.cfKwxwizoBvb9lKxx0XkFoXfzGBtLOG', 
      role: 'manager', 
      specialization: 'Фітнес-тренер' 
    },
    { 
      _id: '675ce1058aec861e09d080ca',
      fullName: 'Микола Щавель', 
      email: 'test@gmail.com', 
      contactInfo: 'тест', 
      password: '$2a$10$4.JsuPPO.04xe2apSdWshebnbJs7gn5Kp.bo9KrpeBjw9BWo5qlYy', 
      role: 'trainer', 
      specialization: 'Йога' 
    },
    { 
      _id: '675cf91501d4df122bee5ad0',
      fullName: 'Test Trainer', 
      email: 'test.test@test.com', 
      contactInfo: 'Test info', 
      password: '$2a$10$hKCM71ZRZ5Pmht8Yduxvtut3TXO1WQzYgdjFRN2Pq2q1z50lDfWbu', 
      role: 'trainer', 
      specialization: 'Test' 
    }
  ]);
});

When('користувач запитує список співробітників', {timeout: 10000}, async () => {
  response = await request(app).get('/staff/staff').set('Authorization', 'Bearer fakeToken');
});

Then('він отримує список всіх співробітників', () => {
  expect(response.status).to.equal(200);
  expect(response.body.length).to.equal(5); // Змінено на очікувані 5
  expect(response.body[0]).to.include({ fullName: 'Іван Іваненко', role: 'trainer' });
  expect(response.body[1]).to.include({ fullName: 'Ігор Колаченко', role: 'manager' });
  expect(response.body[2]).to.include({ fullName: 'Петро Іваненко', role: 'manager' });
  expect(response.body[3]).to.include({ fullName: 'Микола Щавель', role: 'trainer' });
  expect(response.body[4]).to.include({ fullName: 'Test Trainer', role: 'trainer' });
});

Given('співробітник існує з ID {string}', (id) => {
  sinon.stub(staffService, 'getStaffById').withArgs(new mongoose.Types.ObjectId(id)).resolves({ 
    _id: new mongoose.Types.ObjectId(id), 
    fullName: 'Іван Іваненко',
    email: 'ivan.ivanenko1@example.com', 
    contactInfo: '+380501234567', 
    password: '$2a$10$W8CSkhNnf7P7TSkfEgQNNuxs1blgYwPBKkVdI.7IthiQXaUp.AOwa', 
    role: 'trainer', 
    specialization: 'Фітнес-тренер' 
  });
});

When('користувач запитує співробітника за ID {string}', async (id) => {
  response = await request(app).get(`/staff/staff/${id}`).set('Authorization', 'Bearer fakeToken');
});

Then('він отримує інформацію про співробітника', () => {
  expect(response.status).to.equal(200);
  expect(response.body).to.include({ 
    fullName: 'Іван Іваненко',
    email: 'ivan.ivanenko1@example.com', 
    contactInfo: '+380501234567', 
    role: 'trainer', 
    specialization: 'Фітнес-тренер' 
  });
});

Given('співробітник не існує з ID {string}', (id) => {
  sinon.stub(staffService, 'getStaffById').withArgs(new mongoose.Types.ObjectId(id)).resolves(null);
});

When('користувач запитує співробітника за неіснуючим ID {string}', async (id) => {
  response = await request(app).get(`/staff/staff/${id}`).set('Authorization', 'Bearer fakeToken');
});

Then('він отримує помилку про відсутність співробітника', () => {
  expect(response.status).to.equal(500); 
  expect(response.body).to.deep.include({ error: 'Staff member with ID 575a222e7294f5e9cf83ec34 not found.' }); 
});
