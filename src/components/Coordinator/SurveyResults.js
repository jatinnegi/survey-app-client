import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import * as api from "../../api";

const SurveyResults = (params) => {
  const { userId } = useSelector((state) => state.user);
  const [survey, setSurvey] = useState(null);
  const history = useHistory();

  useEffect(() => {
    getSurvey();
  }, []);

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

  return (
    survey && (
      <div className="my-5">
        <h4>{survey.title}</h4>
        <table className="table mt-4">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Status</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {survey.respondants.map((respondant) => (
              <tr key={respondant._id}>
                <th scope="row">1</th>
                <td>{respondant.name}</td>
                <td>{respondant.email}</td>
                <td>{respondant.status}</td>
                <td>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => {
                      history.push(
                        `/survey-results/${survey._id}/${respondant._id}`
                      );
                    }}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  );
};

export default SurveyResults;
