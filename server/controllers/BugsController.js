import express from 'express'
import BaseController from "../utils/BaseController";
import auth0provider from "@bcwdev/auth0provider";
import { bugsService } from "../services/BugsService";
import { notesService } from "../services/NotesService";

export class BugsController extends BaseController {
  
  constructor() {
    super("api/bugs")
    this.router
    .use(auth0provider.getAuthorizedUserInfo)
    .get('/:id', this.getById)
    .get('', this.getAll)
    .post('', this.create)
    .put('/:id', this.edit)
    // .delete('/:id', this.delete)
    .get('/:id/notes', this.getNoteByBugId)
  }
  async getNoteByBugId(req, res, next) {
    try {
      let data = await notesService.getNoteByBugId(req.params.id, req.userInfo.email)
      return res.send(data)
    } catch (error)  {
      next(error)
    }
  
  }
    async getAll(req, res, next) {
      try {
        let data = await bugsService.getAll(req.userInfo.email)
        return res.send(data)
      }
      catch (err) { next(err) }
    }
  
    async getById(req, res, next) {
      try {
        let data = await bugsService.getById(req.params.id, req.userInfo.email)
        return res.send(data)
      } catch (error) { next(error) }
    }
  
    async create(req, res, next) {
      try {
        req.body.creatorEmail = req.userInfo.email
        let data = await bugsService.create(req.body)
        return res.status(201).send(data)
      } catch (error) { next(error) }
    }
  
    async edit(req, res, next) {
      try {
        let data = await bugsService.edit(req.params.id, req.userInfo.email, req.body)
        return res.send(data)
      } catch (error) { next(error) }
    }
  
    // async delete(req, res, next) {
    //   try {
    //     await bugsService.delete(req.params.id, req.userInfo.email)
    //     return res.send("Successfully deleted")
    //   } catch (error) { next(error) }
    // }
}