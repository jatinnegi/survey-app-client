import axios from "axios";

const api = axios.create({
  baseURL: "https://survey-app-poc.herokuapp.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export const signIn = (body) => api.post("/auth/signin", body);
export const signUp = (body) => api.post("/auth/signup", body);

export const getAllSurveys = (userId) => api.get(`/survey/all/${userId}`);
export const getSurvey = (surveyId, userId) =>
  api.get(`/survey/${surveyId}/${userId}`);
export const surveyResponse = (surveyId, userId, body) =>
  api.post(`/survey/${surveyId}/${userId}`, body);
export const createSurvey = (body) => api.post("/survey/create-survey", body);
