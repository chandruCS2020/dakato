import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Info from './Info';
import Signinmap from './Signinmap';

const steps = ['Basic Information', 'GPA '];

export default function Form() {
const [activeStep, setActiveStep] = React.useState(0);
const [skipped, setSkipped] = React.useState(new Set());


const isStepSkipped = (step) => {
    return skipped.has(step);
};

const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
    newSkipped = new Set(newSkipped.values());
    newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
};

const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
};



const handleReset = () => {
    setActiveStep(0);
};
function getStepContent(activeStep){
    switch (activeStep){
        case 0:
            return <Info handleNext={handleNext} />;
        
        case 1:
            return <Signinmap />;
        default:
            return "unknown step";
    }
}
return (
    <Box sx={{ width: '100%' ,padding:"100px 50px 10px"}}>
    <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
        const stepProps = {};
        const labelProps = {};
        
        if (isStepSkipped(index)) {
            stepProps.completed = false;
        }
        return (
            <Step key={label} {...stepProps} className="labels">
            <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
        );
        })}
    </Stepper>
    {activeStep === steps.length ? (
        <React.Fragment>
        <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleReset}>Reset</Button>
        </Box>
        </React.Fragment>
    ) : (
        <React.Fragment>
        {/* <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography> */}
        {getStepContent(activeStep)}
        {/* <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
            color="inherit"
            disabled={activeStep === 0}
            onClick={handleBack}
            sx={{ mr: 1 }}
            >
            Back
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />

            <Button onClick={handleNext}>
            {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
        </Box> */}
        </React.Fragment>
    )}
    </Box>
);
}
