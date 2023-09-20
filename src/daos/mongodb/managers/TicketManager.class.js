import { ticketsModel } from "../models/ticket.model";

export default class TicketManager {

    async createTicket(ticket) {
        let result = await ticketsModel.create(ticket)

        return result
    }
}