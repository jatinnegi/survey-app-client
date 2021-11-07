import { useHistory } from "react-router-dom";

const RespondantHome = ({ surveys }) => {
  const history = useHistory();

  const handleSurveyClick = (surveyId) => {
    history.push(`/survey/${surveyId}`);
  };
  return (
    <>
      <div className="d-flex justify-content-between align-items-center">
        <h2>All Surveys</h2>
      </div>
      <div
        className="mt-4"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "10px",
        }}
      >
        {surveys.map((survey) => (
          <div
            key={survey._id}
            className="card py-3 px-4"
            style={{ cursor: "pointer" }}
            onClick={() => handleSurveyClick(survey._id)}
          >
            <h5>{survey.title}</h5>
            <div className="mt-2" style={{ fontSize: "14px" }}>
              <p className="mb-0">Questions: {survey.questions}</p>
              <p className="mb-0">
                Status: {survey.status ? "Completed" : "Pending"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default RespondantHome;
