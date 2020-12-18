import { config } from 'dotenv'
config()

import { MessagesController } from './controllers/Messages'
class App {

    private messagesController: MessagesController

    constructor() {
        this.messagesController = new MessagesController()
    }

    start() {
        this.messagesController.start()
    }
}


const appInstance = new App()
appInstance.start()