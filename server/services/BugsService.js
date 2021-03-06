import { dbContext } from "../db/DbContext"
import { BadRequest } from "../utils/Errors"
import { notesService } from "../services/NotesService"


class BugsService {

  async getNoteByBugId(req, res, next) {
    try {
      let data = await notesService.getNoteByBugId(req.params.id, req.userInfo.email)
      return res.send(data)
    } catch (error)  {
      next(error)
    }
  
  }
  async getAll(userEmail) {
    return await dbContext.Bugs.find({ creatorEmail: userEmail }).populate("creator", "name picture")
  }

  async getById(id, userEmail) {
    let data = await dbContext.Bugs.findOne({ _id: id, creatorEmail: userEmail })
    if (!data) {
      throw new BadRequest("Invalid ID or you do not have access to this BugBoard")
    }
    return data
  }

  async create(rawData) {
    let data = await dbContext.Bugs.create(rawData)
    return data
  }

  async edit(id, userEmail, update) {
    let data = await dbContext.Bugs.findOneAndUpdate({ _id: id, creatorEmail: userEmail }, update, { new: true })
    if (!data) {
      throw new BadRequest("Invalid ID or you do not have access to this BugBoard");
    }
    return data;
  }

  // async delete(id, userEmail) {
  //   let data = await dbContext.Bugs.findOneAndRemove({ _id: id, creatorEmail: userEmail });
  //   if (!data) {
  //     throw new BadRequest("Invalid ID or you do not have access to this BugBoard");
  //   }
  // }

}


export const bugsService = new BugsService()