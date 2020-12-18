import { EnvType } from './types'


const env: EnvType = {
    MQTT: {
        TOPDESK: {
            HOST: process.env.MQTT_TOPDESK_HOST || '',
            PORT: Number(process.env.MQTT_TOPDESK_PORT),
            USER: process.env.MQTT_TOPDESK_USER || '',
            PASSWORD: process.env.MQTT_TOPDESK_PASSWORD || '',
            TOPICS: {
                IN: process.env.MQTT_TOPDESK_TOPIC_IN || '',
                OUT: process.env.MQTT_TOPDESK_TOPIC_OUT || ''
            }
        },
        COGNITIVE: {
            HOST: process.env.MQTT_COGNITIVE_HOST || '',
            PORT: Number(process.env.MQTT_COGNITIVE_PORT),
            USER: process.env.MQTT_COGNITIVE_USER || '',
            PASSWORD: process.env.MQTT_COGNITIVE_PASSWORD || '',
            TOPICS: {
                IN: process.env.MQTT_COGNITIVE_TOPIC_IN || '',
                OUT: process.env.MQTT_COGNITIVE_TOPIC_OUT || ''
            }
        }
    }
}

export default env