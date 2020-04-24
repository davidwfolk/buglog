import { dbContext } from "../db/DbContext"
import { BadRequest } from "../utils/Errors"

class NotesService {
  async getAll(userEmail) {
    return await dbContext.Notes.find({ creatorEmail: userEmail }).populate("title", "creator email")
  }
  async getNoteByBugId(bugId, userEmail) {
    let data = await dbContext.Notes.find({ bugId: bugId, creatorEmail: userEmail})
    if (!data) {
      throw new BadRequest("Invalid Board or you do not own this board")
    }
    return data
  }
  async createList(rawData) {
    let data = await dbContext.Notes.create(rawData)
    return data
  }
  async editList(boardId, userEmail, update) {
    let data = await dbContext.Notes.findOneAndUpdate({ _id: boardId, creatorEmail: userEmail },
      update, { new: true })
    if (!data) {
      throw new BadRequest("Invalid ID or you don't have permissions")
    }
    return data;
  }
  async deleteList(boardId, userEmail) {
    let data = await dbContext.Notes.findOneAndRemove({ _id: boardId, creatorEmail: userEmail })
    if (!data) {
      throw new BadRequest("Invalid ID or you don't have permissions")
    }
  }
}

export const notesService = new NotesService()