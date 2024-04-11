export enum RequestCalendarStatus {
    Idle = 'idle',
    Failed = 'failed',
    Error = 'error',
}

export enum AddTrainingStatus {
    Idle = 'idle',
    Success = 'success',
    Loading = 'loading',
    Error = 'error',
}

export enum RequestStatusType {
    Idle = 'idle',
    Loading = 'loading',
}

export enum RequestFeedbackStatus {
    Idle = 'idle',
    Succeeded = 'succeeded',
    Error = 'error',
    Failed = 'failed',
}

export enum RequestSettingsStatus {
    Idle = 'idle',
    Succeeded = 'succeeded',
    Selected = 'selected',
}

export enum RequestProfileStatus {
    Idle = 'idle',
    Succeeded = 'succeeded',
    Selected = 'selected',
    Error = 'error',
    Failed = 'failed'
}

export enum TrainingSelectedMenu {
    MyWorkouts = 'myWorkouts',
    JointTraining = 'jointTraining',
    UserJointTrainingList = 'userJointTrainingList',
    MyTrainingPartner = 'myTrainingPartner'
}

export enum RequestTrainStatus {
    Idle = 'idle',
    Succeeded = 'succeeded',
    Failed = 'failed',
    Error = 'error',
}

export enum InvitationToJointTraining {
    Idle = 'idle',
    Invitation = 'invitation'
}
