import PrivateRoute from "./PrivateRoute";
import SignUp from "./components/SignUp/SignUp";
import SignIn from "./components/SignIn/SignIn";
import VideoCallBody from "./components/VideoCalling/VideoCallBody";
import BuisnessLogin from "./components/SignIn/BuisnessLogin";
import CustomerLogin from "./components/SignIn/CustomerLogin";
import CustomerSignUp from "./components/SignUp/CustomerSignUp";
import BuisnessSignUp from "./components/SignUp/BuisnessSignUp";
import Chat from "./components/Chat/Chat";
import { RouteObject } from "react-router-dom";
import BuisnessHome from "./components/BuisnessHome";
import EnterManualData from "./components/EnterManualData";
import SetBudget from "./components/SetBudget";
import EnterExcelData from "./components/EnterExcelData";
import Visualize from "./components/Visualize/Visualize";
import ViewCustomer from "./components/ViewCustomer";
import News from "./components/News";
import CustomerGoals from "./components/CustomerGoals";
import GiveGoalInsight from "./components/GiveGoalInsight";
import Notifications from "./components/Notifications";
import Homeuser from "./components/Homeuser";
import UserInvestments from "./components/UserInvestments";
import GenerateReport from "./components/GenerateReport";
import ViewReport from "./components/ViewReport";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <SignIn />,
  },
  {
    path: "/buisness-login",
    element: <BuisnessLogin />,
  },
  {
    path: "/customer-login",
    element: <CustomerLogin />,
  },
  {
    path: "/buisness-register",
    element: <BuisnessSignUp />,
  },
  {
    path: "/customer-register",
    element: <CustomerSignUp />,
  },
  { path: "/register", element: <SignUp /> },
  { path: "/video-call", element: <PrivateRoute element={VideoCallBody} /> },
  {
    path: "/home-buisness",
    element: <PrivateRoute element={BuisnessHome} isBuisness={true} />,
  },
  {
    path: "/visualize",
    element: <PrivateRoute element={Visualize} />,
  },
  {
    path: "/update-manualdata",
    element: <PrivateRoute element={EnterManualData} />,
  },
  {
    path: "/update-exceldata",
    element: <PrivateRoute element={EnterExcelData} />,
  },
  { path: "/chat/:customerId", element: <PrivateRoute element={Chat} /> },
  {
    path: "update-advisor-manualdata",
    element: <PrivateRoute element={SetBudget} isBuisness={true} />,
  },
  {
    path: "update-advisor-exceldata",
    element: (
      <PrivateRoute element={EnterExcelData} props={{ isAdvisor: true }} />
    ),
  },
  // { path: "/line-graph", element: <PrivateRoute element={ViewAllLines} /> },
  {
    path: "/view-customer/:customerId",
    element: <PrivateRoute element={ViewCustomer} isBuisness={true} />,
  },
  { path: "/news", element: <News /> },
  { path: "/set-goals", element: <PrivateRoute element={CustomerGoals} /> },
  {
    path: "/goals",
    element: <PrivateRoute element={GiveGoalInsight} isBuisness={true} />,
  },
  {
    path: "/user-investments",
    element: <PrivateRoute element={UserInvestments} />,
  },
  {
    path: "/notifications",
    element: <PrivateRoute element={Notifications} />,
  },
  {
    path: "/home-user",
    element: <PrivateRoute element={Homeuser} />,
  },
  {
    path: "/generate-report",
    element: <PrivateRoute element={GenerateReport} isBuisness={true} />,
  },
  {
    path: "/view-report",
    element: <PrivateRoute element={ViewReport} />,
  },
];
