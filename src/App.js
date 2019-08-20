import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import NotFound from './components/NotFound';
import Login from './containers/Login';
import Menu from './components/Menu';
import Home from './components/Home';

import AdminsList from './containers/Admins';
import AdminDetail from './containers/Admins/detail';

import PostgraduatesList from './containers/Postgraduates';
import PostgraduateDetail from './containers/Postgraduates/detail';

import SubjectsList from './containers/Subjects';
import SubjectDetail from './containers/Subjects/detail';

import StudentsList from './containers/Students';
import StudentDetail from './containers/Students/detail';

import TeachersList from './containers/Teachers';
import TeacherDetail from './containers/Teachers/detail';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <Menu>
            <Switch>
              <Route exact path="/home" component={Home} />

              <Route exact path="/administradores/" component={AdminsList} />
              <Route exact path="/administradores/edit/:id" component={AdminDetail} />
              <Route exact path="/administradores/create" component={AdminDetail} />

              <Route exact path="/postgrados/" component={PostgraduatesList} />
              <Route exact path="/postgrados/edit/:id" component={PostgraduateDetail} />
              <Route exact path="/postgrados/create" component={PostgraduateDetail} />

              <Route exact path="/materias/" component={SubjectsList} />
              <Route exact path="/materias/edit/:id" component={SubjectDetail} />
              <Route exact path="/materias/create" component={SubjectDetail} />

              <Route exact path="/estudiantes/" component={StudentsList} />
              <Route exact path="/estudiantes/edit/:id" component={StudentDetail} />
              <Route exact path="/estudiantes/create" component={StudentDetail} />

              <Route exact path="/profesores/" component={TeachersList} />
              <Route exact path="/profesores/edit/:id" component={TeacherDetail} />
              <Route exact path="/profesores/create" component={TeacherDetail} />
              
  {/*            <Route
                exact
                path="/users/winners"
                component={WinnersListContainer}
              />
              <Route exact path="/categories" component={CategoriesContainer} />
              <Route
                exact
                path="/categories/edit/:id"
                component={CategoryDetailContainer}
              />
              <Route
                exact
                path="/categories/create"
                component={CategoryDetailContainer}
              />
              <Route exact path="/trivia-categories" component={triviaCategoryContainer} />
              <Route
                exact
                path="/trivia-categories/edit/:id"
                component={TriviaCategoryDetailContainer}
              />
              <Route
                exact
                path="/trivia-categories/create"
                component={TriviaCategoryDetailContainer}
              />
              <Route exact path="/brands/list" component={BrandsList} />
              <Route
                exact
                path="/brands/associations"
                component={BrandsAssociations}
              />
              <Route
                exact
                path="/brands/edit/:id"
                component={BrandDetailContainer}
              />
              <Route
                exact
                path="/brands/create"
                component={BrandDetailContainer}
              />
              <Route exact path="/admins" component={AdminsList} />
              <Route exact path="/admins/edit/:id" component={AdminDetail} />
              <Route exact path="/admins/create" component={AdminDetail} />
               <Route exact path="/invitecode/setup" component={InviteCode} />
              <Route
                exact
                path="/invitecode/invitations"
                component={Invitations}
              />
              <Route
                exact
                path="/invitecode/invitations/detail/:id"
                component={InvitationsDetailContainer}
              />
              <Route exact path="/coupons" component={CouponList} />
              <Route exact path="/coupons/create" component={CouponDetail} />
              <Route exact path="/coupons/edit/:id" component={CouponDetail} />
              
              <Route exact path="/redeemcoupon/settings" component={RedeemCoupon} />
              <Route exact path="/redeemcoupon/list" component={RedeemCouponList} />
              <Route exact path="/redeemcoupon/edit/:id/:name/:lastname" component={RedeemCouponDetail} /> 
              
              <Route exact path="/locations" component={Location} />
              <Route exact path="/locations/edit/:id" component={LocationDetail} />
              <Route exact path="/locations/create" component={LocationDetail} />

              <Route exact path="/zipcodes" component={Zipcodes} />
              <Route exact path="/zipcodes/edit/:id" component={ZipcodesDetail} />
              <Route exact path="/zipcodes/create" component={ZipcodesDetail} />
              
              <Route exact path="/prizes" component={Prizes} />
              <Route exact path="/prizes/edit/:id" component={PrizesDetail} />
              <Route exact path="/prizes/create" component={PrizesDetail} />

              <Route exact path="/challenges/list" component={Challenges} />
              <Route exact path="/challenges/calendar" component={ChallengeCalendarContainer} />
              <Route exact path="/challenges/edit/:id" component={ChallengesDetail} />
              <Route exact path="/challenges/create" component={ChallengesDetail} /> 

              <Route
                exact
                path="/questions"
                component={QuestionsListContainer}
              />
              <Route
                exact
                path="/questions/create"
                component={QuestionDetailContainer}
              />
              <Route
                exact
                path="/questions/edit/:id"
                component={QuestionDetailContainer}
              />
              <Route exact path="/minigame/trivia" component={TriviasList} />
              <Route
                exact
                path="/minigame/trivia/create"
                component={TriviaDetail}
              />
              <Route
                exact
                path="/minigame/trivia/edit/:id"
                component={TriviaDetail}
              />
              <Route
                exact
                path="/external-links"
                component={ExternalLinksList}
              />
              <Route exact path="/wallet" component={WalletList} />
              <Route exact path="/initial-phase" component={PhasesList} />
              <Route
                exact
                path="/initial-phase/create"
                component={PhaseDetail}
              />
              <Route
                exact
                path="/initial-phase/edit/:id"
                component={PhaseDetail}
              />
              <Route
                exact
                path="/minigame/scratch-off"
                component={ScratchOffList}
              />
              <Route
                exact
                path="/minigame/scratch-off/create"
                component={ScratchOffDetail}
              />
              <Route
                exact
                path="/minigame/scratch-off/edit/:id"
                component={ScratchOffDetail}
              /> */}
              <NotFound />
            </Switch>
          </Menu>
          <NotFound />
        </Switch>
      </Router>
    );
  }
}

export default App;
