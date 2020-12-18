
import { connect, MqttClient, IClientOptions } from 'mqtt'
import { EventEmitter } from 'events'


export class MQTTService {


    private client: MqttClient
    public events: EventEmitter

    constructor(brokerUrl: string, opts: IClientOptions) {
        this.client = connect(brokerUrl, opts)
        this.events = new EventEmitter()
        this.exportEvents()
    }

    subscribe(topic: string) {
        console.log('Subscribe on: ', topic)
        if (this.client.connected) {
            this.client.subscribe(topic)
        } else {
            this.client.on('connect', () => {
                this.client.subscribe(topic)
            })
        }
    }

    publish(topic: string, data: any) {
        console.log(`Publish on ${topic}`, data.toString())
        this.client.publish(topic, data)
    }

    private exportEvents() {
        this.client.on('message', (...args) => {
            this.events.emit('message', ...args)
        })

        this.client.once('connect', () => {
            console.warn('MQTT Service connected')
        })
    }

}