import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import * as api from "../api";
import CoordinatorHome from "./CoordinatorHome";
import RespondantHome from "./RespondantHome";

const Dashboard = () => {
  const { userId, userType } = useSelector((state) => state.user);
  const [surveys, setSurveys] = useState([]);

  useEffect(() => {
    if (userId.trim() !== "") getAllSurveys();
  }, []);

  const getAllSurveys = async () => {
    try {
      const { data } = await api.getAllSurveys(userId);
      setSurveys(data);
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <div className="py-5">
      {userType === "coordinator" ? (
        <CoordinatorHome surveys={surveys} />
      ) : (
        <RespondantHome surveys={surveys} />
      )}
    </div>
  );
};

export default Dashboard;
