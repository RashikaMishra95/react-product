import React from 'react';
import {  Switch , Route } from 'react-router-dom';
import Dashboard from '../src/components/Dashboard/Dasboard';
import EditForm from "./components/Forms/EditForm";

class App extends React.Component{
  render(){
    return(
            <Switch>
                <Route exact path={'/'} component={Dashboard} />
                <Route path={`/edit/:id`} component={EditForm}/>
            </Switch>
    )
  }
}
export default App;
