import { useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import * as api from "../../api";

const CreateSurvey = () => {
  const history = useHistory();
  const [surveyFormData, setSurveyFormData] = useState({
    title: "",
    questions: [],
    age: "all",
    gender: "all",
  });

  const { userType, userId } = useSelector((state) => state.user);

  if (userType === "respondant") return <Redirect to="/" />;

  const handleChange = (e) => {
    setSurveyFormData({ ...surveyFormData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const body = {
      coordinator: userId,
      ...surveyFormData,
    };
    try {
      const { data } = await api.createSurvey(body);
      history.push("/");
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <div className="my-5">
      <h2>Create Survey</h2>
      <form className="my-4" onSubmit={handleSubmit}>
        <div className="form-group mb-3">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            className="form-control mt-1"
            id="title"
            name="title"
            value={surveyFormData.title}
            onChange={handleChange}
            placeholder="Your favourite brands"
          />
        </div>
        <div className="form-group mb-3">
          <div className="d-flex justify-content-between">
            <label>Questions</label>
            <span
              className="font-weight-bold"
              style={{ cursor: "pointer" }}
              onClick={() => {
                setSurveyFormData({
                  ...surveyFormData,
                  questions: [
                    ...surveyFormData.questions,
                    {
                      title: "",
                      options: [
                        { value: "" },
                        { value: "" },
                        { value: "" },
                        { value: "" },
                      ],
                    },
                  ],
                });
              }}
            >
              +Add New Question
            </span>
          </div>
          {surveyFormData.questions.map((question, index) => (
            <div key={index} className="mt-4">
              <div className="d-flex justify-content-between">
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  name="title"
                  value={question.title}
                  onChange={(e) => {
                    const questions = surveyFormData.questions;
                    questions[index].title = e.target.value;
                    setSurveyFormData({
                      ...surveyFormData,
                      questions: questions,
                    });
                  }}
                  placeholder="Question title"
                  autoComplete="off"
                />
              </div>
              <div className="mt-2 py-2 pl-4">
                {question.options.map((option, optionIndex) => {
                  return (
                    <input
                      key={optionIndex}
                      type="text"
                      className="form-control mb-2"
                      placeholder={`Option ${optionIndex + 1}`}
                      autoComplete="off"
                      value={option.value}
                      onChange={(e) => {
                        const questions = surveyFormData.questions;
                        questions[index].options[optionIndex].value =
                          e.target.value;
                        setSurveyFormData({
                          ...surveyFormData,
                          questions: questions,
                        });
                      }}
                      style={{ width: "98%", marginLeft: "auto" }}
                    />
                  );
                })}
              </div>
              <div className="d-flex justify-content-end">
                <button
                  type="button"
                  className="btn btn-danger btn-sm"
                  onClick={(e) => {
                    surveyFormData.questions.splice(index, 1);
                    setSurveyFormData({
                      ...surveyFormData,
                    });
                  }}
                >
                  Delete question
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="form-group mb-3">
          <label htmlFor="userType">Age</label>
          <select
            className="form-control mt-1"
            id="userType"
            defaultValue="all"
            onChange={(e) => {
              setSurveyFormData({
                ...surveyFormData,
                age: e.target.value,
              });
            }}
          >
            <option value="all">All</option>
            <option value="<18">&lt; 18</option>
            <option value="18-30">18-30</option>
            <option value="31-40">31-40</option>
            <option value="41-54">41-54</option>
            <option value="55+">55+</option>
          </select>
        </div>
        <div className="form-group mb-3">
          <label htmlFor="userType">Gender</label>
          <select
            className="form-control mt-1"
            id="userType"
            defaultValue="all"
            onChange={(e) => {
              setSurveyFormData({
                ...surveyFormData,
                gender: e.target.value,
              });
            }}
          >
            <option value="all">All</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <button className="btn btn-primary mt-4">Create Survey</button>
      </form>
    </div>
  );
};

export default CreateSurvey;
