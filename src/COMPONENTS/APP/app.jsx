import React, {Fragment, PureComponent} from 'react';
import { connect } from 'react-redux';
import { addTasklist, getTasklists } from '../../MODELS/appmodel';
import {
    addCheflistAction, downloadTasklistsAction
} from '../../STORE/actions';
import './app.css';
import Tasklist from '../CART/cart';

class App extends PureComponent {
    state = {
        isInputShown: false,
        inputValue: ''
    };

    async componentDidMount() {
        const tasklists = await getTasklists();
        this.props.downloadTasklistsDispatch(tasklists);
    }

    showInput = () => this.setState({isInputShown: true});
    onInputChange=({target: {value} }) => this.setState({
        inputValue: value
    });
    onKeyDown =  async (event) => {
        if (event.key === 'Escape'){
            this.setState({
                isInputShown:false,
                inputValue: ''
            });
            return;
        }
        
        if (event.key === 'Enter'){
            if (this.state.inputValue){
                const info = await addTasklist ({
                    tasklistName: this.state.inputValue,
                    tasks: []

                });
                console.log(info);

                this.props.addCheflistDispatch(this.state.inputValue);
            }
            this.setState({
                isInputShown: false,
                inputValue: ''
            })
            
        }
    };

    render(){
        const{ isInputShown, inputValue} = this.state;
        const {tasklists } = this.props;

        return (
            <Fragment>
            <main id="main">

            <header id="begin_header">
                <div id="task_text">ADMINISTRATOR'S ACCOUNT</div>
                <div id="avatar">ZADIRIAKINA E.A.</div>
             </header>

            <div id="cover">
                {tasklists.map((tasklist,index) => (
                    <Tasklist
                    tasklistName={tasklist.tasklistName}
                    tasklistId={index}
                    tasks = {tasklist.tasks}
                    key={`list${index}`}
                    />

                ))}
            {!isInputShown && (
            <header 
                className = "box"
                onClick={this.showInput}
                >
                    ADD NEW CHEF...
            </header>
            )}

            {isInputShown && ( 
            <input
                type="text"
                className = "box"
                placeholder="ENTER FULL NAME..."
                value={inputValue}
                onChange={this.onInputChange}
                onKeyDown={this.onKeyDown}
            />)}
            </div>
            </main>
            </Fragment>
            
        );
    }
}
const mapStateToProps = ({tasklists}) => ({tasklists});
const mapDispatchToProps = dispatch => ({
    addCheflistDispatch: (tasklistName) =>
        dispatch(addCheflistAction(tasklistName)),
    downloadTasklistsDispatch: (tasklists) => 
        dispatch(downloadTasklistsAction(tasklists))
});
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);