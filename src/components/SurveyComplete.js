import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router";
import * as api from "../api";

const SurveyComplete = (params) => {
  const { userId, userType } = useSelector((state) => state.user);
  const history = useHistory();

  const [survey, setSurvey] = useState(null);
  const [surveyResponse, setSurveyResponse] = useState({});

  const [seconds, setSeconds] = useState(null);

  useEffect(() => {
    getSurvey();
  }, []);

  useEffect(() => {
    if (survey) {
      let seconds = survey.questions.length * 30;

      setSeconds(seconds);
    }
  }, [survey]);

  useEffect(() => {
    if (survey && !survey.status && seconds === 0) {
      handleSubmit();
    }
  }, [seconds]);

  useEffect(() => {
    let myInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        clearInterval(myInterval);
      }
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  });

  if (userType === "coordinator") return <Redirect to="/" />;

  const getSurvey = async () => {
    try {
      const { data } = await api.getSurvey(
        params.match.params.surveyId,
        userId
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
    if (e) e.preventDefault();

    let body = [];

    Object.keys(surveyResponse).forEach((key) => {
      body.push({
        _id: key,
        value: surveyResponse[key],
      });
    });
    try {
      await api.surveyResponse(params.match.params.surveyId, userId, body);
      history.push("/");
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    survey && (
      <div className="mt-5">
        <h2>{survey.title}</h2>
        {survey.status ? (
          <></>
        ) : (
          <div>
            <h1>
              {parseInt(seconds / 60) < 10
                ? `0${parseInt(seconds / 60)}`
                : parseInt(seconds / 60)}
              :{seconds % 60 < 10 ? `0${seconds % 60}` : seconds % 60}
            </h1>
          </div>
        )}
        {survey.status ? (
          <p className="mt-3" style={{ fontWeight: "500" }}>
            You have already submitted this survey
          </p>
        ) : (
          <></>
        )}
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
                      disabled={survey.status}
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
          {survey.status ? (
            <></>
          ) : (
            <button className="mt-4 btn btn-primary">Submit</button>
          )}
        </form>
      </div>
    )
  );
};

export default SurveyComplete;
