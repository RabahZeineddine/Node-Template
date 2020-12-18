import { MQTTService } from '../../services/MQTT'
import env from '../../config/env/index'
import Joi from 'joi'
import { cognitiveOutSchema, topdeskInSchema } from './schemas/index'


export class MessagesController {

    private topdeskMqtt: MQTTService
    private cognitiveMqtt: MQTTService

    constructor() {
        this.topdeskMqtt = new MQTTService(env.MQTT.TOPDESK.HOST, { port: env.MQTT.TOPDESK.PORT })
        this.cognitiveMqtt = new MQTTService(env.MQTT.COGNITIVE.HOST, { port: env.MQTT.COGNITIVE.PORT })
    }

    start() {
        this.subscribe()
        this.connectServices()
    }

    private subscribe() {
        this.topdeskMqtt.subscribe(env.MQTT.TOPDESK.TOPICS.IN)
        this.cognitiveMqtt.subscribe(env.MQTT.COGNITIVE.TOPICS.OUT)
    }

    private connectServices() {

        this.topdeskMqtt.events.on('message', (topic: string, data: Buffer) => {
            console.log(`Topic: ${topic}`)
            try {
                const jsonData = JSON.parse(data.toString())
                Joi.assert(jsonData, topdeskInSchema)
                this.cognitiveMqtt.publish(env.MQTT.COGNITIVE.TOPICS.IN, JSON.stringify(jsonData))
            } catch (error) {
                console.error(error)
            }
        })

        this.cognitiveMqtt.events.on('message', (topic: string, data: Buffer) => {
            console.log(`Topic: ${topic}`)
            try {
                const jsonData = JSON.parse(data.toString())
                Joi.assert(jsonData, cognitiveOutSchema)
                this.topdeskMqtt.publish(env.MQTT.TOPDESK.TOPICS.OUT, JSON.stringify(jsonData))
            } catch (error) {
                console.error(error)
            }
        })
    }
}