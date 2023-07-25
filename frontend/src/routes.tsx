import PrivateRoute from "./PrivateRoute";
import SignUp from "./components/SignUp/SignUp";
import SignIn from "./components/SignIn/SignIn";
// import Profile from "./components/Profile";
import VideoCallBody from "./components/VideoCalling/VideoCallBody";
import BuisnessLogin from "./components/SignIn/BuisnessLogin";
import CustomerLogin from "./components/SignIn/CustomerLogin";
import CustomerSignUp from "./components/SignUp/CustomerSignUp";
import BuisnessSignUp from "./components/SignUp/BuisnessSignUp";
import Chat from "./components/Chat/Chat";
import { RouteObject } from "react-router-dom";
import BuisnessHome from "./components/BuisnessHome";
import UserHome from "./components/EnterManualData";
import SetBudget from "./components/SetBudget";
import ViewAllLines from "./components/Visualize/ViewAllLines";
import Options from "./components/common/Options";
import EnterExcelData from "./components/EnterExcelData";
import Visualize from "./components/Visualize/Visualize";

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
  // { path: "/profile", element: <PrivateRoute element={Profile} /> },
  { path: "/video-call", element: <PrivateRoute element={VideoCallBody} /> },
  { path: "/home-buisness", element: <PrivateRoute element={BuisnessHome} /> },
  {
    path: "/home-user",
    element: (
      <PrivateRoute
        element={Options}
        props={{
          title: "what u wish to do?",
          heading1: "update your financial data for this year",
          heading2: "view financial data in grahpical format",
          link1: "/update-user-data",
          link2: "/view-user-data",
          isCustomerStart: true,
        }}
      />
    ),
  },
  {
    path: "/view-user-data",
    element: <PrivateRoute element={Visualize} />,
  },
  {
    path: "/update-user-data",
    element: (
      <PrivateRoute
        element={Options}
        props={{
          title: "how would you like to update",
          heading1: "enter manually",
          heading2: "enter through excel sheet",
          link1: "/update-manualdata",
          link2: "/update-exceldata",
        }}
      />
    ),
  },
  { path: "/update-manualdata", element: <PrivateRoute element={UserHome} /> },
  {
    path: "/update-exceldata",
    element: <PrivateRoute element={EnterExcelData} />,
  },
  { path: "/chat/:customerId", element: <PrivateRoute element={Chat} /> },
  {
    path: "/set-budget",
    element: (
      <PrivateRoute
        element={Options}
        props={{
          title: "how would you like to update",
          heading1: "enter manually",
          heading2: "enter through excel sheet",
          link1: "/update-advisor-manualdata",
          link2: "/update-advisor-exceldata",
        }}
      />
    ),
  },
  {
    path: "update-advisor-manualdata",
    element: <PrivateRoute element={SetBudget} />,
  },
  {
    path: "update-advisor-exceldata",
    element: (
      <PrivateRoute element={EnterExcelData} props={{ isAdvisor: true }} />
    ),
  },
  { path: "/line-graph", element: <PrivateRoute element={ViewAllLines} /> },
];
