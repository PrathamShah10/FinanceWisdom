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
import Options from "./components/common/Options";
import EnterExcelData from "./components/EnterExcelData";
import Visualize from "./components/Visualize/Visualize";
import ViewCustomer from "./components/ViewCustomer";
import News from "./components/News";
import CustomerGoals from "./components/CustomerGoals";
import GiveGoalInsight from "./components/GiveGoalInsight";
import ViewInvestments from "./components/ViewInvestments";
import Notifications from "./components/Notifications";

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
    path: "/home-user",
    element: <PrivateRoute element={Visualize} />,
  },
  // {
  //   path: "/view-user-data",
  //   element: <PrivateRoute element={Visualize} />,
  // },
  {
    path: "/update-user-data",
    element: (
      <PrivateRoute
        element={Options}
        props={{
          title: "How would you like to Update?",
          heading1: "enter manually",
          heading2: "enter through excel sheet",
          link1: "/update-manualdata",
          link2: "/update-exceldata",
        }}
      />
    ),
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
    path: "/set-budget/:customerId",
    element: (
      <PrivateRoute
        element={Options}
        props={{
          title: "How would you like to Update?",
          heading1: "enter manually",
          heading2: "enter through excel sheet",
          link1: "/update-advisor-manualdata",
          link2: "/update-advisor-exceldata",
        }}
        isBuisness={true}
      />
    ),
  },
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
  { path: "/news", element: <PrivateRoute element={News} /> },
  { path: "/set-goals", element: <PrivateRoute element={CustomerGoals} /> },
  {
    path: "/goals",
    element: <PrivateRoute element={GiveGoalInsight} isBuisness={true} />,
  },
  {
    path: "/view-investments",
    element: <PrivateRoute element={ViewInvestments} />,
  },
  {
    path: "/notifications",
    element: <PrivateRoute element={Notifications} />,
  },
];
