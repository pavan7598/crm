
export interface CampaignObject {
    compose: compose,
    target_users: targetUsers,
    control_group: Controlgroup
}

export interface compose {
    compose: Object
}

export interface targetUsers {
    id: String
}

export interface Controlgroup {
    channel: Channel,
    ControlValue: Control
}

export interface Channel {
    channel: Object,
}

export interface Control {
    target: number,
    control: number
}