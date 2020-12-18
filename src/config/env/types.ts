


export type MqttType = {
    HOST: string
    PORT: number
    USER: string
    PASSWORD: string
    TOPICS: {
        IN: string
        OUT: string
    }
}

export type EnvType = {
    MQTT: {
        TOPDESK: MqttType,
        COGNITIVE: MqttType
    }
}
