import supertest from 'supertest';

const initRequest = () => {
  if (!process.env.E2E_BASE_URL) {
    throw new Error('E2E_BASE_URL is not set in environment.');
  }

  return supertest(process.env.E2E_BASE_URL);
};

export const request = initRequest();
