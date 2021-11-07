import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router";
import * as api from "../api";

const SurveyResultsView = (params) => {
  const history = useHistory();
  const { userType } = useSelector((state) => state.user);

  const [survey, setSurvey] = useState(null);
  const [surveyResponse, setSurveyResponse] = useState({});

  useEffect(() => {
    getSurvey();
  }, []);

  if (userType === "respondant") return <Redirect to="/" />;

  const getSurvey = async () => {
    try {
      const { data } = await api.getSurvey(
        params.match.params.surveyId,
        params.match.params.userId
      );
      setSurvey(data);
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleChange = (e, questionId) => {
    setSurveyResponse({ ...surveyResponse, [questionId]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let body = [];

    Object.keys(surveyResponse).forEach((key) => {
      body.push({
        _id: key,
        value: surveyResponse[key],
      });
    });
    try {
      await api.surveyResponse(
        params.match.params.surveyId,
        params.match.params.userId,
        body
      );
      history.push("/");
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    survey && (
      <div className="mt-5">
        <h2>{survey.title}</h2>
        <form className="mt-4" onSubmit={handleSubmit}>
          {survey.questions.map((question, index) => (
            <div key={question._id} className="form-group mb-4">
              <h6 style={{ marginBottom: "10px" }}>
                {index + 1}. {question.title}
              </h6>
              <div className="px-3">
                {question.options.map((option) => (
                  <div key={option.value}>
                    <input
                      type="radio"
                      name={`question-${question._id}`}
                      id={`option-${option._id}`}
                      value={option.value}
                      defaultChecked={option.selected}
                      onClick={(e) => handleChange(e, question._id)}
                    />{" "}
                    <label htmlFor={`option-${option._id}`}>
                      {option.value}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          ))}
          <button type="submit" className="mt-4 btn btn-primary">
            Edit
          </button>
        </form>
      </div>
    )
  );
};

export default SurveyResultsView;
