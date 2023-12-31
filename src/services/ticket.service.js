import TicketManager from "../daos/mongodb/managers/TicketMongo.dao.js"

export default class TicketService {

    constructor() {
        this.ticketDao = new TicketManager()
    }

    async createTicket(ticket) {
        let newTicket = await this.ticketDao.createTicket(ticket)

        return newTicket
    }

    async getTicketById(id) {
        let ticket = await this.ticketDao.getTicketById(id)

        return ticket
    }
}