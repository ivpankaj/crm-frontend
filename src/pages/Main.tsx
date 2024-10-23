import { Route, Routes } from 'react-router-dom';
import DefaultLayout from '../layout/DefaultLayout';
import PageTitle from '../Components/PageTitle';
import ECommerce from './Dashboard/ECommerce';
import Calendar from './Calendar';
import Profile from './Profile';
import FormElements from './Form/FormElements';
import FormLayout from './Form/FormLayout';
import Tables from './Tables';
import Chart from './Chart';
import Alerts from './UiElements/Alerts';
import Buttons from './UiElements/Buttons';
import Counseller from '../Components/Counseller';
import SendMessagePage from '../Components/Activity/sendmessage';
import SendEmail from '../Components/Activity/sendemail';
import Performance from './Performance';
import Attendance from './Attendance';
import Review from './Review';
import Feedback from './Feedback';
import Task from './LeadList';
import Contact from './Contact';
import TaskDetail from './TaskDetail';
import Call from './Call';
import Meeting from './Meeting';
import Sales from './Sales';
import Lead from './Lead';
import SalespersonsCounselorsList from './Models/SalespersonsCounselorsList';
import LeadEntryForm from './Dashboard/CreateLead';
// import UpdateLead from './Updatelead';



const Main = () => {
  return (
    <DefaultLayout>
      <Routes>
        <Route
          index
          element={
            <>
              <PageTitle title="eCommerce Dashboard | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <ECommerce />
            </>
          }
        />
        
        <Route
          path="/calendar"
          element={
            <>
              <PageTitle title="Calendar | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Calendar />
            </>
          }
        />


      <Route
           path="/statics"
          element={
            <>
              <PageTitle title="statics |  Dashboard " />
              <SalespersonsCounselorsList />
            </>
          }
        />

          <Route
           path="/create-lead"
           element={
            <>
              <PageTitle title="lead |  Dashboard " />
              <LeadEntryForm />
            </>
          }
        />






        <Route
          path="/viewlead"
          element={
            <>
              <PageTitle title="Calendar | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Lead />
            </>
          }
        />


        <Route
            path="/counsellor"
            element={
             <>
             <PageTitle title="Counseller | TailAdmin - Tailwind CSS Admin Dashboard Template" />
           <Counseller />
          </>
            }
          />
            <Route
            path="/contact"
            element={
             <>
             <PageTitle title="Counseller | TailAdmin - Tailwind CSS Admin Dashboard Template" />
           <Contact/>
          </>
            }
          />
 

          <Route
            path="/feedback"
            element={
             <>
             <PageTitle title="Counseller | TailAdmin - Tailwind CSS Admin Dashboard Template" />
           <Feedback/>
          </>
            }
          />
          <Route
            path="/performance"
            element={
             <>
             <PageTitle title="Counseller | TailAdmin - Tailwind CSS Admin Dashboard Template" />
           <Performance/>
          </>
            }
          />
           <Route
            path="/attendance"
            element={
             <>
             <PageTitle title="Counseller | TailAdmin - Tailwind CSS Admin Dashboard Template" />
           <Attendance/>
          </>
            }
          />

          <Route
            path="/call"
            element={
             <>
             <PageTitle title="Counseller | TailAdmin - Tailwind CSS Admin Dashboard Template" />
           <Call/>
          </>
            }
          />

          
             <Route
            path="/sales"
            element={
             <>
             <PageTitle title="Counseller | TailAdmin - Tailwind CSS Admin Dashboard Template" />
           <Sales/>
          </>
            }
          /> 

             <Route
            path="/meeting"
            element={
             <>
             <PageTitle title="Counseller | TailAdmin - Tailwind CSS Admin Dashboard Template" />
           <Meeting/>
          </>
            }
          />
          <Route
            path="/review"
            element={
             <>
             <PageTitle title="Counseller | TailAdmin - Tailwind CSS Admin Dashboard Template" />
           <Review/>
          </>
            }
          />
        <Route
          path="/profile"
          element={
            <>
              <PageTitle title="Profile | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Profile />
            </>
          }
        />

        <Route
          path="/taskdetail"
          element={
            <>
              <PageTitle title="Profile | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <TaskDetail/>
            </>
          }
        />
         <Route
          path="/task"
          element={
            <>
              <PageTitle title="Profile | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Task />
            </>
          }
        />
        
        <Route
          path="/forms/form-elements"
          element={
            <>
              <PageTitle title="Form Elements | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <FormElements />
            </>
          }
        />
        <Route
          path="/forms/form-layout"
          element={
            <>
              <PageTitle title="Form Layout | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <FormLayout />
            </>
          }
        />
        <Route
          path="/tables"
          element={
            <>
              <PageTitle title="Tables | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Tables />
            </>
          }
        />
         <Route
          path="/send-message"
          element={
            <>
              <PageTitle title="Tables | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <SendMessagePage />
            </>
          }
        />
         <Route
          path="/send-email"
          element={
            <>
              <PageTitle title="Tables | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <SendEmail />
            </>
          }
        />

         <Route
          path="/sales"
          element={
            <>
              <PageTitle title="Settings | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Sales />
            </>
          }
        />
        <Route
          path="/chart"
          element={
            <>
              <PageTitle title="Basic Chart | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Chart />
            </>
          }
        />
        <Route
          path="/ui/alerts"
          element={
            <>
              <PageTitle title="Alerts | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Alerts />
            </>
          }
        />
        <Route
          path="/ui/buttons"
          element={
            <>
              <PageTitle title="Buttons | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Buttons />
            </>
          }
        />
      </Routes>
    </DefaultLayout>
  );
}

export default Main;
