import React from "react";
import {Step, StepLabel, Stepper} from "material-ui/Stepper";
import {WordsView} from "./WordsView";
import {WordsTest} from "./WordsTest";
import {ResultsView} from "./ResultsView";
import {connect} from "react-redux";
import axios from "axios";


class FullPage extends React.Component {

    constructor(props) {
        super(props);
        this.learntId = new Set();

        this.state = {
            activeStep: 0,
            attempt: 0
        };
    }

    nextStep() {
        const activeStep = this.state.activeStep;
        this.setState({
            activeStep: activeStep + 1
        });
    }

    nextStepWithSave(results) {
        for (let i in results) {
            if (results[i]) {
                this.learntId.add(i);
            }
        }

        if (this.state.attempt === 0) {
            console.log(this.props.data);
            axios({
                method: 'put',
                url: '/api/data/results',
                data: {
                    dataId: this.props.data.data.id,
                    results: results
                },
                headers: {'Authorization': 'Bearer ' + this.props.auth.accessToken,
                    "Content-Type": "application/json"}
            });
        }

        this.nextStep();

    }

    repeatOrEnd() {
        if (this.learntId.size === this.props.data.data.dictionary.entries.length) {
            location.href = '/';
        } else {
            this.setState({
                activeStep: 0,
                attempt: this.state.attempt + 1
            })
        }
    }

    getStepContent() {
        const nextStep = this.nextStep.bind(this);
        const nextStepWithSave = this.nextStepWithSave.bind(this);
        const repeatOrEnd = this.repeatOrEnd.bind(this);

        switch (this.state.activeStep) {
            case 0:
                return (
                    <WordsView onContinue={nextStep} data={this.props.data} learntId={this.learntId}/>
                );
            case 1:
                return (
                    <WordsTest onContinue={nextStepWithSave} data={this.props.data} learntId={this.learntId}/>
                );
            case 2:
                return (
                    <ResultsView onContinue={repeatOrEnd} data={this.props.data} learntId={this.learntId}/>
                );
        }
    }

    render() {
        return (
            <div>
                <Stepper activeStep={this.state.activeStep}>
                    <Step>
                        <StepLabel>{this.state.attempt > 0 ? 'Repeat words' : 'Learn new words'}</StepLabel>
                    </Step>
                    <Step>
                        <StepLabel>Check your knowledge</StepLabel>
                    </Step>
                    <Step>
                        <StepLabel>Test result</StepLabel>
                    </Step>
                </Stepper>
                {this.getStepContent()}
            </div>
        );


    }
}


function mapStateToProps(state) {
    const {authentication} = state;
    return {
        auth: authentication
    };
}

const mappedFullPage = connect(mapStateToProps)(FullPage);

export { mappedFullPage as FullPage };